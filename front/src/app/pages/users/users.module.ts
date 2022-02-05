import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { MatTableModule } from '@angular/material/table';
import { UserDialogModule } from 'src/app/components/dialogs/user-dialog/user-dialog.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,

    MatTableModule,
    UserDialogModule
  ]
})
export class UsersModule {
  constructor(){
    console.log("UsersModule module")
  }
  
 }