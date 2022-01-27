import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CalculatorComponent } from 'src/app/components/calculator/calculator.component';
import { ContactUsComponent } from 'src/app/components/contact-us/contact-us.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  passwordFormControl= new FormControl('', [Validators.required, ]);
  public menuList = [
    `auth`,`calculator`,`cia`,`about`
  ]
  constructor(public dialog: MatDialog) {}

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
  
}
