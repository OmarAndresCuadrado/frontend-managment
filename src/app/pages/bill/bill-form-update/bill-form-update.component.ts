import { Component, OnInit } from '@angular/core';
import { BillService } from '../../../services/bill.service';
import { ActivatedRoute } from '@angular/router';
import { billEntity } from '../../../interfaces/billEntity';
import { clientEntity } from '../../../interfaces/clientEntity';
import { ProductService } from '../../../services/product.service';
import { productEntity } from '../../../interfaces/productEntity';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { itemsEntity } from '../../../interfaces/itemsEntity';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, flatMap } from 'rxjs/operators';
import { element } from 'protractor';

@Component({
  selector: 'app-bill-form-update',
  templateUrl: './bill-form-update.component.html',
  styleUrls: ['./bill-form-update.component.css']
})
export class BillFormUpdateComponent implements OnInit {

  billForm: billEntity = new billEntity();
  autocompleteControll = new FormControl();
  products: Observable<productEntity[]>;

  constructor(private billService: BillService, private activeRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.getParametersFromURI();
    this.products = this.autocompleteControll.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  updateProductsFromBill(idClient: number, idBill: number) {
    this.billService.getClientByIdAndBill(idClient, idBill).subscribe((resp) => {
      console.log("respuesta del nuevo servicio", resp);
      this.billForm = resp;
      this.billForm.items.forEach((element) => {
       element.importe = 0;
        this.billForm.items.push(element);
      });
      console.log("nuevo objeto",this.billForm.items);

    }, (err) => {
      console.log("error al consumir el servicio de actualizar", err);
    })
  }

  getParametersFromURI() {
    this.activeRoute.paramMap.subscribe((params) => {
      let idClient = +params.get('idClient');
      let idBill = +params.get('idBill');
      if (idClient != null && idBill != null) {
        this.updateProductsFromBill(idClient, idBill)
      }
    })

  }

  private _filter(value: string): Observable<productEntity[]> {
    const filterValue = value.toLowerCase();
    return this.productService.filterProductByName(filterValue);
  }

  showName(product?: productEntity): string | undefined {
    return product ? product.name : undefined;
  }

  selectedProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as productEntity;
    if (this.itemExist(product.id)) {
      this.incrementAmount(product.id);
    } else {
      let newItem = new itemsEntity();
      newItem.product = product;
      this.billForm.items.push(newItem);
    }
    this.autocompleteControll.setValue('');
    event.option.focus();
    event.option.deselect();


  }

  updateAmount(id: number, event: any): void {
    let amount: number = event.target.value as number;
    if (amount == 0) {
      return this.deleteItemBill(id);
    }

    this.billForm.items = this.billForm.items.map((item: itemsEntity) => {
      if (id === item.product.id) {
        item.amount = amount;
      }
      return item;
    });
  }

  itemExist(id: number): boolean {
    let exist = false;
    this.billForm.items.forEach((item: itemsEntity) => {
      if (id === item.product.id) {
        exist = true;
      }
    });
    return exist;
  }

  incrementAmount(id: number): void {
    this.billForm.items = this.billForm.items.map((item: itemsEntity) => {
      if (id === item.product.id) {
        ++item.amount;
      }
      return item;
    });
  }

  deleteItemBill(id: number): void {
    this.billForm.items = this.billForm.items.filter((item: itemsEntity) => id !== item.product.id)
  }

 
}
