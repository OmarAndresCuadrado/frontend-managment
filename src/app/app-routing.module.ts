import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OwnerComponent } from './pages/owner/owner.component';
import { BillComponent } from './pages/bill/bill.component';
import { BusinessComponent } from './pages/business/business.component';
import { ProductComponent } from './pages/product/product.component';
import { SellComponent } from './pages/sell/sell.component';
import { ClientComponent } from './pages/client/client.component';
import { BillFormComponent } from './pages/bill/bill-form/bill-form.component';
import { ClientFormComponent } from './pages/client/client-form/client-form.component';
import { BillFormUpdateComponent } from './pages/bill/bill-form-update/bill-form-update.component';
import { ProductFormComponent } from './pages/product/product-form/product-form.component';



const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'bill', component: BillComponent },
  { path: 'bill-form', component: BillFormComponent },
  { path: 'bill-form/:id', component: BillFormComponent },
  { path: 'bill-client/:idClient/:idBill', component: BillFormUpdateComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'owner', component: OwnerComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'product-form/:id', component: ProductFormComponent },
  { path: 'sell', component: SellComponent },
  { path: 'client', component: ClientComponent },
  { path: 'clientForm', component: ClientFormComponent },
  { path: 'clientForm/:id', component: ClientFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
