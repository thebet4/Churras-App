import jwt from 'jsonwebtoken'
require('dotenv').config()

interface IParams {
 user_id:Number
}

export async function generateToken(params: IParams) {
  const jwt_key : any = process.env.JWT_SECRET_KEY

  const token = await jwt.sign(
    {
      id: params.user_id
    },
    jwt_key,
    {
      expiresIn: 86400
    }
  )

  return token
}

export async function validateToken(token :string) {
  
  if (!token) {
    return {error: 'No token provided'}
  }

  const parts = token.split(' ')

  if(parts.length > 2 || parts.length < 2){
    return {error:'Token error'}
  }

  const [scheme, tokenStr] = parts;

  if(scheme.indexOf('Bearer') < 0){
    return {error:'Token malformatted'}
  }

  let error = false;
  let id;

  jwt.verify(tokenStr, 'secret_key',(err,decoded:any) => {
      if(err){
          error = true;
      }else{
          id = decoded.id
      }
  });

  if(error){
      return {error: 'Token invalid'}
  }else{
      return {error:false,id:id}
  }
}