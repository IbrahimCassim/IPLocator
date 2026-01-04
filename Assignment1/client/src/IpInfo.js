import React, { useEffect, useState } from 'react';

export default function IpInfo ({ ipaddressurl }) {
  const extApiUrl = "https://ipapi.co/json/";
  const [ ipJson, setIpJson ] = useState(null);

  //can optimise this to: async get server IP info first, while the client gets its own IP address
  useEffect(() => {
    //gets IP from external resource then sends it off toserver
    fetch(extApiUrl)
      .then(res => res.json())
      .then((response) => {
        //fetch server and client IP info from express server
        fetch(ipaddressurl + "?ip=" + response.ip) //can make this cleaner
          .then(res => res.json())
          .then(res => setIpJson(res))
          .catch(() => {console.log("caught an error in second chain");})
      })
      .catch( () => {console.log("caught an error in first chain");})
  },[]);

  if(ipJson !== null) {
    return(
      <div>
        <p>Your IP is: {ipJson.clientIP}. 
        Your location is {ipJson.clientRegion}, {ipJson.clientCity}, {ipJson.clientCountry}</p>
        <p>Server IP is: {ipJson.serverIP}. 
        Server location is {ipJson.serverRegion}, {ipJson.serverCity}, {ipJson.serverCountry}</p>
      </div>
    )      
  }
  return null;
}