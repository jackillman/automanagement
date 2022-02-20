import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CarDialogComponent } from './car-dialog.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      FormsModule,
      MatCheckboxModule,
      MatListModule,
      MatIconModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatRippleModule
  ],
  declarations: [

      CarDialogComponent,

  ],
  entryComponents: [

  ]
})

export class CarDialogModule {
 
}
