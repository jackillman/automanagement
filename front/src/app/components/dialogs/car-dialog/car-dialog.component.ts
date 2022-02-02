import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { tap } from 'rxjs/internal/operators/tap';
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
              public getService:GetService) { }
   
    public carData = new FormGroup({
      photo: new FormControl(this.data ? this.data.photo : ''),
      purchaseDate: new FormControl(this.data ? this.data.purchaseDate : ''),
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
      }
    }


  public onNoClick(): void {
    this.dialogRef.close();
  }
  public submitForm() {
    console.log(`carData`,this.carData.value);

    if(this.data.mode==='edit') {
      const item = {...this.carData.value,item_id:this.data.item_id}
      console.log(item)
      const request$ = this.getService.editItem(`car`,item).pipe(
        tap(data => console.log(data) ),
        switchMap( (data:any ) => {
            if(data) {
              console.log(data)
              this.SS.isCarsLoaded = false
               return this.getService.getItem('cars').pipe(
                  tap( (res:any) => {
    
                    this.SS.carsList = [...res.data];
                    this.SS.isCarsLoaded = true
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
          console.log(res)
  
        }
      )
    }
    if(this.data.mode==='create') {
      console.log('this.data',this.data)
      const item = {...this.carData.value}
      const request$ = this.getService.createItem(`car`,item).pipe(
        tap(data => console.log(data) ),
        switchMap( (data:any ) => {
            if(data) {
              console.log(data)
              this.SS.isCarsLoaded = false
               return this.getService.getItem('cars').pipe(
                  tap( (res:any) => {
    
                    this.SS.carsList = [...res.data];
                    this.SS.isCarsLoaded = true
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
          console.log(res)
  
        }
      )
    }

  }
  public saveCreate() {
    const item = {...this.carData.value}
    console.log(`item`,item)
  }

}
