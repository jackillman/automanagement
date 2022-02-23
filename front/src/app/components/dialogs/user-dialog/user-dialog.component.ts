import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { IResponse } from 'src/app/interfaces/iresponse.interface';
import { GetService } from 'src/app/services/get.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None

})
export class UserDialogComponent implements OnInit {
  public checkedRole: string ='';
  public roles: string[] = ['client', 'admin'];
  public userData!:FormGroup;
  public includedCars:any[] = []
  
  constructor( public dialogRef: MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public SS:StateService,
              public getService:GetService,
              public cdr:ChangeDetectorRef) { }
   
   
    public ngOnInit(): void {
      console.log(`this.data`,this.data)

      if(this.data.mode==='edit') {
        this.includedCars = this.data.carList.map( (el:any)=>{
          el.checked =true;
          return el
        })
        this.userData = new FormGroup({
          login: new FormControl(this.data.login),
          name: new FormControl(this.data.name),
          lastName: new FormControl(this.data.lastName),
          email: new FormControl(this.data.email),
          isCreator: new FormControl(this.data.isCreator),
          carList: new FormControl(this.data.carList),
          role: new FormControl(this.data.role),
          allAuto: new FormControl(this.data.allAuto),
          inWorkAuto: new FormControl(this.data.inWorkAuto),
          
    
        });
      } else if(this.data.mode==='create') {

        this.userData = new FormGroup({
          login: new FormControl(``),
          name: new FormControl(``),
          lastName: new FormControl(``),
          email: new FormControl(``),
          isCreator: new FormControl(``),
          carList: new FormControl([]),
          role: new FormControl(``),
          allAuto: new FormControl(``),
          inWorkAuto: new FormControl(``),
          password: new FormControl(`password`),
    
        });
      }

 
    }
  public checkboxPress(ev:any,car:any) {
    console.log(ev,car)
    this.includedCars.forEach(carItem=>{
      if(carItem._id===car._id)  car.checked = ev.checked
     
    })

  }
  public onNoClick(): void {
    this.dialogRef.close();
  }
  public submitForm() {
   
    if(this.data.mode==='edit') {
 
      const list:any[] = []
      this.includedCars.forEach(el=>{
        if(el.checked)  {
          list.push({
            _id:el._id,
            item_id:el.item_id,
            vin:el.vin
          })
        }

      })
  
      const item = {...this.userData.value,item_id:this.data.item_id,_id:this.data._id,carList:list}
   
      const request$ = this.getService.editItem(`user`,item).pipe(
        // tap(data => console.log(data) ),
        switchMap( (data:any ) => {
            if(data) {
             
              this.SS.isUsersLoaded = false
               return this.getService.getItem('users').pipe(
                  tap( (res:any) => {
    
                    this.SS.userList = this.SS.setUserList(res.data);
                    this.SS.isUsersLoaded = true;
                  
                    if(item.item_id===this.SS.currentUser.item_id) {
                      const curUser = this.SS.userList.find(user=>user.item_id===item.item_id)
                      this.SS.currentUser = { ...this.SS.currentUser,...curUser }
                    }
                 
                    this.cdr.detectChanges()
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
  
      const item = {...this.userData.value}
      const request$ = this.getService.createItem(`user`,item).pipe(
        // tap(data => console.log(data) ),
        switchMap( (data:any ) => {
            if(data) {
          
              this.SS.isUsersLoaded = false
              return this.getService.getItem('users').pipe(
                tap( (res:any) => {
  
                  this.SS.userList = this.SS.setUserList(res.data);
                  this.SS.isUsersLoaded = true
               
                }),
                  
                )
            } else {
              return of(false)
            }
  
                
  
        })
      )
      .subscribe(
        (res:any)=>{
        //  console.log(res)
        this.dialogRef.close();
        request$.unsubscribe();
        this.cdr.detectChanges()
        }
      )
    }

  }
  // public saveCreate() {
  //   const item = {...this.userData.value}
  //   // console.log(`item`,item)
  // }
  public removeUser(data:any) {
    console.log(`data`,data)
    const request$ = this.getService.removeItem(`user`,data._id).pipe(
      tap(data => console.log(data) ),
      switchMap( (data:any ) => {
          if(data) {
            console.log(data)
            this.SS.isUsersLoaded = false
             return this.getService.getItem('users').pipe(
                tap( (res:any) => {

                  this.SS.userList = this.SS.setUserList(res.data);
                  this.SS.isUsersLoaded = true
                  console.log(res)
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
