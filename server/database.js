import mongoose from 'mongoose'
import config from './config'

const connection = async () => {
    try {
        await mongoose.connect(config.database, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    } catch (error) {
        console.error(error)
    }
}


export default connection