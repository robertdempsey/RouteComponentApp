import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [DisplayComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DisplayComponentModule { }
