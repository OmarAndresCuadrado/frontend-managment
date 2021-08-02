import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { OwnerService } from '../../services/owner.service';
import { BusinessService } from '../../services/business.service';
import { BillService } from '../../services/bill.service';
import { ProductService } from '../../services/product.service';
import { ownerEntity } from '../../interfaces/ownerEntity';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  public owner: ownerEntity = new ownerEntity();

  constructor(
    private ownerService: OwnerService
  ) { }

  public listOfOwners: ownerEntity[] = [];


  ngOnInit(): void {
    this.getAllOwners();

  }

  getAllOwners(): void {
    this.ownerService.listOfOwners().subscribe((resp) => {
      console.log("lista de dueños", resp);
      this.listOfOwners = resp;
    }, (err) => {
      console.log("error al cosumer el servicio de dueños", err);
    })
  }

  updateOwner(): void {
    this.owner.bussiness = null;
  }

}
