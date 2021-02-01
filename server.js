const express=require("express");
const bodyparser=require("body-parser");
const cors=require("cors");
let mongodb=require("mongodb");

let app=express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());

let ashokIt=mongodb.MongoClient;

app.post("/login",(req,res)=>
{
    ashokIt.connect("mongodb+srv://admin:admin@cluster0.abahc.mongodb.net/ecommerce?retryWrites=true&w=majority",(err,conn) =>
    {
        if(err) throw err;
        else
        {
            let db=conn.db("ecommerce");
            db.collection("login_Details").find({"uname":req.body.uname,"upwd":req.body.upwd}).toArray((err,my_arr)=>
            {
                if(err) throw err;
                else{
                    if(my_arr.length>0)
                    {
                        res.status(200).json({login:"success"});
                    }
                    else
                    {
                        res.status(200).json({login:"fail"});
                    }
                }

            })

        }

    })

})

//assign port 

let port =process.env.PORT || 8080
app.listen(port,() =>
{
    console.log("server started");
})



