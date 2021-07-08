import e, { Request, Response } from 'express'
// import knex from 'knex'
import Knex from '../database/connection'
import { isValid as cpfIsValid } from '../services/cpf/cpf'
import { isValid as emailIsValid } from '../services/email/index'
import { encrypt, decrypt } from '../services/bcrypt/index'
import { generateToken, validateToken } from '../services/jwt/index'


class UserController {
  
  async index(req: Request, res: Response) {

    const { name, cpf, email, user_id } = req.query

    if (name || cpf || email || user_id) {
      
      let sql = 'SELECT * FROM user WHERE profile!=1 AND 1=1'

      if (name) sql += ` AND name like  '${name}%'`
      if (cpf) sql += ` AND cpf like  '${cpf}%'`
      if (email) sql += ` AND email like  '${email}%'`
      if (user_id) sql += ` AND user_id like  '${user_id}%'`

      let users = await Knex.raw(sql)
          
      if (users.length > 0) {

        return res.json({
          'status': 200,
          'msg': 'ok',
          'data': users,
        })

      } else {

        return res.json({
          'status': 404,
          'msg': 'No users found',
        })

      }
      
      
    } else {
      return res.json({
        'status': 500,
        'msg': 'At least one parameter is required',
      })
    }
  }

  async create(req: Request, res: Response) {
    let { username, password, confirm_password, email, cpf } = req.body
    
    //Validation for already registered email
    const userAlreadyInDatabase = await Knex('user').where({ email: email }).count('email as users')
    if (userAlreadyInDatabase[0].users === 0) {
      
      //Validate if password and confirm password does match
      if (password === confirm_password) {
        
        //Validate cpf
        if (cpfIsValid(cpf)) {
          
          //Validate Email
          if (emailIsValid(email)) {
            
            //Try insert a new user in database
            try {

              //encrypt password 
              let encryptedPassword = await encrypt(password)

              await Knex('user').insert({name: username, cpf:cpf, email: email, password: encryptedPassword, profile: 2})

              res.json({
                status: 200,
                msg: 'User entered successfully',
              })
              
            }
            catch (e) {
              res.json({
                status: 500,
                msg: 'Internal Server Error, try again later',
              })
            }

          } else {
            res.json({
              status: 422,
              msg: 'Invalid format for email',
            })
          }
          

        } else {
          res.json({
            status: 422,
            msg: 'Invalid format for cpf' 
          })
        }
        
      } else {
        res.json({
          status: 422,
          msg: 'Password and confirm password doesn\'t match' 
        })
      }

    } else {
      res.json({
        status: 409,
        msg: 'Email already registered' 
      })
    }
  }

  async login(req: Request, res: Response) {
    let { email, password } = req.body
    
    let user = await Knex('user').where({ email: email })

    if (user.length > 0) {
      
      if (decrypt(password, user[0].password)) {
        
        let authToken = await generateToken({ user_id: user[0].user_id })

        res.json({
          status: 200,
          msg: 'Login sucefully',
          data: {
            user_id: user[0].user_id,
            name: user[0].name,
            email: user[0].email,
            cpf: user[0].cpf,
            profile: user[0].profile,
            token: 'Bearer ' + authToken,
          }
        })

      } else {
        res.json({
          status: 403,
          msg: 'Login or password is incorrect',
        })
      }

    } else {
      
      res.json({
        status: 404,
        msg: 'User not found',
      })

    }
    
  }

  async validateToken(req: Request, res: Response) {
    const token: any  = req.headers.authorization
    const validation = await validateToken(token)
    if (!validation.error) {
      
      let user = await Knex('user').where({ user_id: validation.id })
      
      res.json({
        status: 200,
        msg: 'ok',
        data: {
          name: user[0].name,
          email: user[0].email,
          cpf: user[0].cpf,
          user_id: user[0].user_id,
          profile: user[0].profile,
          token: token
        }
      })

    } else {
      res.json({
        status: 401,
        msg: validation.error,
      })
    }
  }

  async updateUser(req: Request, res: Response) {
    const { user_id, username, email, cpf} = req.body
    const token: any  = req.headers.authorization

    //validate token
    const validation = await validateToken(token)
    if (!validation.error) {

      //validate if token id is the same as user id
      if (validation.id === user_id) {
        
        try {
          
          //Update user infos
          let user = await Knex('user').where({ user_id: user_id, profile: 2 }).update({ name: username, email: email, cpf: cpf })
          res.status(200).json({
            status: 200,
            msg: 'user was updated sucefully'
          })

        } catch (e) {

          res.status(500).json({
            status: 500,
            msg: 'Internal server error, try again later'
          })

        }



      } else {
        res.status(403).json({
          status: 403,
          msg: 'Forbidden',
        })
      }
      
      


    } else {
      res.status(401).json({
        status: 401,
        msg: validation.error,
      })
    }

    

  }


}

export default UserController