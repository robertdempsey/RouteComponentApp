import { Component, ComponentFactoryResolver, Input, OnChanges, OnDestroy, SimpleChanges, ViewContainerRef } from '@angular/core';
import { Subject, Subscription, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface InjectionComponent<ComponentType> {
    type: ComponentType;
    inputs?: { [P in keyof Partial<ComponentType>]: any };
    outputs?: { [P in keyof Partial<ComponentType>]: (param: any) => any }
    dynamicInputs?: { [P in keyof Partial<ComponentType>]: Subject<any> };
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