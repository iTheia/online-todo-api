import Channel from './channel.model'
import { userModel } from '../user'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

const controller = {
    async getAll(req, res){
        const channels = await Channel.find()
        res.status(200).send(channels)
    },
    async leaveChannel(req,res){
        const channel_id = req.params.id
        const user_id = req._id
        const isAUser = await controller.isAUser(user_id,channel_id)
        if(!isAUser){
            return res.status(400).send('You are not a user')
        }
        console.log(user_id)
        await Channel.findByIdAndUpdate(channel_id,{
            $pull:{users:{_id:ObjectId(user_id)}}
        },{
            new:true
        })
        await userModel.findByIdAndUpdate(user_id,{
            $pull:{channels:{_id:ObjectId(channel_id)}}
        },{new:true})
        res.status(200).send('You have succefully leave the channel')
    },
    async getSingle(req, res){
        const channel_id = req.params.id
        const user_id = req._id
        const isAUser = await controller.isAUser(user_id, channel_id)
        if(!isAUser){
            return res.status(400).send('you are not allow to enter to this channel')
        }
        
        const channel = await Channel.findById(channel_id)
        res.status(200).send(channel)
    },
    async create(req, res){ 
        const user_id = req._id
        const channel = new Channel(req.body)
        const owner  = await userModel.findById(user_id,{'name':1})
        channel.owner = owner
        channel.users.push(owner)
        await channel.save()
        await owner.update({$push:{channels:{_id:channel._id, name:channel.name}}})
        res.status(200).send(channel)
    },
    async update(req, res){
        const channel_id = req.params.id
        const user_id = req._id
        const userIsTheOwner = await controller.verifyIsTheOwner(user_id,channel_id)
        if(!userIsTheOwner){
            return res.status(400).send('You are not the owner of this server')
        }
        const channel = await Channel.findByIdAndUpdate(channel_id,req.body,{new:true})
        res.status(200).send(channel)
    },
    async delete(req, res){
        const channel_id = req.params.id
        const user_id = req._id
        const userIsTheOwner = await controller.verifyIsTheOwner(user_id,channel_id)
        if(!userIsTheOwner){
            return res.status(400).send('You are not the owner of this server')
        }
        const channel = await Channel.findByIdAndDelete(channel_id)
        res.status(200).send(channel)
    },
    async verifyIsTheOwner(user_id,channel_id){
        const channel = await Channel.findById(channel_id)
        if(!channel.owner._id.equals(user_id)){
            return false
        }
        return true
    },
    async isAUser(user_id, channel_id){
        const channel = await Channel.findById(channel_id)
        const index = channel.users.findIndex(user => user._id.equals(user_id) )
        
        if(index < 0){
            return false
        }
        return true
    },
    async createInvitation(req, res){
        const channel_id = req.params.id
        const user_id = req._id
        const channel = await Channel.findById(channel_id)
        const isAUser = await controller.isAUser(user_id,channel_id)
        if(!isAUser){
            return res.status(400).send('You are not a user')
        }
        const invitation = channel.createInvitation()
        res.status(200).send(invitation)
    },
    async joinChannel(req, res){
        const channel_id = req.channelInfo._id
        const channel = await Channel.findById(channel_id)
        const user = await userModel.findById(req._id) 
        const alredyOnServer = await controller.isAUser(user._id, channel_id)
        if(alredyOnServer){
            return res.status(401).send('you are alredy on the server')
        }
        await user.update({$push:{channels:{_id:channel._id,name:channel.name}}},{new:true})
        await channel.update({$push:{users:{_id:user._id, name:user.name}}})
        res.send(user)
    }
}

export default controller