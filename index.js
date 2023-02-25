const express = require('express')
const app = express();
const joi=require('joi');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



const validatemiddleware= (req,res,next)=>{
    const schema=joi.object().keys({
         userName: joi.string().alphanum().min(3).max(25).required(),
         email: joi.string().email().required(),
     password: joi.string().min(5).required(),
     mobileNumber: joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    //  DOB: Joi.date().greater(new Date("1940-01-01")).required(),
    })
    const {error}= schema.validate(req.body);
    if(error){
        res.status(200).json({error:error})
    }
    else{
        next();
    }
}

app.post('/add-user',validatemiddleware , async (req,res)=>{
                    const  userName= req.body.userName;
					const email= req.body.email;
					const password= req.body.password;
					const mobileNumber= req.body.mobileNumber;
                    // const DOB=req.body.DOB;


                    res.status(200).json(req.body)
});




app.listen(3000, () => {
    console.log("Server Started 3000");
})