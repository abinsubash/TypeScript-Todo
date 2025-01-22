import { Router } from "express";
const router= Router()

router.get('/',(req,res)=>{
    console.log("hi")
    res.render('index')
})
    

export default router