import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { KitchenComponent } from './kitchen.component';

@NgModule({
  declarations: [KitchenComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: KitchenComponent }])]
})
export class KitchenModule { }
