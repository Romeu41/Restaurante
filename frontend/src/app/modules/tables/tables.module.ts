import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TablesComponent } from './tables.component';

@NgModule({
  declarations: [TablesComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: TablesComponent }])]
})
export class TablesModule { }
