// dependencies //
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const ProfileModel = require("./models/profileModel")

require('dotenv').config()

const app = express()
const PORT = process.env.PORT

// mindleware//
app.use(cors({
    origin: true,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// connect  to Db//
mongoose.set('strictQuery', true)
async function connectToDB(){
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)

        console.log(`connected to DB`)
    } catch(e) {
        console.log(`connection failed ${e}`)
    }

}
connectToDB();
// get data form backend send to frontwend
app.get("/users", (req, res) => {
    async function users(){
        try{
            // find certain model
            const response = await ProfileModel.find()

            res.status(200).send({
                message: 'users found',
                data: response,
            })

        } catch(e){
          res.status(400).send({
            message: 'error in get request',
            data: e,
          })
        }

    }
    users( )
})
//post request
app.post('/create', (req, res) => {
    const data = req.body

    async function createprofiel(){
        try{
          const newprofile = ProfileModel.create({
            name: data.name,
            age: data.age,
            sex: data.sex,

          })

          res.status(200).send({
            message:'profile created',
            data: newprofile,

          })
      }catch(e){
        res.status(400).send({
            message: ' error in post request',
            data: e,
        })

      }
    }
    createprofiel()
})
// delete rquest to delete a specific document
app.delete('/delete', (req, res) => {
    const data = req.body

    async function deleteuser(){
        try{
            await ProfileModel.findByIdAndDelete(data._id)

            res.status(200).send({
                message: 'user deleted',

            })
        }catch(e) {
            res.status(400).send({
                message:'error in delete request',
                data: e,
            })

        }
    }
    deleteuser()
})

app.listen(PORT, () =>{
    console.log(`Server running on ${PORT}`)
})
