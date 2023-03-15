import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionService {

  constructor() { }

  //Hàm convert thời gian trả về hh/mm hôm nay hoặc hh/mm của ngày khác
  convertDateTime(timeStamp:string):string{
    let date = new Date(parseInt(timeStamp));
    let hour = date.getHours()>=10?date.getHours():"0"+date.getHours();
    let minute = date.getMinutes()>=10?date.getMinutes():"0"+date.getMinutes();
    if(date.getDate()==new Date().getDate()){
      return `${hour}:${minute} Today`
    }else{
      //check xem ngày và tháng có bé hơn 10 k nếu có thì thêm 0 vào
      let day= date.getDate()>=10?date.getDate():"0"+date.getDate();
      let month= date.getMonth()+1>=10?(date.getMonth()+1):"0"+(date.getMonth()+1);
      let year = date.getFullYear();

      return `${hour}:${minute} ${day}/${month}/${year}`
    }

  }
  getDate(timeStamp:string):string{
    let date = new Date(parseInt(timeStamp));
    //missing 1 month
    let day= date.getDate()>=10?date.getDate():"0"+date.getDate();
    let month= date.getMonth()+1>=10?(date.getMonth()+1):"0"+(date.getMonth()+1);
    let year = date.getFullYear();
    return `${day}/${month}/${year}`
  }
}
