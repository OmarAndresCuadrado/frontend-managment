import { Component, OnInit } from '@angular/core';
import { billEntity } from '../../../interfaces/billEntity';
import { BillService } from '../../../services/bill.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { productEntity } from '../../../interfaces/productEntity';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { itemsEntity } from '../../../interfaces/itemsEntity';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html',
  styleUrls: ['./bill-form.component.css']
})
export class BillFormComponent implements OnInit {

  billForm: billEntity = new billEntity();
  autocompleteControll = new FormControl();
  products: Observable<productEntity[]>;

  constructor(
    private billService: BillService,
    private productService: ProductService,
    private activatedRouted: ActivatedRoute,
    private clientService: ClientService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.products = this.autocompleteControll.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.name),
        flatMap(value => value ? this._filter(value) : [])
      );
    this.findClient();
  }

  saveBill(): void {
    console.log("objeto a enviar", this.billForm);
    this.billService.saveBill(this.billForm).subscribe((resp) => {
      Swal.fire({
        title: `La factura ha sido creado con exito`,
        text: "¿Deseas crear otra factura?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#17a2b8',
        confirmButtonText: 'Si, crear otra factura',
        cancelButtonText: 'No, volver al inicio',
      }).then((result) => {
        if (result.value) {
          location.reload();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.router.navigate(['/client']);
        }
      })

    }, (err) => {
      console.log("error al enviar el formulario de la factura", err);
    })
  }

  updateBill(): void {

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

  findClient() {
    this.activatedRouted.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.clientService.findClientById(id).subscribe((resp) => {
        this.billForm.client = resp;
      })
    })
  }





}
