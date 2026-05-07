import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InventoryComponent } from './inventory.component';

@NgModule({
  declarations: [InventoryComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: InventoryComponent }])]
})
export class InventoryModule { }
