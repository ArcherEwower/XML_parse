const express = require('express');
const mongoose = require('mongoose');
const api = require('./api')
// const xml2json = require('xml2json')
// const xml2js = require('xml2js');
const util = require('util')
const fs = require("fs");
const parser = require('xml2json')

const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}));  
const startParse = () =>{
    fs.readFile('first_resp.xml', (err, data)=>{
        if(err) {
            return res.send({message:err});
        } else {
            jsonfile = JSON.parse(parser.toJson(data,{reversible: true}));
        }
    
        //console.log(util.inspect(prs, false, null, true))
        // const obj = parser.toJson(data, { object: true });
        // console.log(xml2js.parseString(data))
        // let objParse = JSON.stringify(obj)
        // console.log(objParse)
        // console.log(JSON.parse(objParse))
        // let body = (obj['S:Envelope']['S:Body']['ns2:sendMessage'].request)
        //console.log(util.inspect(body, false, null, true))

    })
    
}
startParse()
app.use('/api', api)
const start = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/atray', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        app.listen(8001, () => console.log('run'))
    }catch(e){
        console.log(e)
    }
}
start();