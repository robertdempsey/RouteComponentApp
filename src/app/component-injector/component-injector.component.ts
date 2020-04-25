import { Component, ComponentFactoryResolver, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef, Type, EventEmitter, Inject } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RouteService } from '../route-component/route/route.service';

type extractGeneric<Type> = Type extends EventEmitter<infer X> ? X : null

export interface InjectionComponent<RouteServiceType, ComponentType> {
    type: Type<ComponentType>;
    inputs?: { [P in keyof Partial<ComponentType>]: ComponentType[P] };
    outputs?: { [P in keyof Partial<ComponentType>]: (param: extractGeneric<ComponentType[P]>) => any }
    dynamicInputs?: { [P in keyof Partial<ComponentType>]: keyof RouteServiceType }
}

@Component({
    selector: 'component-injector',
    template: ''
})
export class ComponentInjectorComponent<RouteServiceType, ComponentType> implements OnChanges, OnDestroy {

    @Input() public component: InjectionComponent<RouteServiceType, any>;
    private destroyed$ = new Subject<void>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef,
        @Inject(RouteService) private routeService: RouteServiceType

    ) { }

    ngOnChanges(changes: SimpleChanges) {

        this.viewContainerRef.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component.type);
        const ref = this.viewContainerRef.createComponent(factory);

        for (const input in this.component.inputs) {
            ref.instance[input] = this.component.inputs[input];
        }

        for (const output in this.component.outputs) {
            if (ref.instance[output]) {
                ref.instance[output].pipe(
                    takeUntil(this.destroyed$)
                ).subscribe(data => {
                    this.component.outputs[output](data);
                })
            }
        }

        for (const dynamicInput in this.component.dynamicInputs) {
            (this.routeService[this.component.dynamicInputs[dynamicInput]] as any).pipe(
                takeUntil(this.destroyed$)
            ).subscribe(data => {
                ref.instance[dynamicInput] = data;
                ref.changeDetectorRef.markForCheck();
            })
        }

        ref.changeDetectorRef.markForCheck();
    }

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}