import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalculatorComponent } from '../../components/dialogs/calculator/calculator.component';
import { ContactUsComponent } from '../../components/dialogs/contact-us/contact-us.component';
import { GetService } from '../../services/get.service';
import { StateService } from '../../services/state.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loginFormControl = new FormControl('admin', [Validators.required]);


  passwordFormControl= new FormControl('password', [Validators.required, ]);
  profileForm = new FormGroup({
    login: new FormControl('admin'),
    password: new FormControl('password'),
  });

  public menuList = [
    `auth`,`calculator`,`cia`,`about`
  ]
  constructor(public dialog: MatDialog,
              private getService:GetService,
              public SS:StateService,
              private router:Router) {

              }

  ngOnInit(): void {
    // if(localStorage.getItem('token') ) {
    //   this.SS.isAuth = true
    //   this.router.navigate(['/dashboard/users'])
    // }
  }
  openCalculatorDialog() {
    const dialogRef = this.dialog.open(CalculatorComponent, {
      height: '1000px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openContactusDialog() {
    const dialogRef = this.dialog.open(ContactUsComponent, {
      height: '400px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public onSubmit(){
    // console.warn(this.profileForm.value);
    this.getService.tryAuth(this.profileForm.value).subscribe(
      (res:any)=>{
      
        if(res){
          if (res['token']) {
            localStorage.setItem('token', res['token']); //token here is stored in a local storage
          }
          this.SS.currentUser = res;
          this.SS.isAuth = true
          this.router.navigate(['/dashboard'])
        } else {
          this.SS.isAuth = false
        }
        // if(res.login==='admin') {
        //   this.router.navigate(['/dashboard'])
        // }
      }
    )
    // if(this.profileForm.value[`login`]==='admin' && this.profileForm.value[`password`]==='password') {
    //   this.router.navigate(['/dashboard'])
    // }
  }
}
