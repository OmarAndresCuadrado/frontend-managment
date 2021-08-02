import { Component, OnInit } from '@angular/core';
import { businessEntity } from '../../interfaces/businessEntity';
import { BusinessService } from '../../services/business.service';


@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  public business: businessEntity = new businessEntity();

  constructor(private businessService: BusinessService) { }
  public listOfBusiness: businessEntity[] = [];

  ngOnInit(): void {
  }

  getaAllBusiness(): void {
    this.businessService.listOfBusiness().subscribe((resp) => {
      console.log("lsita de negocios", resp);
    }, (err) => {
      console.log("error al consumer el servicio de negocios", err);
    })
  }

  updateBusiness(): void {
    this.business.clients = null;
    this.business.products = null;
  }
}
