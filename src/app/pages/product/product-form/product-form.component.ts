import { Component, OnInit, Input } from '@angular/core';
import { productEntity } from '../../../interfaces/productEntity';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  public product: productEntity = new productEntity();
  public value: any;

  ngOnInit(): void {
    this.findClientById();
  }

  createProduct(): void {
    this.value = this.value.replaceAll(",", "");
    this.value = Number(this.value);
    this.product.price = this.value;

    this.productService.saveProduct(this.product).subscribe((resp) => {
      Swal.fire({
        title: `El producto ${this.product.name} ha sido creado con exito`,
        text: "¿Deseas crear otro producto?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#17a2b8',
        confirmButtonText: 'Si, crear otro producto',
        cancelButtonText: 'No, ver lista de productos',
      }).then((result) => {
        if (result.value) {
          location.reload();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.router.navigate(['/product']);
        }
      })
    }, (err) => {
      console.log(
        "error al guardar el producto", err
      );
    })

  }

  updateProduct(): void {
    this.value = this.value.replaceAll(",", "");
    this.value = Number(this.value);
    this.product.price = this.value;
    this.productService.updateProduct(this.product, this.product.id).subscribe((resp) => {
      Swal.fire({
        title: `El producto ${this.product.name} ha sido actualizado con exito`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Continuar',
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/product']);
        } 
      })
    })
  }


  findClientById(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id');
      if (id) {
        this.productService.findProductById(id).subscribe((resp) => {
          this.product = resp;
          this.value = this.product.price;
          console.log("objeto que se actualizara", this.product, "valor del value", this.value);
        }, (err) => {
          console.log("error al buscar el cliente por id", err);
        });
      }
    })
  }
}
