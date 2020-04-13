import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InjectionComponent } from '../component-injector/component-injector.component';
import { DisplayComponent } from '../display-component/display/display.component';
import { RouteComponent } from '../route-component/route/route.component';
import { DescriptionResolver } from './resolvers/description.resolver';

export interface RouteDataComponent extends InjectionComponent<any> {
  routeDataInputs?: { [key: string]: any }
}

export interface RouteData extends Route {
  data: {
    component: RouteDataComponent
  };
}

const routes: RouteData[] = [
  {
    path: 'RouteComponentExample/:route_id',
    component: RouteComponent,
    data: {
      component: {
        type: DisplayComponent,
        inputs: {
          inputData: `This is populated with static data from our 'inputs' property in route data`
        },
        outputs: {
          dataUpdated: function (this: RouteComponent, newData: string) {
            console.log(this)
            console.log(newData)
          }
        },
        routeDataInputs: {
          componentDescription: 'componentDescription'
        }
      }
    },
    resolve: {
      componentDescription: DescriptionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
