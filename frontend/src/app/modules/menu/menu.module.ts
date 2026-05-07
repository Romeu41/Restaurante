import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [SharedModule, RouterModule.forChild([{ path: '', component: MenuComponent }])]
})
export class MenuModule { }
