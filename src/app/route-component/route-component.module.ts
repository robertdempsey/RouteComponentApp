import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route/route.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RouteComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class RouteComponentModule { }
