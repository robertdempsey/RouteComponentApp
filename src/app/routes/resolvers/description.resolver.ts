import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, BehaviorSubject, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DescriptionResolver implements Resolve<string> {
    resolve(route: ActivatedRouteSnapshot): Observable<string> {
        return of(`This data was fetched from a backend using http and configured using 
        RouteDataInputs`)
    }
}