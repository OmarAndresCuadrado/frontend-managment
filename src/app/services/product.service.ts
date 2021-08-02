import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { productEntity } from '../interfaces/productEntity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  public environment = environment;
  public endpoint_product = environment.product.host;
  public endpoint_product_filter = environment.product.hostFilter;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  listOfProducts(): Observable<productEntity[]> {
    return this.http.get<productEntity[]>(this.endpoint_product)
  }

  filterProductByName(productName: string): Observable<productEntity[]> {
    return this.http.get<productEntity[]>(`${this.endpoint_product_filter}${productName}`);
  }


  findProductById(productId: number): Observable<productEntity> {
    return this.http.get<productEntity>(`${this.endpoint_product}/${productId}`)
  }

  saveProduct(product: productEntity): Observable<productEntity> {
    return this.http.post<productEntity>(`${this.endpoint_product}`, product);
  }

  updateProduct(product: productEntity, productId: number): Observable<productEntity> {
    console.log("objeto recibido dle form", product);
    return this.http.put<productEntity>(`${this.endpoint_product}/${productId}`, product);
  }

  deleteProduct(id:number): Observable<productEntity>{
    console.log("elemento a ser borrado", `${this.endpoint_product}/${id}`);
    return this.http.delete<productEntity>(`${this.endpoint_product}/${id}`)
  }
}
