import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { InjectionComponent } from '../../component-injector/component-injector.component';
import { RouteService } from './route.service';

export interface RouteData<RouteServiceType, ComponentType> extends Route {
  data: {
    component: InjectionComponent<RouteServiceType, ComponentType>
  };
}

@Component({
  selector: 'route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent<RouteServiceType, ComponentType> implements OnInit {

  component: InjectionComponent<RouteServiceType, ComponentType>;

  constructor(
    private route: ActivatedRoute,
    @Inject(RouteService) public routeService: RouteServiceType
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: RouteData<RouteServiceType, ComponentType>['data']) => {
      for (let output in data.component.outputs) {
        data.component.outputs[output] = data.component.outputs[output].bind(this)
      }

      this.component = data.component;
    })

  }
}
