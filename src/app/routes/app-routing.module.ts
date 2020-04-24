import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DisplayComponent } from '../display-component/display/display.component';
import { RouteComponent, RouteData } from '../route-component/route/route.component';
import { DescriptionResolver } from './resolvers/description.resolver';
import { RouteServiceImplementation } from './route.service';

const displayRoute: RouteData<RouteServiceImplementation, DisplayComponent> = {
  path: 'RouteComponentExample/:route_id',
  component: RouteComponent,
  data: {
    component: {
      type: DisplayComponent,
      inputs: {
        inputData: `This is populated with static data from our 'inputs' property in route data`
      },
      outputs: {
        dataUpdated: function (this: RouteComponent<RouteServiceImplementation>, newData: string) {
          console.log(this)
          console.log(newData)
          console.log(this.routeService)
        }
      },
      dynamicInputs: {
        componentDescription: 'componentDescription'
      }
    }
  },
  resolve: {
    componentDescription: DescriptionResolver
  }
}

const routes: RouteData<RouteServiceImplementation, any>[] = [
  displayRoute
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
