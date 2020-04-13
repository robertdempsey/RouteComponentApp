import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentInjectorComponent } from 'src/app/component-injector/component-injector.component';

@Component({
  selector: 'route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  component: ComponentInjectorComponent;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    for (let output in this.route.snapshot.data.component.outputs) {
      this.route.snapshot.data.component.outputs[output] = this.route.snapshot.data.component.outputs[output].bind(this)
    }

    this.component = this.route.snapshot.data.component;
  }

}
