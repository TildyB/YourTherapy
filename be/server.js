
const dotenv = require("dotenv")
dotenv.config()
const app = require("./app")
const mongoose = require("mongoose")


mongoose.connect(process.env.MONGO_URI)
app.listen(process.env.PORT, () => console.log(`Server running at port ${process.env.PORT} for Your Therapy`))