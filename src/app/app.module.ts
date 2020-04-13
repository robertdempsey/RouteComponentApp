import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './routes/app-routing.module';
import { RouteComponentModule } from './route-component/route-component.module';
import { RouterModule } from '@angular/router';
import { DisplayComponentModule } from './display-component/display-component.module';
import { DescriptionResolver } from './routes/resolvers/description.resolver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouteComponentModule,
    AppRoutingModule,
    RouterModule,
    DisplayComponentModule
  ],
  providers: [DescriptionResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
