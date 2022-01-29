import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutomobilesRoutingModule } from './automobiles-routing.module';
import { AutomobilesComponent } from './automobiles.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [AutomobilesComponent],
  imports: [
    CommonModule,
    AutomobilesRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTableModule,
 
  ]
})
export class AutomobilesModule {
  constructor(){
    
  }
  
 }