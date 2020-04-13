import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { InjectionComponent } from '../component-injector/component-injector.component';
import { DisplayComponent } from '../display-component/display/display.component';
import { RouteComponent } from '../route-component/route/route.component';

export interface RouteData extends Route {
  data: {
    component: InjectionComponent<any>
  };
}

const routes: RouteData[] = [
  {
    path: 'RouteComponentExample',
    component: RouteComponent,
    data: {
      component: {
        type: DisplayComponent,
        inputs: {
          inputData: `This is populated with static data from our 'inputs' property in route data`
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
