import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent,HeaderComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

  ]
})
export class DashboardModule {
  constructor(){
   
  }
  
 }