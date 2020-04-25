import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { RouteService } from 'src/app/route-component/route/route.service';
import { RouteServiceImplementation } from '../route.implementation.service';

@Injectable({ providedIn: 'root' })
export class DescriptionResolver implements Resolve<void> {

    constructor(@Inject(RouteService) public routeService: RouteServiceImplementation) {

    }

    resolve(route: ActivatedRouteSnapshot) {
        this.routeService.componentDescription.next(`This data was fetched from a backend in DescriptionResolver using http and configured using 
        RouteDataInputs`);

        this.routeService.secondaryComponentDescription.next(`This is DisplayComponent is shown in another named Router Outlet, 
        note that it also gets updated data for how many times the button has been pressed`)

    }
}