import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentInjectorComponent } from './component-injector.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ComponentInjectorComponent],
  exports: [ComponentInjectorComponent]
})
export class ComponentInjectorModule { }