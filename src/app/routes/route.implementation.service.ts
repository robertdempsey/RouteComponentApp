import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RouteServiceImplementation {
    componentDescription = new BehaviorSubject<string>(null);
    buttonPressCount = new BehaviorSubject<number>(0)

    secondaryComponentDescription = new BehaviorSubject<string>(null);
}