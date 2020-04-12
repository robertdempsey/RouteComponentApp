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
    this.component = this.route.snapshot.data.component;
  }

}
