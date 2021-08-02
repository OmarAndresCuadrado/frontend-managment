import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { businessEntity } from '../interfaces/businessEntity';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  public environment = environment;
  public endpoint_business = environment.business.host;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  listOfBusiness(): Observable<businessEntity[]> {
    return this.http.get<businessEntity[]>(this.endpoint_business)
  }

}
