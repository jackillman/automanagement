import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CarEditComponent } from './car-edit.component';


@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,

      FormsModule
  ],
  declarations: [

      CarEditComponent,

  ],
  entryComponents: [

  ]
})

export class CarEditModule {
 
}
