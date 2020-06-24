import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { todoModel, todoSchema } from '../todo'
import config from '../../config'

const schema = {
    name:{
        type:String,
        required:[true, 'channel must have a name']
    },
    users:{
        type:Array,
        default:[]
    },
    owner:{
        type:Object
    },
    todos:{
        type:[todoSchema],
        default:[]
    }
}


const channelSchema = mongoose.Schema(schema, {timestamps:true})

channelSchema.pre('save', async function(){
    const myFirstTodo = new todoModel({
        description:'Ser una persona increible',
        assigned_to:this.owner
    })
    this.todos.push(myFirstTodo)
})

channelSchema.methods.createInvitation = function (){
    const token = jwt.sign(
        {_id: this._id},
        config.secret.token)
    return token
}

const Channel = mongoose.model('Channel', channelSchema)

export default Channel