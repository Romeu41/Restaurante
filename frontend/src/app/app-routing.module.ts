import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'tables',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/tables/tables.module').then(m => m.TablesModule)
  },
  {
    path: 'orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'menu',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/menu/menu.module').then(m => m.MenuModule)
  },
  {
    path: 'finance',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/finance/finance.module').then(m => m.FinanceModule)
  },
  {
    path: 'kitchen',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/kitchen/kitchen.module').then(m => m.KitchenModule)
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
  },
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/settings/settings.module').then(m => m.SettingsModule)
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
