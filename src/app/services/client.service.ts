import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clientEntity } from '../interfaces/clientEntity';
import { billEntity } from '../interfaces/billEntity';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  public environment = environment;
  public endpoint_client = environment.client.host;
  public prueba = 'http://localhost:8080/api/cliente/upload/documentouno';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) { }

  listOfClients(): Observable<clientEntity[]> {
    return this.http.get<clientEntity[]>(this.endpoint_client);
  }

  findClientById(id: number): Observable<clientEntity> {
    return this.http.get<clientEntity>(`${this.endpoint_client}/${id}`);
  }

  saveClient(client: clientEntity): Observable<clientEntity> {
    return this.http.post<clientEntity>(this.endpoint_client, client);
  }

  updateClient(client: clientEntity, id: number): Observable<clientEntity> {
    return this.http.put<clientEntity>(`${this.endpoint_client}/${id}`, client);
  }

  deleteClient(id: number): Observable<clientEntity> {
    return this.http.delete<clientEntity>(`${this.endpoint_client}/${id}`);
  }


   // tener presente para la firma del backend
 uploadDocumentUno(documento: File, documentoDos?: File ): Observable<any[]> {
  let formData = new FormData();
  // rquest
  // Realizar un sistema de logica para poder agregar 1, 2 , 3 en este
  // metodo dependiendo que archivo se halla elegido
  formData.append("files", documento);
  formData.append("files", documentoDos);
  return this.http.post<any[]>(`${this.prueba}`, formData);
}

 

}
