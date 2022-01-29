// lib/app.ts
//#!/usr/bin/env node
import express  from 'express';
const cors = require('cors')
// import bodyParser  from 'body-parser'
import path from 'path';

import { ENV } from './env/environment';
import { Application } from './app';

import { Url } from 'url';
const URL = require('url');

const fs = require('fs');
// const rateLimit = require("express-rate-limit");
// const apiLimiter = rateLimit({
//   windowMs: 2 * 60 * 1000, // 2 minutes
//   max: 100
// });
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

let PORT = ENV.PORT;



// require('events').EventEmitter.defaultMaxListeners = 0
const app: express.Application = express();

const http = require('http').createServer(app);

app.use(cors())
app.disable('x-powered-by');
app.use('*',checkQueryParams);
function checkQueryParams(req:express.Request ,res:express.Response,next:Function) {
	// console.log(`req.query.code`,req.query.code)
	const code:string | any = req.query.code;
	if(req.originalUrl.startsWith('/?') || code) {
		console.log("NEED REDIRECT TO APP.LANET.TV",req.originalUrl)
		

    next();
	} else {
		next();
	}
 // https://my.lanet.tv/personal-account?promo=
}



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// console.log(`__dirname + 'public'`,__dirname + '/public')
app.use(express.static(__dirname));

function getParsedFullUrl(req: express.Request): Url {
	return URL.parse(getFullUrl(req), true);
};
function getFullUrl(req: express.Request): string {
	return `${req.protocol}://${req.get('host')}${req.originalUrl}`;
};





function normalizeUrl(url: string): string {
	const URL: string = `${url}/`.replace(/\/{2,}/g, '/').replace(/:\//, '://');
	return /\?\w+=/.test(URL) ? URL.replace(/\/$/, '') : URL;
}


http.listen(PORT, function(){
    console.log("Сервер ожидает подключения...",PORT);
    
 
});
new Application({app:app});


