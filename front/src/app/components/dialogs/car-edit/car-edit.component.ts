import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
import { GetService } from 'src/app/services/get.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.scss']
})
export class CarEditComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<CarEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public SS:StateService,
              public getService:GetService) { }

    carData = new FormGroup({
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
    public ngOnInit(): void {}


  public onNoClick(): void {
    this.dialogRef.close();
  }
  public saveEdit() {
    console.log(`carData`,this.carData.value);

    const item = {...this.carData.value,item_id:this.data.item_id}
    console.log(item)
    const request$ = this.getService.editItem(`editCar`,item).pipe(
      tap(data => console.log(data) ),
      switchMap( (data:any ) => {
       
          console.log(data)
          this.SS.isCarsLoaded = false
           return this.getService.getItem('cars').pipe(
              tap( (res:any) => {

                this.SS.carsList = [...res.data];
                this.SS.isCarsLoaded = true
                console.log(res)
              }
                
              ),
                
              )
              
            //   .subscribe( (res:any)=>{
            //     console.log(`res`,res)
            //     if(res.status===1) {
            //       this.SS.carsList = [...res.data];
            //       this.SS.isCarsLoaded = true
            //     }
             
             
            // })
    

      })
    )
    .subscribe(
      (res:any)=>{
        console.log(res)

      }
    )
  }


}
