var express = require('express');
var router = express.Router();
const url = require('url');
const querystring = require('querystring');
const axios = require('axios');
require('dotenv').config()

const {getVisitorCount, updateVisitorCount} = require('./buckets');

router.get('/visitorcount',function(req, res, next){
    //This requires that you already have set up buckets on S3 and have tokens on ~/.aws/config
   
    getVisitorCount()
        .then((resp) => {
            //The responseJSON is given in template of the ../counter.json file
            //Body is given as a buffer, so have to convert to string, then JSON
            const responseJson = JSON.parse(resp.Body.toString());
            res.status(200).send(responseJson); 

            const updated = responseJson.visitorCount + 1
            updateVisitorCount(updated)
        }) 
        .catch(function(err) {
            console.error(err, err.stack)
            res.status(400).send({visitorCount: NaN})
        });        
})

const ipurl = "http://ip-api.com/json/"

router.get('/ipaddress', function(req, res, next){
    const userIP = req.query.ip; 
    //url must be in format "/ipaddress?255.255.255.255"
    if(userIP !== undefined){
        //get IP info of server
        axios.get(ipurl)
            .then((response) => {
                const resJson = response.data;
                const responseData = {serverIP: resJson.query, serverCountry: resJson.country, 
                                      serverRegion: resJson.region, serverCity: resJson.city}
                return responseData
            })
            .then((responseJson) => {
                //get IP info of client
                axios.get(ipurl + userIP)
                .then((response) => {  
                    if(response.data.status === "fail"){
                        throw 'Bad query IP'; 
                    }
                    responseJson.clientIP = response.data.query;
                    responseJson.clientCountry = response.data.country;
                    responseJson.clientRegion = response.data.region;
                    responseJson.clientCity = response.data.city;

                    res.status(200).json(responseJson);
                })
                .catch((error) => {
                    console.log(error);
                    res.status(400).json({error: true, message: "Failed axios get with user IP"});
                })
            })
            .catch( () => {
                res.status(400).json({error: true, message: "Failed axios get"});
            })

    } else {
        res.status(400).json({error: true, message: "No query IP"})
    }    
});

module.exports = router;