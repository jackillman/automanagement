export class User {

	public _id: string = '';
	public name: string = '';
    public id: number = 0;
    public isCreator:Boolean = false
    public login:String = '';
    public lastName:String = '';
    public password:String = '';
    public allAuto:Number = 0;
    public inWorkAuto:Number= 0;

	constructor(values: object = {}) {
		Object.assign(this, values);
	}

}