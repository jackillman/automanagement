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

@Component({
  selector: 'app-car-dialog',
  templateUrl: './car-dialog.component.html',
  styleUrls: ['./car-dialog.component.scss'],
 // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})
export class CarDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<CarDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public SS:StateService,
              public getService:GetService,
              public httpClient:HttpClient,
              public cdr:ChangeDetectorRef) { }

    public carData!:FormGroup;
    public usersSelectList:any[] = [];
    // public usersViewers = new FormControl();
    public selectedViewers: number[] = []
    public usersViewers = new FormControl([])
    public ngOnInit(): void {
    //  console.log(`this.data`,this.data)

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
          
        });
      } else if(this.data.mode==='create') {

        this.carData = new FormGroup({
          photo: new FormControl(``),
          purchaseDate: new FormControl(``),
          auction: new FormControl(``),
          model: new FormControl(``),
          vin: new FormControl(``),
          price: new FormControl(1111),
          port: new FormControl(``),
          title: new FormControl(true),
          container: new FormControl(``),
          customer: new FormControl(``),
          status: new FormControl(``),
       
        });
      } else if(this.data.mode==='connect'){
        if(!this.SS.isUsersLoaded && this.SS.currentUser.role ==='admin' || this.SS.currentUser.role ==='superadmin') {
          
          this.getService.getItem('users').pipe(
       
      
            ).subscribe( (res:IResponse|any)=>{
           
              if(res.status===1) {
                this.SS.userList = this.SS.setUserList(res.data);
                this.usersSelectList = this.SS.userList.filter(el=>el.role!=='superadmin')
         
                this.usersSelectList.forEach(user=>{
                  const exist = user.carList.find( (item_id:number)=>item_id===this.data.item_id)
            
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
        // this.uploadForm =  new FormGroup({
        //   profile: new FormControl(``),
      
        // });
        console.log(`this.data.mode`,this.data.mode)
        this.uploadForm = new FormGroup({
          fileItem: new FormControl(null),
        })

        
      }
      
     


     
    }

    // public setVal(user:User) {
    //   const num = user.carList.find( (el:number)=>el===this.data.item_id)
    //   if(!!num) {
    //     this.selectedViewers.push(user.item_id)
    //   }

    // }

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
  // public saveCreate() {
  //   const item = {...this.carData.value}
  //   console.log(`item`,item)
  // }
  public removeCar(data:any) {
    console.log('remove')
    const request$ = this.getService.removeItem(`car`,data.item_id).pipe(
      tap(data => console.log(data) ),
      switchMap( (data:any ) => {
          if(data) {
         //   console.log(data)
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
  public onCheckboxTap(ev:any,item_id:number){
    console.log(`ev`,ev)
    console.log(`item_id`,item_id)
    const data = {
      user_id: item_id,
      car_id: this.data.item_id,
      action: ev.checked
    }
    console.log(`data`,data)
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
         
                    // this.usersSelectList.forEach(user=>{
                    //   const exist = user.carList.find( (item_id:number)=>item_id===this.data.item_id)
                
                    //   if(!!exist) {
                    //     this.selectedViewers.push(user.item_id)
                    //   }
                    // })
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

//  fileName = '';
//  onFileSelected(event:any) {
// //  type dirPhoto = 'auction' || 'warehouse' || 'port' || 'docs' || 'invoices'
//   const file:File = event.target.files[0];
//   console.log(`file`,file)
//   if (file) {

//       this.fileName = file.name;

//       const formData = new FormData();

//       formData.append("thumbnail", file);
//       console.log(`formData`,formData)
//       const upload$ = this.getService.upload('auction',formData)
//     //  const upload$ = this.http.post("/api/thumbnail-upload", formData);

//       upload$.subscribe(res=>{
//         console.log(res)
//       });
//   }
// }

  fileToUpload: File | null = null;
  handleFileInput(ev: any) {
    const files = ev.target.files
    console.log(files)
    this.fileToUpload = files.item(0);
    const formData:any = new FormData();

    formData.append("thumbnail", this.fileToUpload);
    // this.getService.upload('auction',formData).subscribe(
    //   res=>console.log(res)
    // )
  }
  uploadFileToActivity() {
    console.log(`uploadFileToActivity`,this.fileToUpload)
    this.getService.upload('auction',this.fileToUpload).subscribe(
      res=>console.log(res)
    )
  
  }

 uploadForm!: FormGroup | any;
// onFileSelect(event:any) {
//   if (event.target.files.length > 0) {
//     const file = event.target.files[0];
//     console.log(`file`,file)
   
//     // this.uploadForm.get('fileItem').setValue(file);
//     this.uploadForm.patchValue({
//       fileItem: file,
//    })
  
//   }
// }
//   onSubmit() {
//     const formData = new FormData();
//     formData.append('file', this.uploadForm.get('fileItem').value);

//     this.getService.upload('auction', formData).subscribe({
//       next: (v) => console.log(v),
//       error: (e) => console.error(e),
//       complete: () => console.info('complete') 

//     }  )
//   }
  // public sendFile(inputFile:any) {
  //   console.log(inputFile.files)
  //   const file = inputFile.files[0]
  //   const form_data:any = new FormData();
  //   form_data.append('myFile', file);
  //   form_data.append('lol', 'lol');
  //   console.log(`fd`,form_data.getAll(`myFile`))
  //   console.log(`file`,file)
  //   console.log('boundary:', form_data._boundary);
  //   for (var key of form_data.entries()) {
	// 		console.log(key[0] + ', ' + key[1])
	// 	}
  //   this.getService.upload('auction', form_data).subscribe({
  //     next: (v) => console.log(v),
  //     error: (e) => console.error(e),
  //     complete: () => console.info('complete') 

  //   }  )
  //   // const selectedFile = document.getElementById('input').files[0];
  // }



  myForm = new FormGroup({
    photo: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  submitFileForm(){

    const formData = new FormData();
    console.log(`this.myForm.get('fileSource')?.value`,this.myForm.get('file')?.value)
    formData.append('photo', this.myForm.get('fileSource')?.value,'photo');
    console.log(`this.myForm.get('fileSource')?.value`,this.myForm.get('fileSource')?.value)


    console.log(`formData`,formData)


    // formData.append("hello", "world")
    // formData.append("file", fs.createReadStream(file))
    // formData.pipe(concat(data => {
  
      this.getService.upload('auction', formData).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
  
      }  )
    // }))
    // const request = new HttpRequest('POST',`/api/v1/upload`,{body:formData},{
    //   headers: new HttpHeaders().append('Content-Type', 'multipart/form-data'),
    //   reportProgress: true
    // })
    // this.httpClient.request(request).subscribe(res=>{
    //   console.log(res)
    // })
    
    // this.getService.upload('auction', formData).subscribe({
    //   next: (v) => console.log(v),
    //   error: (e) => console.error(e),
    //   complete: () => console.info('complete') 

    // }  )
  }
}
