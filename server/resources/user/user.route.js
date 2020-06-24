import express from 'express'
import {body} from 'express-validator'
import { catchErrors, authorization } from '../../middlewares'
import controller from './user.controller'

const userRouter = express.Router()

userRouter.get('/',catchErrors(controller.getAll))

userRouter.get('/dashboard', authorization, catchErrors(controller.getDashboard))

userRouter.route('/:id')
    .put([
        body('email').trim().escape(),
        body('password').trim().escape(),
        body('name').trim().escape(),
        body('role').trim().escape(),
        body('channels').trim().escape()
    ],catchErrors(controller.update))
    .delete(authorization, catchErrors(controller.delete))

export default userRouter