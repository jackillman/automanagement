import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})
export class CarDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<CarDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public SS:StateService,
              public getService:GetService,
              public cdr:ChangeDetectorRef) { }
              foods: any[] = [
                {value: 'steak-0', viewValue: 'Steak'},
                {value: 'pizza-1', viewValue: 'Pizza'},
                {value: 'tacos-2', viewValue: 'Tacos'},
              ];
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
               console.log(`this.SS.carsList`,this.SS.userList)
               this.cdr.detectChanges()
              }
           
            this.SS.isCarsLoaded = false
          })
        }
      }
      
     


     
    }

    public selectItem(ev:any,id:number){
      console.log(ev,id)
      console.log(ev.source.selected)
      console.log(`this.data`,this.data)
      if(ev.source.selected) {

      }
 
    }
  public onNoClick(): void {
    this.dialogRef.close();
  }
  public submitForm() {
    console.log(`carData`,this.carData.value);

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
      console.log('this.data',this.data)
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
}
