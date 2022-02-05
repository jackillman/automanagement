import { ICar } from "../interfaces/icar.interface";

export class Car implements ICar{
    public auction: string ='';
    public container: number = 0
    public customer: string = ``
    public item_id: number = 0
    public model: string = ''
    public photo: string = ''
    public port: string = ''
    public price: number = 0
    public purchaseDate: string = ''
    public status: string = ''
    public title: boolean = false
    public vin: string = ''
    public _id: string = ``
    constructor(values: object = {}) {
     
        Object.assign(this, values);
    };
}
