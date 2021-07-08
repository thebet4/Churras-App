import { Request, Response } from 'express'
import Knex from '../database/connection'
import { validateToken } from '../services/jwt/index'



class ProductController {
  
  async index(req: Request, res: Response) {
    const { name, category, min_price, max_price, product_id } = req.query

    //Validate if have at least one search parameter
    if (name || category || min_price || max_price || product_id) {


      let sql = 'SELECT * FROM product WHERE 1=1 '

      if(product_id) sql += ` AND product_id = ${product_id}`
      if (name) sql += ` AND name like  '${name}%'`
      if (category) sql += ` AND category like  '${category}%'`
      if (min_price) sql += ` AND price > ${min_price}`
      if (max_price) sql += ` AND price < ${max_price}`


      let products = await Knex.raw(sql)

      if (products.length > 0) {

        return res.json({
          'status': 200,
          'msg': 'ok',
          'data': products,
        })

      } else {

        return res.json({
          'status': 404,
          'msg': 'No products found',
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

    const { name, description, photo, category, available, price } = req.body
    const token: any  = req.headers.authorization
    const validation = await validateToken(token)

    if (!validation.error) {

      let user = await Knex('user').where({ user_id: validation.id })
      
      if(user[0].profile === 1){
        if (name && description && category && available && price > 0) {
      
          try {
            
            await Knex('product').insert({
              name: name,
              description: description,
              photo: photo,
              category: category,
              available: available,
              price: price
            })
    
            return res.json({
              'status': 200,
              'msg': 'Product created sucefully',
            })
    
          }
          catch (e) {
            return res.json({
              'status': 500,
              'msg': 'Internal Server Error, try again later',
            })
          }
    
        } else {
          return res.json({
            'status': 400,
            'msg': 'Missing a required parameter',
          })
        }
      } else {
        res.json({
          status: 401,
          msg: "Unauthorized",
        })
      }



    } else {
      res.json({
        status: 401,
        msg: validation.error,
      })
    }
    

  }

  async update(req: Request, res: Response) {
    const { name, category, price, description, photo, available, product_id } = req.body

    const token: any  = req.headers.authorization
    const validation = await validateToken(token)

    if (!validation.error) {

      let user = await Knex('user').where({ user_id: validation.id })
      
      if (user[0].profile === 1) {

        if (name || category || price || description || available) {
      
          try {
            let product = await Knex('product').where({ product_id: product_id }).update({ name: name, category: category, price: price, description: description, available: available, photo: photo })
            res.status(200).json({
              status: 200,
              msg: 'Product was updated sucefully'
            })
          }
          catch (e) {
            res.json({
              status: 500,
              msg: 'Internal Server Error, try again later',
            })
          }

        } else {
          return res.json({
            'status': 500,
            'msg': 'At least one parameter is required',
          })
        }
        
      } else {
        res.json({
          status: 401,
          msg: "Unauthorized",
        })
      }
    } else {
      res.json({
        status: 401,
        msg: validation.error,
      })
    }
    

  }

  async delete(req: Request, res: Response) {
   
    const { product_id } = req.body
    const token: any  = req.headers.authorization
    const validation = await validateToken(token)

    if (!validation.error) {

      let user = await Knex('user').where({ user_id: validation.id })
      
      if (user[0].profile === 1) {
    
        if (product_id) {
      
          try {

            await Knex('product').where({ product_id: product_id }).delete()
            res.status(200).json({
              status: 200,
              msg: 'Product was deleted sucefully'
            })

          } catch (e) {
            res.json({
              status: 500,
              msg: 'Internal Server Error, try again later',
            })
          }

        } else {
          return res.json({
            'status': 500,
            'msg': 'Missing a required params',
          })
        }

      } else {
        res.json({
          status: 401,
          msg: "Unauthorized",
        })
      }
    } else {
      res.json({
        status: 401,
        msg: validation.error,
      })
    }
  }

}

export default ProductController