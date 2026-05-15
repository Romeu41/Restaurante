import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { ClientService } from './services/client.service';
import { InventoryService } from './services/inventory.service';
import { OrderService } from './services/order.service';
import { AuthGuard } from './guards/auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, ClientService, InventoryService, OrderService, AuthGuard, TokenInterceptor]
})
export class CoreModule { }
