import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CalculatorComponent } from './calculator.component';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      // MatRadioModule,
      // MatTooltipModule,
      FormsModule
  ],
  declarations: [

      CalculatorComponent,
      // OrderTemepickerComponent
  ],
  entryComponents: [

  ]
})

export class CalculatorModule {
 
}
