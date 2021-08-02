import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { billEntity } from '../../interfaces/billEntity';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  constructor(private billService: BillService) { }
  public listOfBills: billEntity[] = [];

  ngOnInit(): void {
    this.getAllBills();
  }

  getAllBills(): void {
    this.billService.listOfBills().subscribe((resp) => {
      console.log("lista de facturas", resp);
      this.listOfBills = resp;
    }, (err) => {
      console.log("error en el consumo del servicio de facturas", err);
    })
  }

}
