import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { clientEntity } from '../../../interfaces/clientEntity';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  public client: clientEntity = new clientEntity();
  constructor(private clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.findClient();
  }

  createClient(): void {
    this.clientService.saveClient(this.client).subscribe((resp) => {
      Swal.fire({
        title: `El cliente ${this.client.name} ${this.client.lastName} ha sido creado con exito`,
        text: "¿Deseas crear otro cliente?",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#17a2b8',
        confirmButtonText: 'Si, crear otro cliente',
        cancelButtonText: 'No, ver lista de clientes',
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
      console.log("error al crear el cliente", err);
    })
  }

  updateClient(): void {
    this.clientService.updateClient(this.client, this.client.id).subscribe((resp) => {
      Swal.fire({
        title: `El cliente ${this.client.name} ${this.client.lastName}`,
        text: `ha sido actualizado con exito`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/client']);
        }
      })
    }, (err) => {
      console.log("error al actualizar el cliente", err);
    })
  }

  findClient(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id');
      if (id) {
        this.clientService.findClientById(id).subscribe((resp) => {
          this.client = resp;
        })
      }
    })
  }
}
