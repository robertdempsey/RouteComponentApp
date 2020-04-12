import { Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  test: string;
  dataUpdated = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
