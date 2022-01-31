import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

const ELEMENT_DATA: any[] = [
  {position: 1, photo:'auto-1.jfif',purchaseDate:'12.02.2020', auction: 'Copart', model: '2017 VOLKSWAGEN JETTA S', vin: '3VW2B7AJ1HM365294',price:3200,port:"TX",title:true,container:4,customer:'Ольвач Денис',status:'received'},
  {position: 2, photo:'auto-2.jpeg',purchaseDate:'16.02.2020', auction: 'IAAI', model: '2019 VOLKSWAGEN JETTA', vin: '3VWCB7BU6KM221888',price:4300,port:"CA",title:true,container:4,customer:'Бурлак Евгений',status:'received'},
  {position: 3, photo:'auto-2.jpeg',purchaseDate:'16.02.2020', auction: 'IAAI', model: '2019 VOLKSWAGEN JETTA', vin: '3VWCB7BU6KM221888',price:4300,port:"CA",title:true,container:4,customer:'Бурлак Евгений',status:'received'},

];
@Component({
  selector: 'app-automobiles',
  templateUrl: './automobiles.component.html',
  styleUrls: ['./automobiles.component.scss']
})
export class AutomobilesComponent implements OnInit {

  constructor(public SS:StateService) { }

  ngOnInit(): void {
  //  console.log(JSON.stringify(this.dataSource))
  }
  displayedColumns: string[] = ['position','photo','purchaseDate', 'auction', 'model', 'vin','price','port','title','container','customer','status','shared','edit'];
 // dataSource = ELEMENT_DATA;
  
 
  add(item:any) {
    console.log(item)
  }
}
