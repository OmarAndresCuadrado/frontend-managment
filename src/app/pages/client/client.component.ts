import { Component, OnInit } from '@angular/core';
import { clientEntity } from '../../interfaces/clientEntity';
import { ClientService } from '../../services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public documentSelected: File;
  public documentSelectedDos: File;
  public clientLIst: clientEntity[] = []
  public detailWatch: boolean;
  public objetToHeredate: clientEntity;
  public client: clientEntity;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllClients();
  }


  getAllClients(): void {
    this.clientService.listOfClients()
      .subscribe((resp) => {
        this.clientLIst = resp;
        console.log("repsuesta de clientes", resp);
      }, (err) => {
        console.log("error consumiendo el servicio de clientes", err);
      })
  }

  updateClient(): void {
    this.client.bills = null;
  }

  objectHeredate(clientHeredate: clientEntity): void {
    console.log("objeto a que se heredado", clientHeredate);
    this.objetToHeredate = clientHeredate;
  }


  deleteClient(client: clientEntity): void {
    console.log("eliminar", client);
    Swal.fire({
      title: `¿Desea borrar el cliente ${client.name} ${client.lastName}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#17a2b8',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(client.id).subscribe((resp) => {
          this.clientLIst = this.clientLIst.filter(cli => cli !== client)
          Swal.fire(
            'Cliente Eliminado!',
            `el cliente ${client.name} eliminado con éxito.`,
            'success'
          )
        }, (err) => {
          console.log("error al eliminar el cliente", err);
        })
      }
    })

  }

  updateClients() {
    location.reload();
  }


  sentDocuments(): void {
    if (!this.documentSelected) {
      console.log("error no ha seleccionado ningun documento");
    } else {
      console.log("metodo de enviar ", "uno", this.documentSelected, "dos",this.documentSelectedDos  );
      this.clientService.uploadDocumentUno(this.documentSelected,this.documentSelectedDos)
        .subscribe(resp => {
          console.log("respuesta del back al enviar los documentos", resp);
        });
    }
  }


  selectDocument(event) {
    console.log("eventoooooooo");
    this.documentSelected = event.target.files[0];
    console.log("documento seleccionado uno",this.documentSelected);

    //validar cuando tambien sea imagenes
    if ((this.documentSelected.type.indexOf('pdf') < 0) && (this.documentSelected.type.indexOf('image') < 0)) {
      console.log("solo se aceptan pdf o image");
      this.documentSelected = null;
    }
  }

  selectDocumentDos(event) {
    console.log("eventoooooooo dos");
    this.documentSelectedDos = event.target.files[0];
    console.log("documento seleccionado uno",this.documentSelectedDos);

    //validar cuando tambien sea imagenes
    if ((this.documentSelectedDos.type.indexOf('pdf') < 0) && (this.documentSelectedDos.type.indexOf('image') < 0)) {
      console.log("solo se aceptan pdf o image");
      this.documentSelectedDos = null;
    }
  }
}
