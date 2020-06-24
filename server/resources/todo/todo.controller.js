import { Todo } from './todo.model'
import { channelModel as Channel } from '../channel'

const controller = {
    async getAll(req, res){
        const channel_id = req.params.channel_id
        const todosFromChannel = await Channel.findById(channel_id,{todos:1,_id:0})
        res.status(200).send(todosFromChannel)
    },
    async getSingle(req, res){
        const channel_id = req.params.channel_id
        const todo_id = req.params.id
        const channel = await Channel.findById(channel_id,{todos:1,_id:0})
        const todo = channel.todos.find(todo => todo._id.equals(todo_id))
        res.status(200).send(todo)
    },
    async create(req, res){
        const channel_id = req.params.channel_id
        const todo = new Todo(req.body)
        const channel = await Channel.findByIdAndUpdate(channel_id,{$push:{todos:todo}},{new:true})
        res.status(200).send(channel)
    },
    async update(req, res){
        const channel_id = req.params.channel_id
        const todo_id = req.params.id
        const channel = await Channel.findByIdAndUpdate(channel_id,
            {
                $set:{
                    'todos.$[i].status':req.body.status,
                    'todos.$[i].assigned_to':req.body.assigned_to,
                    'todos.$[i].description':req.body.description,
                }
            },
            {
                arrayFilters:[
                    {'i._id':todo_id}
                ],
                new:true
            })

        res.status(200).send(channel)
    },
    async delete(req, res){
        const channel_id = req.params.channel_id
        const todo_id = req.params.id
        const channel = await Channel.findByIdAndUpdate(channel_id,{$pull:{todos:{_id:todo_id}}},{new:true})
        res.status(200).send(channel)
    },
}

export default controller