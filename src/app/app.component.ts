import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { NavigationComponent } from "./component/navigation/navigation.component";

@Component({
  imports: [NavigationComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  selector: 'app-root',
  standalone: true,
})
export class AppComponent {
  protected title = 'proyecto-iii-tarea-ii';
}
