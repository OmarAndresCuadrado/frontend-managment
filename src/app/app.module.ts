import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OwnerComponent } from './pages/owner/owner.component';
import { BusinessComponent } from './pages/business/business.component';
import { ProductComponent } from './pages/product/product.component';
import { ClientComponent } from './pages/client/client.component';
import { BillComponent } from './pages/bill/bill.component';
import { SellComponent } from './pages/sell/sell.component';
import { HeaderComponent } from './general/header/header.component';
import { FooterComponent } from './general/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClientFilterPipe } from './pipes/client-filter.pipe';
import { BusinessFilterPipe } from './pipes/business-filter.pipe';
import { BillFilterPipe } from './pipes/billFilter.pipe';
import { OwnerFilterPipe } from './pipes/owner-filter.pipe';
import { ProductFilterPipe } from './pipes/product-filter.pipe';
import { SellFilterPipe } from './pipes/sell-filter.pipe';
import { ModalBillDetailComponent } from './modals/modal-bill-detail/modal-bill-detail.component';
import { BillFormComponent } from './pages/bill/bill-form/bill-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientFormComponent } from './pages/client/client-form/client-form.component';
import { BillFormUpdateComponent } from './pages/bill/bill-form-update/bill-form-update.component';
import { ProductFormComponent } from './pages/product/product-form/product-form.component';
import { NumberpipePipe } from './pipes/numberpipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent,
    BusinessComponent,
    ProductComponent,
    ClientComponent,
    BillComponent,
    SellComponent,
    HeaderComponent,
    FooterComponent,
    ClientFilterPipe,
    BusinessFilterPipe,
    BillFilterPipe,
    OwnerFilterPipe,
    ProductFilterPipe,
    SellFilterPipe,
    ModalBillDetailComponent,
    BillFormComponent,
    ClientFormComponent,
    BillFormUpdateComponent,
    ProductFormComponent,
    NumberpipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
