import { Component, OnInit } from '@angular/core';
import { productEntity } from '../../interfaces/productEntity';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService) { }
  public listOfProducts: productEntity[] = []

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.listOfProducts().subscribe((resp) => {
      console.log("lista de productos", resp);
      this.listOfProducts = resp;
    }, (err) => {
      console.log("error al consumir el servicio de productos", err);
    })
  }

  deleteProduct(product: productEntity): void {
    Swal.fire({
      title: `¿Desea borrar el producto ${product.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#17a2b8',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct(product.id).subscribe((resp) => {
          this.listOfProducts = this.listOfProducts.filter(cli => cli !== product)
          Swal.fire(
            'Producto Eliminado!',
            `el producto ${product.name} ha sido eliminado con éxito.`,
            'success'
          )
        }, (err) => {
          console.log("error al eliminar el producto", err);
        })
      }
    })
  }

  updateProducts(){
    location.reload();
  }

}
