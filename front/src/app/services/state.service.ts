import { Injectable} from '@angular/core';

export interface IHandleError {
    success: boolean;
    status: number;
    statusText: string;
}

@Injectable()
export class StateService {

    constructor() {
    
    }
    public currentUser:any = {}
    public carsList:any[] = [];
    public isAuth:boolean = false;
    public isCarsLoaded:boolean = false

}