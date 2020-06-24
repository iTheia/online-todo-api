import express from 'express'
import { body } from 'express-validator'
import { catchErrors, authorization, verifyInvitation } from '../../middlewares'
import controller from './channel.controller'
import { todoRoute } from '../todo'

const channelRouter = express.Router()

channelRouter.route('/')
    .get(catchErrors(controller.getAll))
    .post(authorization, [ body('name').trim().escape()],catchErrors(controller.create))

channelRouter.route('/:id')
    .get(authorization, catchErrors(controller.getSingle))
    .delete(authorization, catchErrors(controller.delete))
    .put(authorization, [ body('name').trim().escape() ],catchErrors(controller.update))

channelRouter.get('/createInvitation/:id', authorization, catchErrors(controller.createInvitation))
channelRouter.post('/joinChannel',authorization,verifyInvitation ,catchErrors(controller.joinChannel))
channelRouter.post('/:id/leaveChannel', authorization, catchErrors(controller.leaveChannel))

channelRouter.use('/:channel_id/todos', todoRoute)

export default channelRouter