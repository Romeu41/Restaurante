import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ClientsComponent } from './clients.component';

@NgModule({
  declarations: [ClientsComponent],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild([{ path: '', component: ClientsComponent }])]
})
export class ClientsModule { }
