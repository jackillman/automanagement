import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserDialogComponent } from './user-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatInputModule,
      MatButtonModule,
      FormsModule,
      MatRadioModule,
      MatCheckboxModule
  ],
  declarations: [

      UserDialogComponent,

  ],
  entryComponents: [

  ]
})

export class UserDialogModule {
 
}
