import express from "express";
import  fs  from "fs";
import path from 'path';


const fetchRequest = require('node-fetch');
export default class ApiService {


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
            return JSON.parse(data)
        } catch (error) {
            console.error(error);
        }

    }


    

    public async fsHandlerApi(filePath:string,res:express.Response) {
        // const filePath = path.join(__dirname, '../public/DATA/APIv2/promos.json');
         try {
             const data:any =  await this.readFile(filePath);
              res.send(data)
         } catch (error) {
             console.error(error);
         }
 
     }

    public async getCars(req:express.Request ,res:express.Response,next:Function) {
        console.log(req.path)
        const filePath:string = path.join(__dirname, '../DATA/API/cars.json')
        return this.fsHandlerApp(filePath);
    
    }





};
