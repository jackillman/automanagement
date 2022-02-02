import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CarDialogComponent } from './car-dialog.component';


@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      FormsModule
  ],
  declarations: [

      CarDialogComponent,

  ],
  entryComponents: [

  ]
})

export class CarDialogModule {
 
}
