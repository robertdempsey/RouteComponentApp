import { Component, ComponentFactoryResolver, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef, Type, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

type extractGeneric<Type> = Type extends EventEmitter<infer X> ? X : null

export interface InjectionComponent<ComponentType> {
    type: Type<ComponentType>;
    inputs?: { [P in keyof Partial<ComponentType>]: ComponentType[P] };
    outputs?: { [P in keyof Partial<ComponentType>]: (param: extractGeneric<ComponentType[P]>) => any }
    dynamicInputs?: { [P in keyof Partial<ComponentType>]: Subject<ComponentType[P]> };
}

@Component({
    selector: 'component-injector',
    template: ''
})
export class ComponentInjectorComponent implements OnChanges, OnDestroy {

    @Input() public component: InjectionComponent<any>;
    private destroyed = new Subject<void>();

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnChanges(changes: SimpleChanges) {

        this.viewContainerRef.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component.type);
        const ref = this.viewContainerRef.createComponent(factory);

        for (let input in this.component.inputs) {
            ref.instance[input] = this.component.inputs[input];
        }

        for (let output in this.component.outputs) {
            if (ref.instance[output]) {
                ref.instance[output].pipe(
                    takeUntil(this.destroyed)
                ).subscribe(data => {
                    this.component.outputs[output](data);
                })
            }
        }

        for (const asyncInput in this.component.dynamicInputs) {
            this.component.dynamicInputs[asyncInput].pipe(
                takeUntil(this.destroyed)
            )
                .subscribe(value => {
                    ref.instance[asyncInput] = value;
                    ref.changeDetectorRef.detectChanges();
                })
        }

        ref.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }
}