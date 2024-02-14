import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import cors from 'cors'


//Express app
const app = express()
//router
const router = express.Router()
//port
const port = +process.env.PORT || 4000
//json url
const dataURL = 'https://muttaqeen-slamat.github.io/vue_eomp_data/data/'
//application middleware
app.use(
    express.json(),
    express.urlencoded({
        extended:true
    }),
    cors(),
    router
    )

// / => home
router.get('/', (req,res)=>{
    res.json({
        status: res.statusCode,
        msg: "You're on the home page"
    })
})
// fetch all education (from vueeomp data)

router.get('/education', async (req,res)=>{
    try{
        let {education} = await (await fetch(dataURL)).json()
        res.json({
            status: res.statusCode,
            education
        })

    }catch(e){
        res.json({
            status: res.statusCode, 
            msg: 'Please try again later.'
        })
    }
})

// long way:^
// router.get('/education', asyn (req,res)=>{
// let response = await fetch(dataURL)
// let {education} = await response.json()
// console.log(education);
// })

//error handling
    // router.get('/education', async (req, res)=>{
    //     try{
    //         let response = await axios.get(dataURL)
    //         let {education} = await response.data
    //         res.json({
    //             status: res.statusCode,
    //             education
    //         })    
    //     }catch(e){
    //         res.json({
    //             status: res.statusCode, 
    //             msg: 'Please try again later.'
    //         })
    //     }
    // })

//using axios 
// router.get('/education', async (req,res)=>{
//     let response = await axios.get(dataURL)
//     let {education} = await response.data
//     res.json({
//         status: res.statusCode,
//         education
//     })
// })

//single value
router.get('/education/:id', async (req,res)=>{
    try{
        let response = await fetch (dataURL)
        let {education} = await response.json()
        let params = +req.params.id
        let idx = params > 0 ? params - 1 : 0
        res.json({
            status: res.statusCode,
            education: education[idx]
        })
    }catch(e){
        res.json({
            status: res.statusCode,
            msg: 'Please try again later'
        })
    }
})

//joels solutions

router.post('/addEducation', bodyParser.json(), async (req, res)=>{
    try{
        let dataRes = await axios.post(dataURL, req.body)
        if(dataRes){

            res.json({
                status: res.statusCode,
                msg: 'New record was added'
            })
        }
    }catch(e) {
        res.json({
            status: res.statusCode,
            msg: 'An error occurred when adding a new data'
        })
    }
})
//didnt work

// router.get('/addeducation', async (req,res)=>{
//     let {education} = await (await fetch(dataURL)).json()
//     let update = await axios.post(
//         dataURL, {
//         id: ++idx,
//         year: new Date().getFullYear(),
//         description: 'insert text here'
//     })
//     res.json({
//         status: res.statusCode,
//         education
//     })
// })

//didnt work

// router.get('/addeducation', async (req, res)=>{
//     let {education} = await (await fetch(`http://localhost:4000/education`)).json()
//     let params = +req.params.id
//     let idx = params > 0 ? params - 1 : 0
//     let update = await axios.post(dataURL, {
//         id: idx, 
//         year: new Date().getFullYear(), 
//         description: 'insert text here'
// })
//     res.json({
//         status: res.statusCode,
//         education: education,
//         update: update.data

//     })
// })

router.get('/addeducation/:id', async (req, res) => {
    try {
        const { education } = await (await fetch(`http://localhost:4000/education`)).json();
        
        const params = +req.params.id;
        const idx = params > 0 ? params - 1 : 0;

        const update = await axios.post(`http://localhost:4000/addeducation`, {
            id: idx,
            year: new Date().getFullYear(),
            description: 'insert text here'
        });

        res.json({
            status: res.statusCode,
            education: education,
            update: update
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//didnt work

// router.get('/addeducation', async (req,res)=>{
//     let {education} = await (await fetch(dataURL)).json()
//     let update = await axios.post(
//         dataURL, {
//             id: ++idx,
//             year: new Date().getFullYear(),
//             description: 'insert text here'
//         }
//         )
//     let adding = {education}.push(update)
//         res.json({
//         status: res.statusCode,
//         education
//     })
// })

//didnt work

    // let response = await fetch (dataURL)
    // let {education} = await response.json()
    // let update = await axios.post(
    //     dataURL, {
    //                 id: idx,
    //                 year: new Date().getFullYear(),
    //                 description: 'Insert description here'
    //             }
    // )
    // res.json({
    //     status: res.statusCode,
    //     education: update
    // })


router.patch('/updateEducation/:id',bodyParser.json(), (req, res)=>{
    //axios.patch(`${dataURL}`, )
})

router.delete('/deleteEducation/:id', async (req, res)=>{
    let dataRes = await axios.delete(`${dataURL}/${+req.params.id}`, )
    if(dataRes) {
        res.json({
            status: res.statusCode,
            msg: 'A record was removed'
        })
    }
})

// router.patch('/updateeducation', (req,res)=>{

// })

// router.delete('/deleteeducation', (req,res)=>{

// })


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})