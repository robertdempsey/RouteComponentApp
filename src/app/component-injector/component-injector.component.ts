import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, Type, ViewContainerRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

export interface InjectionComponent<ComponentType> {
    component: Type<ComponentType>;
    inputs?: { [P in keyof Partial<ComponentType>]: any };
    outputs?: { [P in keyof Partial<ComponentType>]: (param: any) => any }
    asyncInputs?: { [P in keyof Partial<ComponentType>]: Subject<any> };
}

@Component({
    selector: 'component-injector',
    template: ''
})
export class ComponentInjectorComponent implements OnChanges, OnDestroy {

    @Input() public component: InjectionComponent<any>;
    @Output() public componentCreated = new EventEmitter<ComponentRef<any>>();
    subscriptions: Array<Subscription> = [];

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainerRef: ViewContainerRef
    ) { }

    ngOnChanges(changes: SimpleChanges) {

        this.viewContainerRef.clear();
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component.component);
        const ref = this.viewContainerRef.createComponent(factory);
        this.componentCreated.emit(ref);

        for (let input in this.component.inputs) {
            ref.instance[input] = this.component.inputs[input];
        }

        for (let output in this.component.outputs) {
            if (ref.instance[output]) {
                this.subscriptions.push(ref.instance[output].subscribe(data => {
                    this.component.outputs[output](data);
                })
                )
            }
        }

        for (const asyncInput in this.component.asyncInputs) {
            this.subscriptions.push(this.component.asyncInputs[asyncInput]
                .subscribe(value => {
                    ref.instance[asyncInput] = value;
                    ref.changeDetectorRef.detectChanges();
                }))
        }

        ref.changeDetectorRef.detectChanges();
    }

    ngOnDestroy(): void {
        for (const sub of this.subscriptions) {
            sub.unsubscribe();
        }
    }
}