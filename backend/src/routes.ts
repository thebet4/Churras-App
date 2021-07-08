import express from 'express'
import UserController from './controllers/user_controller'
import ProductController from './controllers/product_controller'
import BarbecueController from './controllers/barbecue_controller'

const routes = express.Router()
const userController = new UserController()
const productController = new ProductController()
const barbecueController = new BarbecueController()


routes.get('/', (req, res) => {
  res.json({
    msg: 'ok',
    status:200
  })
})

routes.get('/users', userController.index)

routes.put('/users/create', userController.create)

routes.post('/users/login', userController.login)

routes.post('/users/refresh', userController.validateToken)

routes.post('/users/update', userController.updateUser)


routes.get('/products', productController.index)

routes.put('/products/create', productController.create)

routes.post('/products/update', productController.update)

routes.post('/products/delete', productController.delete)


routes.get('/barbecue', barbecueController.index)

routes.put('/barbecue/create', barbecueController.create)

routes.post('/barbecue/infer', barbecueController.inferBarbecue)



export default routes