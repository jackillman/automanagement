import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { ContactUsComponent } from './contact-us.component';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,

      FormsModule
  ],
  declarations: [

      ContactUsComponent,
      // OrderTemepickerComponent
  ],
  entryComponents: [

  ]
})

export class ContactUsModule {
 
}
