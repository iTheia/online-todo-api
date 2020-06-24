import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config'

const schema = {
    email:{
        type:String,
        required:[true, 'Please enter your email'],
        trim:true
    },
    password:{
        type:String,
        required:[true, 'Please enter Password'],
        min: 6
    },
    name:{
        type:String,
        required:[true, 'enter user name']
    },
    channels:{
        type:Array,
        default:[]
    },
    role:{
        type:String,
        default:'normal'
    },
}

const userSchema = new mongoose.Schema(schema, {timestamps:true})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } else {
        next()
    }
})

userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign(
        {_id: this.id},
        config.secret.token)
    return token
}
const User =  mongoose.model('User', userSchema)

export default User