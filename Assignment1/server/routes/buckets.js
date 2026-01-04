require('dotenv').config();
const AWS = require('aws-sdk');
const { countReset } = require('console');

const bucket = 'n10627928-visitor-count';
const s3 = new AWS.S3({apiVersion: '2006-03-01'}); 

function getVisitorCount() {
    const params = { 
        Bucket: bucket, 
        Key: "counter.json", 
    };
    return s3.getObject(params).promise()
}

function updateVisitorCount(newcount) {    
    visitorJson = {"visitorCount": newcount};
    const params = { 
        Bucket: bucket, 
        Key: "counter.json", 
        Body: JSON.stringify(visitorJson),
        ACL:'public-read'
    };
    s3.putObject(params).promise()
        .then( (resp) => {
            // console.log("Successfully uploaded: <" + 'counter.json' + "> to bucket <" + bucket + ">" );
        }) 
        .catch(function(err) {
            //in case of expired token
            console.error(err, err.stack)
        });   
}

module.exports = {getVisitorCount, updateVisitorCount};