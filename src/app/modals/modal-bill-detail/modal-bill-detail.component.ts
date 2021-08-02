import { Component, OnInit, Input } from '@angular/core';
import { clientEntity } from '../../interfaces/clientEntity';
import { Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import Swal from 'sweetalert2';
import { billEntity } from '../../interfaces/billEntity';

@Component({
  selector: 'app-modal-bill-detail',
  templateUrl: './modal-bill-detail.component.html',
  styleUrls: ['./modal-bill-detail.component.css']
})
export class ModalBillDetailComponent implements OnInit {

  @Input() client: clientEntity;
  detalleId: number;
  constructor(private router: Router, private billService: BillService) { }
  public filterBill: any = '';

  ngOnInit(): void {
    console.log("cliente heredado al modal desde el detalle", this.client);
  }

  seeDetail(id: number): void {
    if (this.detalleId != null) {
      this.detalleId = null;
    } else {
      this.detalleId = id;
    }
  }

  deleteBill(bill: billEntity): void {
    console.log("entrada al metodo de elminiar", bill.id);
    Swal.fire({
      title: `¿Desea eliminar la factura ${bill.description}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#17a2b8',
      confirmButtonText: 'Si, eliminar factura',
      cancelButtonText: 'No, eliminar factura',
    }).then((result) => {
      if (result.value) {
        this.billService.deleteBill(bill.id).subscribe((resp) => {
          Swal.fire({
            title: `Transaccion exitosa`,
            text: `La factura ha sido elimanada con exito`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Aceptar',
          }).then((result) => {
            if (result.value) {
              location.reload();
              // (<any>$('#modalDetailBill')).modal('hide');
            }
          })
        }, (err) => {
          console.log("error al elminar la factura", err);
        })
      }
    })
  }
}
