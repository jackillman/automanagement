import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs';
import { IResponse } from 'src/app/interfaces/iresponse.interface';

import { GetService } from 'src/app/services/get.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
              public SS:StateService,
              public cdr:ChangeDetectorRef) { }

  ngOnInit(): void {



  }

}
