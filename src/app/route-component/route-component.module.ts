import { NgModule, Type, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteComponent } from './route/route.component';
import { RouterModule } from '@angular/router';
import { ComponentInjectorModule } from '../component-injector/component-injector.module';
import { RouteService } from './route/route.service';

export interface RouteModuleConfig {
  routeServiceType: Type<any>;
}

@NgModule({
  declarations: [RouteComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentInjectorModule
  ]
})
export class RouteComponentModule {
  static forRoot(config: RouteModuleConfig): ModuleWithProviders {
    return {
      ngModule: RouteComponentModule,
      providers: [
        {
          provide: RouteService,
          useClass: config.routeServiceType
        }
      ],
    }
  }
 }
