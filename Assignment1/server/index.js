const path = require('path')
const express = require('express')
// import path from 'path'
// import express from 'express'
const app = express()
const port = 3000

const endpointsRouter = require ('./routes/endpoints');

// Serve out any static assets correctly
app.use(express.static('../client/build'))

app.use('/',endpointsRouter);

// Any routes that don't match on our static assets or api should be sent to the React Application
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
