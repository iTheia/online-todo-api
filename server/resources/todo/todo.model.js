import mongoose from 'mongoose'

const schema = {
    description:{
        type:String,
        required:[true, 'todo must have an description']
    },
    status:{
        type:String,
        default:'start'
    },
    assigned_to:{
        type:Object,
    }
}



export const todoSchema = new mongoose.Schema(schema)


export const Todo =  mongoose.model('Todo', todoSchema)
