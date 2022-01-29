import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { APP_SERVICES_PROVIDERS } from './app.barel';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,

    ContactUsComponent,
 

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule

  ],
  providers: [...APP_SERVICES_PROVIDERS,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
