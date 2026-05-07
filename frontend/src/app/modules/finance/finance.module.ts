import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FinanceComponent } from './finance.component';

@NgModule({
  declarations: [FinanceComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: FinanceComponent }])]
})
export class FinanceModule { }
