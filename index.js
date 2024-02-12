import express from 'express'

//Express app
const app = express()
//router
const router = express.Router()
//port
const port = +process.env.PORT || 4000
//json url
const dataURL = 'https://muttaqeen-slamat.github.io/vue_eomp_data/data/'
//application middleware
app.use(router)

// / => home
router.get('/', (req,res)=>{
    res.json({
        status: res.statusCode,
        msg: "You're on the home page"
    })
})
// fetch all education (from vueeomp data)

router.get('/education', async (req,res)=>{
    let {education} = await (await fetch(dataURL)).json()
    res.json({
        status: res.statusCode,
        education
    })
})
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})