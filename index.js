const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const {restrictToLoggedinUserOnly} = require('./middlewares/auth')

const {connecttoMongoDB} = require('./connection')
const app = express();
const PORT = 8001;


const urlRoute = require('./routes/url');
const staticRoute =  require('./routes/staticRouter');
const userRoute = require ('./routes/user')


const URL = require('./models/url')


connecttoMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log('connected') )

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/url',restrictToLoggedinUserOnly,urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);


app.get('/',async(req,res)=>{
    const allUrls = await URL.find({});
    return  res.render('home',{urls:allUrls});
})

app.get('/url/:shortId',async (req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {shortId},{
            $push:{
                visitHistory:{
                    timestamp:Date.now()
                }
            }
        }
    );
     
 res.redirect(entry.redirectURL)

});

app.listen(PORT,()=> console.log('server started at port 8001'))
