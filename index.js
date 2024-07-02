const express = require('express');
const path = require('path');

const {connecttoMongoDB} = require('./connection')
const app = express();
const PORT = 8001;
const urlRoute = require('./routes/url');
const URL = require('./models/url')


connecttoMongoDB('mongodb://127.0.0.1:27017/short-url').then(()=>console.log('connected') )

app.set('view engine','ejs');
app.set('views',path.resolve('./views'))
app.use(express.json());


app.use('/url',urlRoute);

app.get('/test',async(req,res)=>{
    const allUrls = await URL.find({});
    return  res.render('home',{urls:allUrls});
})

app.get('/:shortId',async (req,res)=>{
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
     console.log(shortId);    
     console.log(entry.redirectURL);

 res.redirect(entry.redirectURL)

});

app.listen(PORT,()=> console.log('server started at port 8001'))
