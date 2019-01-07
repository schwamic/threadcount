import { Component, Input, Output, OnInit, AfterViewInit, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from './../app.data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-modal',
  templateUrl: './app.modal.component.html',
  styleUrls: ['./app.modal.component.styl'],
  animations: [
    trigger('easeOut', [
      state('inactive', style({
        opacity: '0'
      })),
      state('active',   style({
        opacity: '1'
      })),
      transition('active => inactive', animate('300ms ease-out')),
    ])
  ]
})

export class ModalComponent implements OnInit, AfterViewInit {

  @Output() activeModal = new EventEmitter<any>();
  @Input() number;
  @Input() threadImages;
  @ViewChild('modal') modal;
  image;
  state: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.number -= 1;
    this.image = this.threadImages[this.number];
    this.state = 'active';
  }

  ngAfterViewInit() {
    // Set styling
    this.modal.nativeElement.style.top = `${this.dataService.data.pageYOffset}px`;
    this.modal.nativeElement.style.left = `${this.dataService.data.pageXOffset}px`;
    const body = document.getElementsByTagName('body');
    body[0].className = 'activeModal';
  }

  nextImage() {
    this.number === 7 ? this.number = 0 : this.number += 1;
    if (this.threadImages[(this.number)].count === 0) {
      this.nextImage();
    }
    this.image = this.threadImages[(this.number)];
  }

  lastImage() {
    this.number === 0 ? this.number = 7 : this.number -= 1;
    if (this.threadImages[(this.number)].count === 0) {
      this.lastImage();
    }
    this.image = this.threadImages[(this.number)];
  }

  closeModal() {
    const body = document.getElementsByTagName('body');
    body[0].className = '';
    this.easeOut();
    setTimeout(() => {
      this.activeModal.emit(false);
    }, 300);
    // window.scrollTo(this.dataService.data.pageXOffset, this.dataService.data.pageYOffset);
  }

  easeOut() {
    this.state = 'inactive';
  }
}
