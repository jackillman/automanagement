import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CreatorGuard } from 'src/app/guards/creator.guard';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent,HeaderComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

  ],
  providers:[CreatorGuard]
})
export class DashboardModule {
  constructor(){
   
  }
  
 }