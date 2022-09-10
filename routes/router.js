const express = require("express");
const router = new express.Router();

const Products = require("../models/productsSchema")
const USER = require("../models/userSchema");

const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")


//products api
router.get("/getproducts",async (req,res)=>{
    
    try {
        const productsdata = await Products.find();
        console.log("Products");
        res.status(201).json(productsdata);
    } catch (error) {
    
        console.log("error");
    }

})


//individual data
router.get("/getproductsone/:id",async(req,res)=>{

    try {
        const {id} = req.params;
        // console.log(id);
        
        const individualdata = await Products.findOne({id:id});
        // console.log(individualdata);
        res.status(201).json(individualdata);
    } catch (error) {
        // res.status(400).json(individualdata);
        
        console.log("error");
    }

})

//register

router.post("/register",async(req,res)=>{

    // console.log(req.body);
    const {fname,email,mobile,password,cpassword} = req.body;
    if(!fname || !email || !mobile || !password || !cpassword)
    {
        res.status(422).json({error:"Please fill all the details"})
        console.log("No data available");
    };
    
    try {
        const preuser = await USER.findOne({email:email});
        if(preuser)
        {
            res.status(422).json({error:"This user is already registered. Please login"})
        }
        else if(password!=cpassword)
        {
            
            res.status(422).json({error:"Password don't match"})
        }
        else{
            const finalUser = new USER({
                fname,email,mobile,password,cpassword
            }) 
            
            const storedata = await finalUser.save();
            console.log(storedata);
            res.status(201).json(storedata);
        }
    } catch (error) {
        
    }
})


router.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        res.status(400).json({error:"Fill all the details properly"})
    };
    
    try {
        const userlogin = await USER.findOne({email:email});
        // console.log(userlogin);
        
        if(userlogin)
        {
            const isMatch = await bcrypt.compare(password,userlogin.password);
            console.log(isMatch);
            
            //generate token
            const token = await userlogin.generateAuthToken();
            console.log(token);
            
            res.cookie("TechZenWeb",token,{
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            })
            
            if(!isMatch)
            {
                res.status(400).json({error:"Invalid password"})
            }
            else
            {
                res.status(201).json(userlogin)
            }
        }
        else
        {
            
            res.status(400).json({error:"Invalid Details"})
        }
        
    } catch (error) {
        res.status(400).json({error:"Invalid Credentials"})
    }
})

// add to cart api

router.post("/addcart/:id", authenticate, async(req,res)=>{
    try {
        const {id} = req.params;
        const cart = await Products.findOne({id:id});
        console.log(cart+"CART");
        
        const UserContact = await USER.findOne({_id:req.userID})
        
        if(UserContact)
        {
            const cartData = await UserContact.addcartdata(cart);
            await UserContact.save();
            console.log(cartData);
            res.status(201).json(UserContact);
            
        }
        else
        {
            res.status(401).json({error:"Invalid User"})
        }
    } catch (error) {
        res.status(401).json({error:"invalid user"});
    }
})

//get cart details

router.get("/cartdetails",authenticate,async(req,res)=>{

    try {
        const buyuser = await USER.findOne({_id:req.userID})
        res.status(201).json(buyuser);
    } catch (error) {
        console.log("error" + error);
    }
})



// get user is login or not
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const validuserone = await User.findOne({ _id: req.userID });
        res.status(201).json(validuserone);
    } catch (error) {
        console.log(error + "error for valid user");
    }
});


router.get("/logout", authenticate, async (req, res) => {
    try {
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        res.clearCookie("TechZenWeb", { path: "/" });
        req.rootUser.save();
        res.status(201).json(req.rootUser.tokens);
        console.log("user logout");

    } catch (error) {
        console.log(error + "jwt provide then logout");
    }
});


router.get("/remove/:id", authenticate, async (req, res) => {
    try {
        const { id } = req.params;

        req.rootUser.carts = req.rootUser.carts.filter((curval) => {
            return curval.id != id
        });

        req.rootUser.save();
        res.status(201).json(req.rootUser);

    } catch (error) {
        console.log("error"+error);
        res.status(400).json(error);
    }
});


module.exports = router;