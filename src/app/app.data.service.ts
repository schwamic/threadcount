import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  data = {
    'pageXOffset' : 0,
    'pageYOffset' : 0,
    'threads' : 6,
    'columns' : [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X' ]
  };

  increaseThread() {
    this.data.threads >= 24 ? this.data.threads += 0 : this.data.threads += 6;
  }

}
