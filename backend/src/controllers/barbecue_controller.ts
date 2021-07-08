import { Request, Response } from 'express'
import Knex from '../database/connection'
import { validateToken } from '../services/jwt/index'

class BarbecueController {


  async index(req: Request, res: Response) {
    const token: any  = req.headers.authorization
    const validation = await validateToken(token)

    if (!validation.error) {


      //Implements a index method for differ normal users and admin


    } else {
      res.json({
        status: 401,
        msg: validation.error,
      })
    }
    
  }

  async create(req: Request, res: Response) {

    const { peopleWhoEatMeat, peopleWhoDontEatMeat, peopleWhoDinkAlcohol, peopleWhoDontDrinkAlcoho, meatInference, drinkInference, alcoholInference, ingredientInference, products, fullPrice} = req.body
    const token: any  = req.headers.authorization
    const validation = await validateToken(token)

    if (!validation.error) {

      if (peopleWhoEatMeat && peopleWhoDontEatMeat && peopleWhoDinkAlcohol && peopleWhoDontDrinkAlcoho && meatInference && drinkInference && alcoholInference && ingredientInference && products && fullPrice) {
        
        let barbecue = await Knex('barbecue').insert({
          created_by: validation.id,
          people_who_eat_meat: peopleWhoEatMeat,
          people_who_dont_eat_meat: peopleWhoDontEatMeat,
          people_who_drink_alcohol: peopleWhoDinkAlcohol,
          people_who_dont_drink_alcohol: peopleWhoDontDrinkAlcoho,
          meat_estimate: meatInference,
          drink_estimate: drinkInference,
          alcohol_estimate: alcoholInference,
          ingredient_estimate: ingredientInference,
          price: fullPrice
        })

        interface IProduct {
          product_id: Number;
          quantity: Number
        }

        products.forEach( async (product:IProduct) => {
          await Knex('barbecue_product').insert({
            barbecue_id: barbecue,
            product_id: product.product_id,
            quantity: product.quantity
          })
        });

        return res.json({
          'status': 200,
          'msg': 'Ok',
        })

      } else {
        return res.json({
          'status': 500,
          'msg': 'All parameter is required',
        })
      }

    } else {
      res.json({
        status: 401,
        msg: validation.error,
      })
    }
    

  }

  async inferBarbecue(req: Request, res: Response) {
    const { peopleWhoDinkAlcohol, peopleWhoDontDrinkAlcoho, peopleWhoDontEatMeat, peopleWhoEatMeat } = req.body
    const token: any  = req.headers.authorization
    const validation = await validateToken(token)

    if (!validation.error) {

      if (peopleWhoDinkAlcohol && peopleWhoDontDrinkAlcoho && peopleWhoDontEatMeat && peopleWhoEatMeat) {

        let meatPerPerson = 650
        let foodsPerPerson = 500
        let alcoholPerPerson = 1000
        let drinksPerPerson = 1000

        let barbecueInference = {
          totalMeatInGrams: peopleWhoEatMeat * meatPerPerson,
          otherFoodsInGrams: peopleWhoDontEatMeat * foodsPerPerson,
          totalAlcoholInMililiters: peopleWhoDinkAlcohol * alcoholPerPerson,
          otherDrinksInMililiters: peopleWhoDontDrinkAlcoho * drinksPerPerson
        }

        return res.json({
          'status': 200,
          'msg': barbecueInference
        })

      } else {
        return res.json({
          'status': 500,
          'msg': 'All parameter is required',
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

export default BarbecueController