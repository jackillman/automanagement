import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutomobilesRoutingModule } from './automobiles-routing.module';
import { AutomobilesComponent } from './automobiles.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutomobilesComponent],
  imports: [
    CommonModule,
    AutomobilesRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
 
  ]
})
export class AutomobilesModule {
  constructor(){
    console.log("home module")
  }
  
 }