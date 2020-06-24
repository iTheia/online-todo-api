import express from 'express'
import { body } from 'express-validator'
import {catchErrors} from './middlewares'
import { userController, userRoute } from './resources/user'
import { channelRoute } from './resources/channel'

const router = express.Router()

router.post('/signup',[
    body('email').trim().escape(),
    body('password').trim().escape(),
    body('name').trim().escape(),
], catchErrors(userController.create))

router.post('/signin',[
    body('email').trim().escape(),
    body('password').trim().escape()
], catchErrors(userController.sigIn))

router.use('/users', userRoute)
router.use('/channels', channelRoute)

export default router