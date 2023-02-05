const mongoose = require('mongoose')


const connect = (url) => {
    try{
        mongoose.connect(url)
        console.log('connected')
    } catch(e){ 
        console.log(e)
    }
}

module.exports = connect