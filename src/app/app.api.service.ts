import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  loadImages(images: any) {
    const imagesString = JSON.stringify(images);
    return this.http.get(`http://${environment.host}/api/getImages/${imagesString}`).map((res: Response) => res.json());
  }

  setCounts(images: any) {
    const body = JSON.stringify({'images': images});
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`http://${environment.host}/api/setCounter`, body, {headers: headers});
  }
}
