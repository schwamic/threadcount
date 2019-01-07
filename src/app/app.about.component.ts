import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: 'app.about.component.html',
  styleUrls: ['./app.about.component.styl']
})

export class AboutComponent {
  constructor(private router: Router) { }
  routesImprint() { this.router.navigate(['/imprint']); }
}
