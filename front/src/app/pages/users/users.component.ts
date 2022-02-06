import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from 'src/app/components/dialogs/user-dialog/user-dialog.component';
import { IResponse } from 'src/app/interfaces/iresponse.interface';
import { GetService } from 'src/app/services/get.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {

  constructor(public getService:GetService,
              public SS:StateService,
              public dialog:MatDialog,
              public cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    if(!this.SS.isUsersLoaded) {
      this.getService.getItem('users').pipe(
   
  
        ).subscribe( (res:IResponse|any)=>{
          console.log(`res`,res)
          if(res.status===1) {
            this.SS.userList = this.SS.setUserList(res.data);
           console.log(`this.SS.carsList`,this.SS.userList)
           this.cdr.detectChanges()
          }
       
        this.SS.isCarsLoaded = false
      })
    }
      this.cdr.detectChanges()
  }
  public isHimself(item_id:number):boolean {
    return this.SS.currentUser.item_id!==item_id
  } 
  displayedColumns: string[] = ['login','name','lastName','email','isCreator','role','cars', 'allAuto', 'inWorkAuto','edit','delete'];

  public openDialog(mode:string,data?:any) {
    console.log(`mode`,mode)
    const dialogRef = this.dialog.open(UserDialogComponent, {
      height: mode === 'delete' ? '260px' : '600px' ,
      width: mode === 'delete' ? '300px' : '800px'  ,
      data:{...data, mode},
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.cdr.detectChanges()
    });
  }
  public getCarIds(list:any[]){
    return list.map(el=>el.item_id)
  }
}
