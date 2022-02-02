import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutomobilesRoutingModule } from './automobiles-routing.module';
import { AutomobilesComponent } from './automobiles.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { CarDialogModule } from '../../components/dialogs/car-dialog/car-dialog.module';

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
    CarDialogModule
  ]
})
export class AutomobilesModule {
  constructor(){
    
  }
  
 }