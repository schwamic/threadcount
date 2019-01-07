import { AboutComponent } from './app.about.component';
import { ImprintComponent } from './app.imprint.component';
import { GalleryComponent } from './gallery/app.gallery.component';
import { AdminComponent } from './admin/app.admin.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',   redirectTo: '/index', pathMatch: 'full' },
  { path: 'index', component: GalleryComponent },
  { path: 'about', component: AboutComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'admin/:pw', component: AdminComponent }
];
