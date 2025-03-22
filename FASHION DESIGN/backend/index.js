const express = require('express');
const cors=require('cors');
const cookieParser =require ('cookie-parser');
require('dotenv').config();
const connectDB=require('./config/db');
const router=require('./routes');
const listEndpoints=require('express-list-endpoints');

const app = express();

const allowedOrigins=[
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3008',
];

app.use(express.json());
app.use(cors({
    origin:(origin, callback)=>{
        if(!origin|| allowedOrigins.includes(origin)){
            callback(null,true);
        }else{
            callback( new Error ('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type', 'Authorization','Accept'],
}));
app.use((req, res,next)=>{
    res.setTimeout(80000,()=>{
        console.error('Request timed out.');
        res.status(408).json({message:'Request Timeout', error: trie,success:false});
    });
    next();
});
app.options('*',cors());
app.use("/api",router);
app.use((err,req,res,next)=>{
    console.error("Error: ",err.stack);
    res.status(err.status||500).json({
        success:false,
        message:err.message || 'An unknown error occured',
        error:true,
    });
});
const PORT =process.env.port || 5000;
connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("connected to db");
        console.log (`Server running at http://localhost:${PORT}`);
        console.table(listEndpoints(app));
    })
})
.catch(err=>
{
    console.error("Database connection failed: ",err.message);
}
);