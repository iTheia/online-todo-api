import User from './user.model'
import bcrypt from 'bcryptjs'

const controller = {
    async getDashboard(req, res){
        const id = req._id
        const userDashboard = await User.findById(id, { channels:1 } )
        res.status(200).send(userDashboard)
    },
    async getAll(req, res){
        const users = await User.find()
        res.status(200).send(users)
    },
    async update(req, res){
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).send(user)
    },
    async create(req, res){
        const emailExist = await User.findOne({email:req.body.email})
        if(emailExist){
            return res.status(400).send('email alredy exists')
        }
        const user = new User(req.body)
        await user.save()
        const token = user.generateAuthToken()
        res.status(200).send({token})
    },
    async delete(req, res){
        const id = req.params.id
        const user = await User.deleteOne({_id:id})
        res.status(200).send(user)
    },
    async sigIn(req, res){
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send('Invalid password or email')
        }
        const password = await bcrypt.compare(req.body.password, user.password)
        if(!password){
            return res.status(404).send('Invalid password or email')
        }
        const token = user.generateAuthToken()
        res.status(200).send({token})
    }
}

export default controller