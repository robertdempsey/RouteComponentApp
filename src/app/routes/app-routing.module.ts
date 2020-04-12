import { NgModule, Type, Component } from '@angular/core';
import { Routes, RouterModule, Route, Data } from '@angular/router';
import { RouteComponent } from '../route-component/route/route.component';
import { DisplayComponent } from '../display-component/display/display.component';
import { ComponentInjectorComponent, InjectionComponent } from '../component-injector/component-injector.component';

export interface RouteInterface extends Route {
  data: {
    component: InjectionComponent<any>
  };
}

const routes: RouteInterface[] = [
  {
    path: 'RouteComponentExample',
    component: RouteComponent,
    data: {
      component: {
        type: DisplayComponent,
        inputs: {
          test: 'This uses static data from our inputs in route data'
        },
        outputs: {
          dataUpdated: (newData) => console.log(newData)
        }
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
