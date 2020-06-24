import express from 'express'
import bodyParser from 'body-parser'
import connection from './database'
import http from 'http'
import router from './router'
import cors from 'cors'
import config from './config'
import path from 'path'

const app = express()
const server = http.createServer(app)

connection()

app.use(express.static(path.join(__dirname, '../client/build')))
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(cors())

app.use('/api/v1/', router)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) =>{
        if (err) {
            res.status(500).send(err)
        }
    })
})

server.listen(config.port)