import { Component, OnInit } from '@angular/core';
import { DataService } from './../app.data.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './app.gallery.component.html',
  styleUrls: ['./app.gallery.component.styl']
})
export class GalleryComponent {
  loader = true;

  constructor(private dataService: DataService) {}

  createRange() {
    const items = [];
    for (let i = 0; i <= this.dataService.data.threads - 1; i++) {
      items.push(this.dataService.data.columns[i]);
    }
    return items;
  }

  loadMoreThreads() {
    this.dataService.increaseThread();
    if (this.dataService.data.threads >= 24) {
      this.loader = false;
    }
  }

  onScroll(event: any) {
    const scrollWidth = event.path[0].getElementsByClassName('gallery')[0]
      .scrollWidth;
    const innerWidth = event.path[1].innerWidth;
    const scrollX = event.path[1].scrollX;
    if (scrollWidth - innerWidth === scrollX) {
      this.loadMoreThreads();
    }
  }
}
