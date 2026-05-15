import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
  declarations: [InventoryComponent],
  imports: [SharedModule, ReactiveFormsModule, RouterModule.forChild([{ path: '', component: InventoryComponent }])]
})
export class InventoryModule { }
