import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentInjectorComponent, InjectionComponent } from '../../component-injector/component-injector.component';
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
export class RouteComponent<RouteServiceType, ComponentType> implements OnInit, OnDestroy {

  component: InjectionComponent<RouteServiceType, ComponentType>;
  private destroyed$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    @Inject(RouteService) public routeService: RouteServiceType
  ) { }

  ngOnInit(): void {
    this.route.data.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((data: RouteData<RouteServiceType, ComponentType>['data']) => {
      for (let output in data.component.outputs) {
        data.component.outputs[output] = data.component.outputs[output].bind(this)
      }

      this.component = data.component;
    })

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
