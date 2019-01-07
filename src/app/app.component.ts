import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'Thread Count';
  constructor(private router: Router) { }
  routesIndex() { this.router.navigate(['./index']); }
  routesAbout() { this.router.navigate(['./about']); }

}
