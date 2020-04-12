import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  @Input() test: string;
  dataUpdated = new EventEmitter<string>();
}
