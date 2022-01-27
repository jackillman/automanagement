import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculatorsRoutingModule } from './calculators-routing.module';
import { CalculatorsComponent } from './calculators.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CalculatorsComponent],
  imports: [
    CommonModule,
    CalculatorsRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
 
  ]
})
export class CalculatorsModule {
  constructor(){
    console.log("home module")
  }
  
 }