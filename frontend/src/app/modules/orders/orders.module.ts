import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OrdersComponent } from './orders.component';

@NgModule({
  declarations: [OrdersComponent],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild([{ path: '', component: OrdersComponent }])]
})
export class OrdersModule { }
