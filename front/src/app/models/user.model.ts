export class User {
    public  allAuto: number = 0;
    public  inWorkAuto: number = 0;
    public  isCreator: boolean = false;
    public  lastName: string = '';
    public  login: string = '';
    public  name: string = '';
    public  token: string = '';
    public carList: [] = [];
    public email:string = '';
    public item_id:number = 0;
    public role: string = '';
    public _id:string = '';
    constructor(values: object = {}) {
     
        Object.assign(this, values);
    };
}