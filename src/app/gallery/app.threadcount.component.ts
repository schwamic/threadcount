import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './../app.api.service';
import { DataService } from './../app.data.service';

@Component({
  selector: 'app-threadcount',
  templateUrl: './app.threadcount.component.html',
  styleUrls: ['./app.threadcount.component.styl']
})
export class ThreadCountComponent implements OnInit {

  @Input() index;
  threadImages = [];
  activeModal = false;
  number = 1;

  constructor(private apiService: ApiService, private dataService: DataService) { }

  ngOnInit() {
    this.getImages(this.index);
  }

  getImages(column: any) {
    const images = [
      {'group': `${column}`, 'number': '1'},
      {'group': `${column}`, 'number': '2'},
      {'group': `${column}`, 'number': '3'},
      {'group': `${column}`, 'number': '4'},
      {'group': `${column}`, 'number': '5'},
      {'group': `${column}`, 'number': '6'},
      {'group': `${column}`, 'number': '7'},
      {'group': `${column}`, 'number': '8'}
    ];
    this.apiService.loadImages(images).subscribe(data => {
      this.threadImages = data.images;
    });
  }

  showModal(number: any) {
    this.dataService.data.pageXOffset = pageXOffset;
    this.dataService.data.pageYOffset = pageYOffset;
    this.number = number;
    this.activeModal = true;
    // window.scrollTo(0, 0);
  }

  setModal(value: any) {
    this.activeModal = value;
  }

  lastElement() {
    return this.index === 'X';
  }
}
