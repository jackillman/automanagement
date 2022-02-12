/* eslint-disable prettier/prettier */
// lib/app.ts
//#!/usr/bin/env node
import express  from 'express';
const cors = require('cors')
// import bodyParser  from 'body-parser'
import path from 'path';
const uri = "mongodb+srv://car-app:car-app@cluster0.w1bms.mongodb.net/automanagement?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const mongoose = require("mongoose");

import { ENV } from './env/environment';
import { Application } from './app';
const bodyParser = require('body-parser')
import { Url } from 'url';
//const fileUpload = require('express-fileupload');
const URL = require('url');

const fs = require('fs');


const program = require('commander')
  .option('--local', 'local')

  .option('--prod', 'prod')
  .parse(process.argv)

function localMode(): boolean {return !!program.local;};
function devMode(): boolean {return !!program.dev;};
function staffMode(): boolean {return !!program.staff;};
function prodMode(): boolean {return !!program.prod;};
export const MODE_APP:string = localMode() ? 'local' : devMode() ? 'dev' : prodMode() ? 'prod' : staffMode() ? 'staff' :'staff';
// create a write stream (in append mode)

const PORT = ENV.PORT;


// const uriLocal = "mongodb://localhost:27017/cars-app" 
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false ,useCreateIndex: true}, function(err){
    if(err) return console.log(err);
	const app: express.Application = express();

	const http = require('http').createServer(app);
  app.use(cors())
  app.disable('x-powered-by');

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(__dirname + '/public'));
  // app.use(express.static('public'));
  // app.use(fileUpload({
  //     useTempFiles : true,
  //     tempFileDir : '/tmp/'
  // }));
  new Application({app:app,mongoose:mongoose});
  http.listen(PORT, function(){
	  console.log("Сервер ожидает подключения...",PORT);

  });


});




