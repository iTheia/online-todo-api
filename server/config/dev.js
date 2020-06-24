const devConfig = {
    port: process.env.PORT || 5000,
    database: 'mongodb://127.0.0.1:27017/online-todo',
    secret:{
        token:'HOLA SOY UN TOKEN XD'
    }
}
export default devConfig