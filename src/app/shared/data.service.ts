import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getDetails() {
    const promise = new Promise<string>((res, rej) => {
      setTimeout(() => {
        res('Data');
      }, 1500);
    });

    return promise;
  }
}
