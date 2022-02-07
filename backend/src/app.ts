/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */

//#!/usr/bin/env node
import express  from 'express';
import  fs  from "fs";
import path from 'path';
const crypto = require('crypto')
const jwt = require('express-jwt');
import { Schema } from 'mongoose';
import { send } from 'process';
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
      item_id:{ type : Number , unique : true, required : true },
      creator: {_id: String, login: String, item_id: Number, time_create: Number}
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

  //   public  getCars() {
  //     const filePath:string = path.join(__dirname, './DATA/API/cars.json')
  //     return this.fsHandlerApp(filePath);
   
  // }
  //   public  getUsers() {
  //     const filePath:string = path.join(__dirname, './DATA/API/users.json')
  //     return this.fsHandlerApp(filePath);
  //   //   const Users = this.data.mongoose.model("Users", this.userScheme);
  //   //   Users.find({}, function(err, users){

  //   //     if(err) return console.log(err);
  //   //     return users
  //   // });
  // }
  public getAllUsers(res) {

      const Users = this.data.mongoose.model("Users", this.userScheme);
      Users.find({}, function(err, users){
        console.log(`users`,users)
        if(err) return console.log(err);
        res.send({status: 1,data:users})
    });
  }

  public getAllCars(res:express.Response) {

    const Cars = this.data.mongoose.model("Cars", this.carScheme);
   // console.log(`Cars`,Cars)
      Cars.find({}, function(err, cars){
      //  console.log(`cars=`,cars)
        if(err) return console.log(err);
        res.send({status: 1,data:cars})
    });
  }


  public async createUser(req,res) {
    if(!req.body) return res.sendStatus(400);

      const Users = this.data.mongoose.model("Users", this.userScheme);
      const foundedUser = await Users.findOne({login: req.body.login  })
      console.log(`foundedUser`,foundedUser)
      if(!!foundedUser) {
        res.send({
          status: 0,
          data: null,
          message:'user exists',
        })
      } else {
        const lastItem = await Users.find({}).sort({item_id: -1}).limit(1);
      
     

      const user = new Users({
        // isCreator:req.body.isCreator,
      
        isCreator:false,
        login:req.body.login,
        lastName: req.body.lastName,
        password: req.body.password,
        email: req.body.email,
        allAuto:+req.body.allAuto,
        inWorkAuto: +req.body.inWorkAuto,
        name:req.body.name,
        role:this.checkRole(req.body.role),
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
      const obj = {...req.body,role:this.checkRole(req.body.role)}

      Users.findOneAndUpdate(
        filter,              // критерий выборки
        { $set:  obj
          
        },     // параметр обновления
        {
          new: true
        },
        function(err, result){
            // const {password,...item} = result     
            const item = {
              id_:result._id,
              // isCreator:result.isCreator,
              isCreator:false,
              login:result.login,
              lastName: result.lastName,
              email: result.email,
              allAuto:result.allAuto,
              inWorkAuto: result.inWorkAuto,
              name:result.name,
              role: result.role,
              carList:result.carList,
              item_id:result.item_id
            }
            console.log(item,`item`)
            res.send({status:1,data:item}) 
        }
    );
  }

  public deleteUser(req,res) {
    const Users = this.data.mongoose.model("Users", this.userScheme);
    // const item_id = +req.body.item_id;
    const item_id = +req.params.item_id;
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
      const creator = {
        _id:req.user._id,
        login:req.user.login,
        item_id:req.user.item_id,
        time_create:Date.now()
      }
     

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

        item_id:lastItem[0].item_id+1,
        creator:creator
      })

      car.save(function(err){
          if(err) {
            return console.log(err);
          }
        
          const dirPath = path.join(__dirname, './DATA/upload/');
          const pathFull = path.join(dirPath, car.vin)
          fs.mkdir(pathFull,{recursive: true}, (err) => {
            if (err) {
                return console.error(err);
            }
            const p1 = path.join(pathFull, `auction`)
            fs.mkdirSync(p1, { recursive: true });
            const p2 = path.join(pathFull, `warehouse`)
            fs.mkdirSync(p2, { recursive: true });
            const p3 = path.join(pathFull, `port`)
            fs.mkdirSync(p3, { recursive: true });
            const p4 = path.join(pathFull, `docs`)
            fs.mkdirSync(p4, { recursive: true });
            const p5 = path.join(pathFull, `invoices`)
            fs.mkdirSync(p5, { recursive: true });
            console.log('Directory created successfully!');
        });
          res.send({
            status: 1,
            data: car,
          });
      });
      }
  }


  public async editCar(req,res) {
   // console.log(`req.body`,req.body)
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
  public deleteFolderRecursive (directoryPath) {
    if (fs.existsSync(directoryPath)) {
        fs.readdirSync(directoryPath).forEach((file, index) => {
          const curPath = path.join(directoryPath, file);
          if (fs.lstatSync(curPath).isDirectory()) {
           // recurse
            this.deleteFolderRecursive(curPath);
          } else {
            // delete file
            fs.unlinkSync(curPath);
          }
        });
        fs.rmdirSync(directoryPath);
      }
    };

  public deleteCar(req,res) {
    const Cars = this.data.mongoose.model("Cars", this.carScheme);
    // const item_id = +req.body.item_id;
    const item_id = +req.params.item_id;
    const self = this
    const dirPath = path.join(__dirname, './DATA/upload/');
    Cars.findOneAndDelete({item_id:item_id}, function(err, car){
        
        if(err) return console.log(err);
        if(car) {
     
          self.deleteFolderRecursive(path.join(dirPath, car.vin))
        //  fs.rmSync(path.join(dirPath, car.vin), { recursive: true, force: true });
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
    console.log(`carList`,carList)
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

  public checkRole(role:string):string {
    const roles =['superadmin','admin','client'];
    return !!roles.find(roleItem=>roleItem===role) ? role : 'client'
  }
  public async addCarToUser(req,res) {
    console.log(`req`,req.body)
   // const Cars = this.data.mongoose.model("Cars", this.carScheme);
 
    if(!req.body) return res.sendStatus(400);
 
      const Users = this.data.mongoose.model("Users", this.userScheme);
      // const item_id = +req.body.item_id;
      const filter = {item_id:+req.body.user_id}
      // const obj = {carList:req.body.car_id}
      // { $push: { friends: objFriends  } },
      const user = await Users.findOne(filter, function(err, user){
        if(err) return console.log(err);
        return user
       
      });
     
      if(user) {
        if(req.body.action) {

          const exist = user.carList.find(el=>el.item_id===req.body.car_id);
         
          if(!!exist) return res.send({status:1,data:null,message:`car exists in user`});
          user.carList.push({item_id:req.body.car_id});
          
        } else {
        
          const exist = user.carList.find(el=>el.item_id===req.body.car_id);
          if(!exist) return res.send({status:1,data:null,message:`car not remove in user`});
          user.carList = user.carList.filter( el => el.item_id !== req.body.car_id );
          // const index = user.carList.indexOf(req.body.car_id);
          // if (index > -1) {
          //   user.carList.splice(index, 1); 
          // }
         
        }
       
          
          user.carList.sort( (a:number,b:number)=>a-b)
          user.save().then((result) => {
            return res.send({status:1,data:result}) 
          }).catch((err) => {
            return res.send({status:0,data:null}) 
          });

      } else {
        res.send({status:0,data:null,message:`user does not exists`});
      }

  }


    private createApi(){
  
        this.data.app.put('/api/v1/user/set_car', (req:express.Request ,res:express.Response,next:Function)=> this.addCarToUser(req,res));


        this.data.app.get('/api/v1/users', (req:express.Request ,res:express.Response,next:Function)=> this.getAllUsers(res));
        this.data.app.post('/api/v1/user',(req:express.Request ,res:express.Response,next:Function)=> this.createUser(req,res))
        this.data.app.delete('/api/v1/user/:item_id',jwt({ secret:this.tokenKey,algorithms: ['HS256'] }),(req:express.Request ,res:express.Response,next:Function)=> this.deleteUser(req,res))
        this.data.app.put('/api/v1/user',(req:express.Request ,res:express.Response,next:Function)=> this.editUser(req,res))
       
        this.data.app.get('/api/v1/cars', jwt({ secret:this.tokenKey,algorithms: ['HS256'] }),  (req:express.Request ,res:express.Response,next:Function)=> this.getAllCars(res));
        this.data.app.post('/api/v1/car', jwt({ secret:this.tokenKey,algorithms: ['HS256'] }) ,(req:express.Request ,res:express.Response,next:Function)=> this.createCar(req,res))
        this.data.app.delete('/api/v1/car/:item_id',(req:express.Request ,res:express.Response,next:Function)=> this.deleteCar(req,res))
        this.data.app.put('/api/v1/car',(req:express.Request ,res:express.Response,next:Function)=> this.editCar(req,res))


        this.data.app.post('/api/v1/needed_cars',(req:express.Request ,res:express.Response,next:Function)=> this.searchCarsByIds(req,res))


        this.data.app.post('/api/v1/auth/', async (req, res) => {
          const Users = this.data.mongoose.model("Users", this.userScheme);
          const userList = await Users.find({}, function(err, users){
              if(err) return console.log(err);
              return users
          });
        //  console.log(`userList`,userList)
        //   // const users = await this.getUsers()
        //   // console.log(`users`,users)
        //   // console.log(`req.body`,req.body)
          for (let user of userList) {
            if (
              req.body.login === user.login &&
              req.body.password === user.password
            ) {
    
                const token = jsonwebtoken.sign(user.toJSON(), this.tokenKey);
                console.log(`token`,token)
              return res.status(200).json({
                _id: user._id,
                login: user.login,
                name: user.name,
                role: this.checkRole(user.role),
                lastName:user.lastName,
                allAuto:user.allAuto,
                inWorkAuto:user.inWorkAuto,
                isCreator:user.isCreator,
                item_id:user.item_id,
                carList:user.carList,
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
