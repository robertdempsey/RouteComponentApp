import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DescriptionResolver implements Resolve<string> {
    resolve(route: ActivatedRouteSnapshot): Observable<string> {
        return of(`This data was fetched from a backend in DescriptionResolver using http and configured using 
        RouteDataInputs`)
    }
}