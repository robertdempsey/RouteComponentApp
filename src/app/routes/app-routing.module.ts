import { NgModule, Type, Component } from '@angular/core';
import { Routes, RouterModule, Route, Data } from '@angular/router';
import { RouteComponent } from '../route-component/route/route.component';
import { DisplayComponent } from '../display-component/display/display.component';

export type RouteDataInterface = {
  component: Type<any>
  inputs: any
}

export interface RouteInterface extends Route {
  data: RouteDataInterface;
}

const routes: RouteInterface[] = [
  {
    path: 'RouteComponentExample',
    component: RouteComponent,
    data: {
      component: DisplayComponent,
      inputs: {
        test: 'This uses static data from our inputs in route data'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
