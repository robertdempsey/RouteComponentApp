import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  @Input() inputData: string;
  @Input() componentDescription: string;

  @Output() dataUpdated = new EventEmitter<string>();
}
