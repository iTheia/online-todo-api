import express from 'express'
import { body } from 'express-validator'
import { catchErrors, authorization } from '../../middlewares'
import controller from './todo.controller'

const todoRouter = express.Router({mergeParams:true})

todoRouter.route('/')
    .get(catchErrors(controller.getAll))
    .post(catchErrors(controller.create))

todoRouter.route('/:id')
    .put(catchErrors(controller.update))
    .delete(catchErrors(controller.delete))
    .get(catchErrors(controller.getSingle))

export default todoRouter