import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { User } from 'src/app/models/user.model';

import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit,OnDestroy {

  constructor(
              public SS:StateService,
              public cdr:ChangeDetectorRef) { }

  ngOnInit(): void {



  }
  ngOnDestroy(){
    this.SS.carsList = [];
    this.SS.currentUser = new User();
    this.SS.isAuth = false;
    localStorage.clear()

  }
}
