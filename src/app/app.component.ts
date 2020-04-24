import { Component, Inject } from '@angular/core';
import { RouteServiceImplementation } from './routes/route.implementation.service';
import { RouteService } from './route-component/route/route.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RouteComponentApp';

  constructor(@Inject(RouteService) public routeService: RouteServiceImplementation) {

  }

  increaseButtonCount() {
    this.routeService.buttonPressCount.pipe(
      first()
    ).subscribe(count => this.routeService.buttonPressCount.next(count + 1))
  }
}
