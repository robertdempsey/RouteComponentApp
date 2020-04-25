import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DisplayComponent } from '../display-component/display/display.component';
import { RouteComponent, RouteData } from '../route-component/route/route.component';
import { DescriptionResolver } from './resolvers/description.resolver';
import { RouteServiceImplementation } from './route.implementation.service';

const secondaryDisplayRoute: RouteData<RouteServiceImplementation, DisplayComponent> = {
  path: 'RouteComponentExample/:route_id',
  component: RouteComponent,
  data: {
    component: {
      componentType: DisplayComponent,
      inputs: {
        inputData: `This DisplayComponent is shown in another named Router Outlet`
      },
      outputs: {
        dataUpdated: function (this: RouteComponent<RouteServiceImplementation, DisplayComponent>, newData: string) {
          console.log(this)
          console.log(newData)
          console.log(this.routeService)
        }
      },
      dynamicInputs: {
        componentDescription: 'secondaryComponentDescription',
        dynamicInputUpdateCount: 'buttonPressCount'
      }
    }
  },
  resolve: {
    componentDescription: DescriptionResolver
  },
  outlet: 'two'
}

const displayRoute: RouteData<RouteServiceImplementation, DisplayComponent> = {
  path: 'RouteComponentExample/:route_id',
  component: RouteComponent,
  data: {
    component: {
      componentType: DisplayComponent,
      inputs: {
        inputData: `This is populated with static data from our 'inputs' property in route data`
      },
      outputs: {
        dataUpdated: function (this: RouteComponent<RouteServiceImplementation, DisplayComponent>, newData: string) {
          console.log(this)
          console.log(newData)
          console.log(this.routeService)
        }
      },
      dynamicInputs: {
        componentDescription: 'componentDescription',
        dynamicInputUpdateCount: 'buttonPressCount'
      }
    }
  },
  resolve: {
    componentDescription: DescriptionResolver
  }
}

const routes: RouteData<RouteServiceImplementation, any>[] = [
  displayRoute,
  secondaryDisplayRoute
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
