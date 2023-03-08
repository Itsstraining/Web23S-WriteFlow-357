import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionService {

  constructor() { }

  //Hàm convert thời gian trả về hh/mm hôm nay hoặc hh/mm của ngày khác
  convertDateTime(timeStamp:string):string{

    let date = new Date(parseInt(timeStamp));

    if(date.getDate()==new Date().getDate()){
      return `${date.getHours()}:${date.getMinutes()} Today`
    }else{
      //check xem ngày và tháng có bé hơn 10 k nếu có thì thêm 0 vào
      let day= date.getDate()<10?date.getDate():"0"+date.getDate();
      let month= date.getMonth()<10?date.getMonth():"0"+date.getMonth();
      let year = date.getFullYear();
      let hour = date.getHours();
      let minute = date.getMinutes();
      return `${hour}:${minute} ${day}/${month}:${year}`
    }

  }
}
