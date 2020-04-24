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
        RouteDataInputs`)
    }
}