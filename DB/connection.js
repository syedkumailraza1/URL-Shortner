const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log('Error while DB connection', error)
    }
}

module.exports = { ConnectDB }  // Export ConnectDB as an object
