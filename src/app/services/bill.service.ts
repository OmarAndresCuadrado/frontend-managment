import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { billEntity } from '../interfaces/billEntity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  public environment = environment;
  public endpoint_bill = environment.bill.host;
  public endpoint_bill_client = environment.bill.update;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  listOfBills(): Observable<billEntity[]> {
    return this.http.get<billEntity[]>(this.endpoint_bill)
  }

  saveBill(bill: billEntity): Observable<billEntity> {
    return this.http.post<billEntity>(this.endpoint_bill, bill, { headers: this.httpHeaders });
  }

  getClientByIdAndBill(idClient: number, idBill: number) {
    console.log("parametros de busqueda", idClient, idBill);
    console.log("URI", `${this.endpoint_bill_client}/${idClient}/${idBill}`);
    return this.http.get<billEntity>(`${this.endpoint_bill_client}/${idClient}/${idBill}`)
  }

  deleteBill(idBill: number): Observable<billEntity> {
    console.log("url:",`${this.endpoint_bill}/${idBill}`);
    return this.http.delete<billEntity>(`${this.endpoint_bill}/${idBill}`)
  }

}
