import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { IResponse } from 'src/app/interfaces/iresponse.interface';
import { User } from 'src/app/models/user.model';
import { GetService } from 'src/app/services/get.service';
import { StateService } from 'src/app/services/state.service';
import { environment } from 'src/environments/environment';

@Component({
selector: 'app-car-dialog',
templateUrl: './car-dialog.component.html',
styleUrls: ['./car-dialog.component.scss'],
changeDetection: ChangeDetectionStrategy.OnPush,
encapsulation: ViewEncapsulation.None

})
export class CarDialogComponent implements OnInit {
	public carData!:FormGroup;
	public usersSelectList:any[] = [];
	// public usersViewers = new FormControl();
	public selectedViewers: number[] = []
	public usersViewers = new FormControl([]);
	public environmentApi = environment.api;
	
	public showImageSrc = ''
	public isShowFullImage = false;
	public isShowDeleteImage = false;
	public folderForRemoveImage = '';
	public imageForRemove = '';

	public myForm = new FormGroup({
		photo: new FormControl('', [Validators.required]),
		fileSource: new FormControl('', [Validators.required]),
		selectedType: new FormControl('auction', [Validators.required]),
	});
	public selectedDeliveryStatus = null
	public selectTypes: any[] = [
		{value: 'auction', viewValue: 'Аукцион'},
		{value: 'docs', viewValue: 'Документы'},
		{value: 'invoices', viewValue: 'Инвойсы'},
		{value: 'port', viewValue: 'Порт'},
		{value: 'warehouse', viewValue: 'Склад'},
		];
	public auctionsList = ['IAAI','Copart']	
	public isShowButton:boolean = false
	constructor( public dialogRef: MatDialogRef<CarDialogComponent>,
				@Inject(MAT_DIALOG_DATA) public data: any,
				public SS:StateService,
				public getService:GetService,
				public httpClient:HttpClient,
				public cdr:ChangeDetectorRef) { }


	public ngOnInit(): void {
		console.log(`this.data`,this.data)

		if(this.data.mode==='edit') {

			this.carData = new FormGroup({
			photo: new FormControl(this.data.photo),
			purchaseDate: new FormControl(this.data.purchaseDate),
			auction: new FormControl(this.data.auction),
			model: new FormControl(this.data.model),
			vin: new FormControl(this.data.vin),
			price: new FormControl(this.data.price),
			port: new FormControl(this.data.port),
			title: new FormControl(this.data.title),
			container: new FormControl(this.data.container),
			customer: new FormControl(this.data.customer),
			status: new FormControl(this.data.status),
			_id: new FormControl(this.data._id),
			});
		} else if(this.data.mode==='create') {

			this.carData = new FormGroup({
			photo: new FormControl(``),
			purchaseDate: new FormControl(new Date()),
			auction: new FormControl(``),
			model: new FormControl(``),
			vin: new FormControl(``),
			price: new FormControl(0),
			port: new FormControl(``),
			title: new FormControl(false),
			container: new FormControl(``),
			customer: new FormControl(``),
			status: new FormControl(``),
		
			});
		} else if(this.data.mode==='connect'){
			if(!this.SS.isUsersLoaded && this.SS.currentUser.role ==='admin' || this.SS.currentUser.role ==='superadmin') {
			
			this.getService.getItem('users').pipe()
				.subscribe( (res:IResponse|any)=>{
			
				if(res.status===1) {
					this.SS.userList = this.SS.setUserList(res.data);
					this.usersSelectList = this.SS.userList.filter(el=>el.role!=='superadmin')
					
					this.usersSelectList.forEach(user=>{
						const exist = user.carList.find( (item:any)=>item.vin===this.data.vin)
				
						if(!!exist) {
							this.selectedViewers.push(user.item_id)
						}
					})

					this.cdr.detectChanges()
				}
			
				this.SS.isCarsLoaded = false
			})
			}
		} else  if(this.data.mode==='photos') {

			
		}
		
		


	
	}
	ngOnDestroy() {
		this.isShowFullImage = false;
		this.isShowDeleteImage = false;
		this.folderForRemoveImage = '';
		this.imageForRemove = '';
	}


	public onNoClick(): void {
		this.dialogRef.close();
	}
	public submitForm() {

		if(this.data.mode==='edit') {
			const item = {...this.carData.value,item_id:this.data.item_id}
			
			const request$ = this.getService.editItem(`car`,item).pipe(
			//  tap(data => console.log(data) ),
				switchMap( (data:any ) => {
					if(data) {
					
					this.SS.isCarsLoaded = false;
					this.SS.isUsersLoaded = false
					return this.getService.getItem('cars').pipe(
						tap( (res:any) => {
			
							this.SS.carsList = this.SS.setCarList(res.data);
							this.SS.isCarsLoaded = true
						//   console.log(res)
						}),
							
						)
					} else {
					return of(false)
					}

						

				})
			)
			.subscribe(
				(res:any)=>{
				this.dialogRef.close();
				request$.unsubscribe();
				this.cdr.detectChanges()
				}
			)
		}
		if(this.data.mode==='create') {
		
			const item = {...this.carData.value}
			const request$ = this.getService.createItem(`car`,item).pipe(
			//  tap(data => console.log(data) ),
				switchMap( (data:any ) => {
					if(data) {
					//  console.log(data)
					this.SS.isCarsLoaded = false
					return this.getService.getItem('cars').pipe(
						tap( (res:any) => {
			
							this.SS.carsList = this.SS.setCarList(res.data);
							this.SS.isCarsLoaded = true
						//   console.log(res)
						}),
							
						)
					} else {
						return of(false)
					}

						

				})
			)
			.subscribe(
				(res:any)=>{
				this.dialogRef.close();
				request$.unsubscribe();
				this.cdr.detectChanges()
				}
			)
		}

	}

	public removeCar(data:any) {
		console.log('remove')
		const request$ = this.getService.removeItem(`car`,data._id).pipe(
			tap(data => console.log(data) ),
			switchMap( (data:any ) => {
				if(data) {
					this.SS.isCarsLoaded = false
					return this.getService.getItem('cars').pipe(
						tap( (res:any) => {
						this.SS.carsList = this.SS.setCarList(res.data);
						this.SS.isCarsLoaded = true
						}),
						
						)
				} else {
					return of(false)
				}

					

			})
		)
		.subscribe(
		(res:any)=>{
				this.dialogRef.close();
				request$.unsubscribe();
				this.cdr.detectChanges()
			}
		)
	}
	public checkCar(list:any[]) {
		console.log(`list`,list)

		const exist = list.find(el=>el.item_id===this.data.item_id)
		return !!exist


	}
	public onCheckboxTap(ev:any,item_id:number) {

		const data = {
			_id: this.data._id,
			user_id: item_id,
			car_id: this.data.item_id,
			vin:this.data.vin,
			action: ev.checked
		}
		console.log(`data`,data)
	
		this.getService.setItem('user_set_car',data).pipe(
	
			switchMap( (data:any ) => {
				if(data) {
					console.log(data)
					this.SS.isUsersLoaded = false
					return this.getService.getItem('users').pipe(
						tap( (res:any) => {

							this.SS.userList = this.SS.setUserList(res.data);
							this.usersSelectList = this.SS.userList.filter(el=>el.role!=='superadmin')
							this.SS.isUsersLoaded = true
						}),
						
				)
				} else {
					return of(false)
				}
			})
		)
		.subscribe(res=>{
			console.log(`setItem`,res)
		})
	}
	public selectItem(ev:any,user:User){
		console.log(ev,ev.isUserInput)
		console.log(ev.source.selected)
		console.log(`this.data`,this.data)
		if (ev.isUserInput) {    // ignore on deselection of the previous option
		console.log('Meta Signal Changed to ' + user + ev.isUserInput);

		// const exist = user.carList.find(car_id=>car_id===this.data.item_id);
		// console.log(`exist`,exist)
		// if(!!exist) return 
		const data = {
			user_id: user.item_id,
			car_id: this.data.item_id,
			action: ev.source.selected
		}
		// if(ev.source.selected) {
			this.getService.setItem('user_set_car',data).pipe(
		//   tap(data => console.log(data) ),
			switchMap( (data:any ) => {
				if(data) {
				console.log(data)
					this.SS.isUsersLoaded = false
					return this.getService.getItem('users').pipe(
						tap( (res:any) => {
		
						this.SS.userList = this.SS.setUserList(res.data);
						this.usersSelectList = this.SS.userList.filter(el=>el.role!=='superadmin')
			
						this.usersSelectList.forEach(user=>{
							const exist = user.carList.find( (item_id:number)=>item_id===this.data.item_id)
					
							if(!!exist) {
							this.selectedViewers.push(user.item_id)
							}
						})
						this.SS.isUsersLoaded = true
					//    console.log(res)
						}),
						
						)
				} else {
					return of(false)
				}
		
					
		
			})
			)
			
			
			
			.subscribe(res=>{
			console.log(`setItem`,res)
			})
		}

	}




	public onFileChange(event:any) {

		if (event.target.files.length > 0) {
			const file = event.target.files[0];
			this.myForm.patchValue({
				fileSource: file
			});
			this.isShowButton = true
		}
	}

	public submitFileForm(){
		if(!this.isShowButton) return 
		const formData = new FormData();
		console.log(`this.myForm.get('fileSource')?.value`,this.myForm.get('file')?.value)
		formData.append('photo', this.myForm.get('fileSource')?.value,'photo');
		console.log(`this.myForm.get('fileSource')?.value`,this.myForm.get('fileSource')?.value)


		console.log(`formData`,formData)
		const dir = this.myForm.get('selectedType')?.value

		this.getService.upload(dir, formData,this.data).pipe(
			tap(data => console.log(data) ),
			switchMap( (resonse:any ) => {
				if(resonse) {
					if(resonse.data) {
					this.data.photoList = resonse.data.photoList;
					this.cdr.detectChanges()
					}
				console.log(resonse)
					this.SS.isCarsLoaded = false
					return this.getService.getItem('cars').pipe(
						tap( (res:any) => {

						this.SS.carsList = this.SS.setCarList(res.data);
						this.SS.isCarsLoaded = true
					//    console.log(res)
						}),
						
						)
				} else {
					return of(false)
				}

					

			})
			).subscribe({
				next: (v) => console.log(v),
				error: (e) => console.error(e),
				complete: () => {
				console.info('complete');
				//  this.myForm.reset();
				this.isShowButton = false
				}

			})

	}
	public setImgSrc(folder:string,img:string):string {
		return `${this.environmentApi}/uploads/${this.data.vin}/${folder}/${img}`
	}
	public removeImg(folder:string,img:string) {
		console.log('remove image',img)
		this.folderForRemoveImage = folder;
		this.imageForRemove = img;
		this.isShowDeleteImage = true
	}
	public showFullSizeImg(folder:any,img:string) {
		this.isShowFullImage = true;
		this.showImageSrc = `${this.environmentApi}/uploads/${this.data.vin}/${folder}/${img}`
		console.log(img)
		// if( event.target.classList.contains('full-image')) {
		//   event.target.classList.remove('full-image')
		// } else {
		//   event.target.classList.add('full-image')
		// }
		
	}

	public closeShowImage(){
		this.isShowFullImage = false;
		this.showImageSrc = ''
	}


	public confirmRemoveImage() {
		// console.log(this.data,this.folderForRemoveImage,this.imageForRemove)
		// const item = {...this.data,item_id:this.data.item_id}
		console.log('item',this.data,this.folderForRemoveImage,this.imageForRemove)
		console.log(this.data.photoList[this.folderForRemoveImage])
		this.data.photoList[this.folderForRemoveImage] = this.data.photoList[this.folderForRemoveImage].filter( (el:string)=>el!==this.imageForRemove)
		console.log(this.data.photoList[this.folderForRemoveImage])
		const additionals = {
		folder:this.folderForRemoveImage,
		image:this.imageForRemove
		}
		// const item = {...this.carData.value,item_id:this.data.item_id}
		
		const request$ = this.getService.editItem(`car`,this.data,additionals).pipe(
		//  tap(data => console.log(data) ),
		switchMap( (data:any ) => {
			if(data) {
			
				this.SS.isCarsLoaded = false
				return this.getService.getItem('cars').pipe(
					tap( (res:any) => {

					this.SS.carsList = this.SS.setCarList(res.data);
					this.SS.isCarsLoaded = true
				//   console.log(res)
					}),
					
					)
			} else {
				return of(false)
			}

				

		})
		)
		.subscribe(
		(res:any)=>{
			// this.dialogRef.close();
			request$.unsubscribe();
			this.cdr.detectChanges()
		}
		)

		this.isShowDeleteImage = false
	}
	public noRemoveImage(){
		this.isShowDeleteImage = false;
		this.folderForRemoveImage = '';
		this.imageForRemove = ''
	}
}
