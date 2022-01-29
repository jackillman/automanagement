
//#!/usr/bin/env node
import express  from 'express';
import  fs  from "fs";
import path from 'path';
const crypto = require('crypto')
export class Application {
    private tokenKey = '1a2b-3c4d-5e6f-7g8h'
    private routerModule:any = Object.create({})
    private data:any
    constructor(data:any){
     
     //  console.log("abababababababab",data)
        this.data = data
        this.init();
    }
    public readFile(filePath: string) {
      return new Promise(function (resolve, reject) {
          fs.readFile(filePath, 'utf8', function (err, dataDemo1) {
              if (err)
                  reject(err);
              else
                  resolve(dataDemo1);
          });
      });
  }
    public async fsHandlerApp(filePath:string) {
      // const filePath = path.join(__dirname, '../public/DATA/APIv2/promos.json');
       try {
           const data:any =  await this.readFile(filePath);
         //  console.log(`data`,data)
           return JSON.parse(data)
       } catch (error) {
           console.error(error);
       }

   }

    public  getCars() {
      const filePath:string = path.join(__dirname, './DATA/API/cars.json')
      return this.fsHandlerApp(filePath);
   
  }
    public  getUsers() {
      const filePath:string = path.join(__dirname, './DATA/API/users.json')
      return this.fsHandlerApp(filePath);
   
  }
    private createApi(){
      
        this.data.app.get('/api/v1/cars', async (req:express.Request ,res:express.Response,next:Function)=> {
       
          res.send( await this.getCars());
        });

        
        this.data.app.get('/api/v1/users', async (req:express.Request ,res:express.Response,next:Function)=> {
          console.log(`this.getUsers()`,await this.getUsers())
          res.send(await this.getUsers());
        });
        this.data.app.post('/api/v1/auth/', async (req, res) => {
          const users = await this.getUsers()
          console.log(`users`,users)
          console.log(`req.body`,req.body)
          for (let user of users) {
            if (
              req.body.login === user.login &&
              req.body.password === user.password
            ) {
              let head = Buffer.from(
                JSON.stringify({ alg: 'HS256', typ: 'jwt' })
              ).toString('base64')
              let body = Buffer.from(JSON.stringify(user)).toString(
                'base64'
              )
              let signature = crypto
                .createHmac('SHA256', this.tokenKey)
                .update(`${head}.${body}`)
                .digest('base64')
        
              return res.status(200).json({
                id: user.id,
                login: user.login,
                name: user.name,
                lastName:user.lastName,
                allAuto:user.allAuto,
                inWorkAuto:user.inWorkAuto,
                token: `${head}.${body}.${signature}`,
              })
            }
          }
        
          return res.status(404).json({ message: 'User not found' })
        })
    }

    private init(){
     
        this.createApi();
      

    }
}
