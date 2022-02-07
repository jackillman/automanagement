import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from 'src/app/interfaces/iresponse.interface';
import { GetService } from 'src/app/services/get.service';
import { CarDialogComponent } from '../../components/dialogs/car-dialog/car-dialog.component';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-automobiles',
  templateUrl: './automobiles.component.html',
  styleUrls: ['./automobiles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutomobilesComponent implements OnInit {
  public additionalColumns = ['edit','connect','delete','photos']
  public displayedColumns: string[] = ['position','photo','purchaseDate', 'auction', 'model', 'vin','price','port','title','container','customer','status'];
  constructor(private getService: GetService,
    public SS:StateService,
    public dialog:MatDialog,
    public cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
  //  console.log(JSON.stringify(this.dataSource))
  // if(!this.SS.isCarsLoaded) {
    
  //   const obj = {carList:this.SS.currentUser.carList}
  //   this.getService.getNeededCars('needed_cars',obj).pipe(

  //   ).subscribe(res=>{
  //     console.log(res)
  //   })
  // }
  if(this.SS.currentUser.role==='superadmin' || this.SS.currentUser.role==='admin') {
    this.displayedColumns = this.displayedColumns.concat(this.additionalColumns)
    if(!this.SS.isCarsLoaded) {
      this.getService.getItem('cars').pipe(
   
  
        ).subscribe( (res:IResponse|any)=>{
        
          if(res.status===1) {
            this.SS.carsList = this.SS.setCarList(res.data);
           
           this.cdr.detectChanges()
          }
       
        this.SS.isCarsLoaded = false
      })
    }
  } else {
    if(!this.SS.isCarsLoaded) {
      const obj = {carList:this.SS.currentUser.carList}
      this.getService.getNeededCars('needed_cars',obj).pipe(

        ).subscribe( (res:IResponse|any)=>{
        if(res.status===1) {
          this.SS.carsList = this.SS.setCarList(res.data);
         
         this.cdr.detectChanges()
        }
      })
    }
  }

    this.cdr.detectChanges()
  }
 
 // dataSource = ELEMENT_DATA;
  
 
  add(item:any) {
    console.log(item)
  }
  public openDialog(mode:string,data?:any) {
    
    const dialogRef = this.dialog.open(CarDialogComponent, {
      height: mode === 'delete' ? '260px' : '600px' ,
      width: mode === 'delete' ? '300px' : '800px'  ,
      data:{...data, mode},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cdr.detectChanges()
    });
  }

}
