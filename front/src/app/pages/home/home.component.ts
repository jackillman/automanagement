import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalculatorComponent } from 'src/app/components/calculator/calculator.component';
import { ContactUsComponent } from 'src/app/components/contact-us/contact-us.component';
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
              private router:Router) {
                
              }

  ngOnInit(): void {
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
    console.warn(this.profileForm.value);
    if(this.profileForm.value[`login`]==='admin' && this.profileForm.value[`password`]==='password') {
      this.router.navigate(['/dashboard'])
    }
  }
}
