import { Component, OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs';
import { GetService } from 'src/app/services/get.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private getService:GetService,public SS:StateService) { }

  ngOnInit(): void {
    console.log('users')
    if(!this.SS.isCarsLoaded) {
      this.getService.getItem('cars').pipe(
   

        ).subscribe( (res:any)=>{
          console.log(`res`,res)
          if(res.status===1) {
            this.SS.carsList = [...res.data];
          }
       
        this.SS.isCarsLoaded = false
      })
    }

  }

}
