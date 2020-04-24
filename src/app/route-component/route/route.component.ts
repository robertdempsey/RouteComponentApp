import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentInjectorComponent, InjectionComponent } from 'src/app/component-injector/component-injector.component';
import { RouteService } from './route.service';

export interface RouteDataComponent<RouteServiceType, ComponentType> extends InjectionComponent<RouteServiceType, ComponentType> {
}

export interface RouteData<RouteServiceType, ComponentType> extends Route {
  data: {
    component: RouteDataComponent<RouteServiceType, ComponentType>
  };
}

@Component({
  selector: 'route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent<RouteServiceType> implements OnInit {

  component: ComponentInjectorComponent<RouteServiceType>;
  private destroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    @Inject(RouteService) public routeService: RouteServiceType
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(data => {
      for (let output in data.component.outputs) {
        data.component.outputs[output] = data.component.outputs[output].bind(this)
      }

      for (let routeDataInput in data.component.routeDataInputs) {
        data.component.inputs[routeDataInput] = data[routeDataInput];
      }

      this.component = data.component;
    })

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
