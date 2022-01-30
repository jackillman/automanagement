import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientBaseRoutingModule } from './client-base-routing.module';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientBaseComponent } from './client-base.component';

@NgModule({
  declarations: [ClientBaseComponent],
  imports: [
    CommonModule,
    ClientBaseRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
 
  ]
})
export class ClientBaseModule {
  constructor(){
    console.log("ClientBaseModule module")
  }
  
 }