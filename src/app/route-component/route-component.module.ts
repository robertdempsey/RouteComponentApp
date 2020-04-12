import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route/route.component';
import { RouterModule } from '@angular/router';
import { ComponentInjectorModule } from '../component-injector/component-injector.module';

@NgModule({
  declarations: [RouteComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentInjectorModule
  ]
})
export class RouteComponentModule { }
