const express = require('express')
const dotenv = require('dotenv')
const authRoutes = require('./src/routes/auth_routes')
const notesRoutes = require('./src/routes/notes_routes')
const {connectToMongodb} = require('./db')
const cors = require('cors')
const port = 5000
const app = express()

dotenv.config();
connectToMongodb();
app.use(express.json())
app.use(cors({origin:'*'}))
app.use('/api/auth',authRoutes)
app.use('/api/note',notesRoutes)

app.get('/',(req,res)=>{
    res.send("Healthy")
})

app.listen(port,()=>{
    console.log(`Server Started at Port : ${port}`)
})


module.exports = {express,app}