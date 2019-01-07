import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ApiService } from './../app.api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './app.admin.component.html',
  styleUrls: ['./app.admin.component.styl']
})
export class AdminComponent implements OnInit {
  pw = {};
  data = {};
  columns = [];
  success = false;
  error = false;
  waiting = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pw = params.pw;

      if (this.pw === 'y8h2vE') {
        // PW true
        this.loadAllImages();
      } else {
        // PW false
        this.router.navigate(['./index']);
      }
    });
  }

  loadAllImages() {
    const request = [{ group: 'all' }];
    this.apiService.loadImages(request).subscribe(data => {
      const mydata = {};
      data.images.forEach(element => {
        if (mydata[element.group] === undefined) {
          mydata[element.group] = [];
        }
        mydata[element.group][element.number - 1] = element;
      });
      this.columns = Object.keys(mydata);
      this.data = mydata;
    });
  }

  onSubmit(form: any): void {
    this.waiting = true;
    const newImages = [];
    Object.keys(form).forEach(function(index) {
      const group = index.toString().split('-')[0];
      const number = index.toString().split('-')[1];
      const count = form[index];
      const image = {
        group: group,
        number: number,
        count: count
      };
      newImages.push(image);
    });
    this.apiService.setCounts(newImages).subscribe(
      response => {
        this.sendStatus(true);
      },
      error => {
        this.sendStatus(false);
      }
    );
  }

  sendStatus(status: any) {
    this.waiting = false;
    if (status) {
      this.success = true;
      setTimeout(() => {
        this.success = false;
      }, 2000);
    } else {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 2000);
    }
  }
}
