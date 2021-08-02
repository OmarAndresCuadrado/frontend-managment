import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ownerEntity } from '../interfaces/ownerEntity';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {

  public environment = environment;
  public endpoint_owner = environment.owner.host;

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  listOfOwners(): Observable<ownerEntity[]> {
    return this.http.get<ownerEntity[]>(this.endpoint_owner);
  }
}
