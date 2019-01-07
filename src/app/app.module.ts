import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/app.gallery.component';
import { ThreadCountComponent } from './gallery/app.threadcount.component';
import { ModalComponent } from './gallery/app.modal.component';
import { AdminComponent } from './admin/app.admin.component';
import { AboutComponent } from './app.about.component';
import { ImprintComponent } from './app.imprint.component';

import { routes } from './app.routes';
import { ApiService } from './app.api.service';
import { DataService } from './app.data.service';

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    ThreadCountComponent,
    ModalComponent,
    AdminComponent,
    AboutComponent,
    ImprintComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    ApiService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
