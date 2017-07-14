import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {
  dataArray: string[] = [];
  imgUrl: string;

  insertUserData(data: string){
    this.dataArray.unshift(data);
  }

  insertImg(imgUr: string){
    this.imgUrl = imgUr;
  }
}
