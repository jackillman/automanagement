
//#!/usr/bin/env node
import express  from 'express';
import  fs  from "fs";
import path from 'path';
const crypto = require('crypto')
const jwt = require('express-jwt');
import { Schema } from 'mongoose';
const jsonwebtoken = require('jsonwebtoken');
// import { User } from './models/user';


export class Application {
    private tokenKey = '1a2b-3c4d-5e6f-7g8h'
    private carScheme = new Schema({
      id_:String,
      photo: String,
      purchaseDate: String,
      auction: String,
      model: String,
      vin:{ type : String ,  required : true },
      price: Number,
      port: String,
      title: Boolean,
      container: Number,
      customer: String,
      status: String,
      item_id:{ type : Number , unique : true, required : true }
    }, {versionKey: false})
    private userScheme = new Schema({
      id_:String,
      isCreator:Boolean,
      login:{ type : String ,  required : true },
      name:String,
      lastName:String,
      password:String,
      allAuto:Number,
      inWorkAuto:Number,
      item_id:{ type : Number , unique : true, required : true },
      carList:{ type : Array , "default" : [{item_id:String,rights:String}] },
      role:String
    }, {versionKey: false})
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
    //   const Users = this.data.mongoose.model("Users", this.userScheme);
    //   Users.find({}, function(err, users){

    //     if(err) return console.log(err);
    //     return users
    // });
  }
  public getAllUsers(res) {

      const Users = this.data.mongoose.model("Users", this.userScheme);
      Users.find({}, function(err, users){

        if(err) return console.log(err);
        res.send({status: 1,data:users})
    });
  }

  public getAllCars(res:express.Response) {

    const Cars = this.data.mongoose.model("Cars", this.carScheme);
      Cars.find({}, function(err, cars){

        if(err) return console.log(err);
        res.send({status: 1,data:cars})
    });
  }


  public async createUser(req,res) {
    if(!req.body) return res.sendStatus(400);

      const Users = this.data.mongoose.model("Users", this.userScheme);
      const foundedUser = await Users.findOne({login: req.body.login  })
     
      if(!!foundedUser) {
        res.send({
          status: 0,
          data: null,
          message:'user exists',
        })
      } else {
        const lastItem = await Users.find({}).sort({item_id: -1}).limit(1);
      
     

      const user = new Users({
        isCreator:req.body.isCreator,
        login:req.body.login,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        allAuto:+req.body.allAuto,
        inWorkAuto: +req.body.inWorkAuto,
        name:req.body.name,
        role:req.body.role,
        carList:req.body.carList,
        item_id:lastItem[0].item_id+1
      })

      user.save(function(err){
          if(err) {
            return console.log(err);
          }
          res.send({
            status: 1,
            data: user,
          });
      });
      }
  }

  public async editUser(req,res) {
    if(!req.body) return res.sendStatus(400);

      const Users = this.data.mongoose.model("Users", this.userScheme);
      // const item_id = +req.body.item_id;
      const filter = {item_id:+req.body.item_id}
      const obj = {...req.body}

      Users.findOneAndUpdate(
        filter,              // критерий выборки
        { $set:  obj
          
        },     // параметр обновления
        {
          new: true
        },
        function(err, result){
              
           
            res.send({status:1,data:result}) 
        }
    );
  }

  public deleteUser(req,res) {
    const Users = this.data.mongoose.model("Users", this.userScheme);
    const item_id = +req.body.item_id;
   
    Users.findOneAndDelete({item_id:item_id}, function(err, user){
        
        if(err) return console.log(err);
        if(user) {
          res.send({status:1,data:user,message:'User was deleted'});
        } else {
          res.send({
                  status: 0,
                  data: null,
                  message:`Такого юзера не существует`
                });
        }
        
    });

  }


  public async createCar(req,res) {
    if(!req.body) return res.sendStatus(400);

      const Cars = this.data.mongoose.model("Cars", this.carScheme);
      const foundedCar = await Cars.findOne({vin: req.body.vin  })
     
      if(!!foundedCar) {
        res.send({
          status: 0,
          data: null,
          message:'car exists',
        })
      } else {
        const lastItem = await Cars.find({}).sort({item_id: -1}).limit(1);
      
     

      const car = new Cars({
        photo:req.body.photo,
        purchaseDate: req.body.purchaseDate,
        auction: req.body.auction,
        model: req.body.model,
        vin: req.body.vin,
        price: req.body.price,
        port: req.body.port,
        title: req.body.title,
        container: req.body.container,
        customer: req.body.customer,
        status: req.body.status,

        item_id:lastItem[0].item_id+1
      })

      car.save(function(err){
          if(err) {
            return console.log(err);
          }
          res.send({
            status: 1,
            data: car,
          });
      });
      }
  }


  public async editCar(req,res) {
    if(!req.body) return res.sendStatus(400);

      const Cars = this.data.mongoose.model("Cars", this.carScheme);
      // const item_id = +req.body.item_id;
      const filter = {item_id:+req.body.item_id}
      const obj = {...req.body}

      Cars.findOneAndUpdate(
        filter,              // критерий выборки
        { $set:  obj },     // параметр обновления
        {
          new: true
        },
        function(err, result){
              
           
            res.send({status:1,data:result }) 
        }
    );
  }
  

  public deleteCar(req,res) {
    const Cars = this.data.mongoose.model("Cars", this.carScheme);
    const item_id = +req.body.item_id;
   
    Cars.findOneAndDelete({item_id:item_id}, function(err, car){
        
        if(err) return console.log(err);
        if(car) {
          res.send({status:1,data:car,message:'Car was deleted'});
        } else {
          res.send({
                  status: 0,
                  data: null,
                  message:`Такого Авто не существует`
                });
        }
        
    });

  }


  public searchCarsByIds(req,res) {
  
    const Cars = this.data.mongoose.model("Cars", this.carScheme);
    const carList = req.body.carList;
  
    const ids = carList.map(el=>el.item_id)
   
    Cars.find(  {item_id: {
      $in: ids
    }
  }, function(err, car){
        
        if(err) return console.log(err);
        console.log(car)
        if(car) {
          res.send({status:1,data:car});
        } else {
          res.send({
                  status: 0,
                  data: [],
                  message:`Нет авто`
                });
         
        }
        
    });

  }





    private createApi(){
  

        this.data.app.get('/api/v1/users', (req:express.Request ,res:express.Response,next:Function)=> this.getAllUsers(res));
        this.data.app.post('/api/v1/user',(req:express.Request ,res:express.Response,next:Function)=> this.createUser(req,res))
        this.data.app.delete('/api/v1/user',(req:express.Request ,res:express.Response,next:Function)=> this.deleteUser(req,res))
        this.data.app.put('/api/v1/user',(req:express.Request ,res:express.Response,next:Function)=> this.editUser(req,res))
       
        this.data.app.get('/api/v1/cars', jwt({ secret:this.tokenKey,algorithms: ['HS256'] }),  (req:express.Request ,res:express.Response,next:Function)=> this.getAllCars(res));
        this.data.app.post('/api/v1/car',(req:express.Request ,res:express.Response,next:Function)=> this.createCar(req,res))
        this.data.app.delete('/api/v1/car',(req:express.Request ,res:express.Response,next:Function)=> this.deleteCar(req,res))
        this.data.app.put('/api/v1/car',(req:express.Request ,res:express.Response,next:Function)=> this.editCar(req,res))


        this.data.app.post('/api/v1/carsearch',(req:express.Request ,res:express.Response,next:Function)=> this.searchCarsByIds(req,res))


        this.data.app.post('/api/v1/auth/', async (req, res) => {
          const users = await this.getUsers()
          console.log(`users`,users)
          console.log(`req.body`,req.body)
          for (let user of users) {
            if (
              req.body.login === user.login &&
              req.body.password === user.password
            ) {
              // let head = Buffer.from(
              //   JSON.stringify({ alg: 'HS256', typ: 'jwt',  expiresIn: '15m' })
              // ).toString('base64')
              // let body = Buffer.from(JSON.stringify(user)).toString(
              //   'base64'
              // )
              // let signature = crypto
              //   .createHmac('SHA256', this.tokenKey)
              //   .update(`${head}.${body}`)
              //   .digest('base64')
              //   console.log(`signature`,signature)
                const token = jsonwebtoken.sign(user, this.tokenKey);
                console.log(`token`,token)
              return res.status(200).json({
                id: user.id,
                login: user.login,
                name: user.name,
                lastName:user.lastName,
                allAuto:user.allAuto,
                inWorkAuto:user.inWorkAuto,
                isCreator:user.isCreator,
                token
              //  token: `${head}.${body}.${signature}`,
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
