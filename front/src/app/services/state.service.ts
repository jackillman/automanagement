import { Injectable} from '@angular/core';
import { ICar } from '../interfaces/icar.interface';
import { IUser } from '../interfaces/iuser.interface';
import { Car } from '../models/car.model';
import { User } from '../models/user.model';

export interface IHandleError {
    success: boolean;
    status: number;
    statusText: string;
}

@Injectable()
export class StateService {

    constructor() {
    
    }
    public currentUser!:User 
    public carsList:Car[] = [];
    public isAuth:boolean = false;
    public isCarsLoaded:boolean = false;
    public isUsersLoaded:boolean = false;
    public userList:User[] = [];
    public setCarList(list:ICar[]) {
        return [...list.map( (item:ICar)=>new Car(item))]
    }
    public setUserList(list:IUser[]) {
        return [...list.map( (item:IUser)=>new User(item))]
    }

    public statusesDelivery = [
        {
          name:"sent",
          title:"Отправлено"
        },
        {
          name:"dispatch_port",
          title:"Порт отправки"
        },
        {
          name:"floats",
          title:"Плывет"
        },
        {
          name:"delivery_port",
          title:"Порт доставки"
        },
        {
          name:"received",
          title:"Получено"
        }
    ];


    public getStatus(statusName:string):string{
        const status = this.statusesDelivery.find(st=>st.name===statusName)
        if(status) {
            return status.title
        } else {
            return this.statusesDelivery[0].title
        }
    }
}