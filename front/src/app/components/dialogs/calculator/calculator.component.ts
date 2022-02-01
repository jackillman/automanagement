import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.calcForm.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // map(data => this.mapcmsService.searchName(terms.name, terms.cepDrop))
  ).subscribe( value => console.log(value))
  }
  public calcForm = new FormGroup({
    auction: new FormControl(''),
    buyPrice: new FormControl(''),
    bodyType: new FormControl(''), 
    state: new FormControl(''),
    auctionArea: new FormControl(''),
    additionalСommission: new FormControl(''),
    year: new FormControl(2020),
    fuel: new FormControl(''),
    engine: new FormControl(''),
    typeService: new FormControl(''),
    forwardingBrokerageServices: new FormControl(''),
    commission: new FormControl(''),
  });
}
