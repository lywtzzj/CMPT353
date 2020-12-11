import { Component } from '@angular/core';
// import {Home} from 'src/app/tab3/tab3.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {



  constructor() {
    this.show = this.onInit();
    console.log(this.show + "1");
    this.isCustomer = this.customer();
    console.log(this.isCustomer + "2");
    // this.ionViewDidEnter(this.user);
  }
  show = false;
  #order = 1;
  isCustomer;
  // user = sessionStorage.getItem('id')
  user = {
    userId: sessionStorage.getItem('id')
    // role: sessionStorage.getItem('role')
  };

  onInit() {
    if (sessionStorage.length != 0) {
      return true;
    }
    return false;
  }
  customer() {

    let role = sessionStorage.getItem('role');
    console.log(role);

    if (role != "staff") {
      return true;
    } else {
      return false;
    }
  }


  orderList = [] as {
    id: number,
    userId: string,
    time: string,
    ready: string,
    cancelled: string,
    content: string
  }[]

  async ionViewDidEnter(user: any) {
    // console.log(user.role);
    let role = sessionStorage.getItem('role');

    if (role != "staff") {
      console.log(role);
      const response = await fetch('http://localhost:8080/order', {
        method: "GET",
        body: user,
        headers: { 'content-type': 'application/json' }
      });
      response.json().then(data => {
        this.orderList = data;
        console.log(this.orderList);
      })

      // let result = await response.json();

    } else {
      const response = await fetch('http://localhost:8080/order/getOrderStaff', {
        method: "PUT",
        // body: user,
        headers: { 'content-type': 'application/json' }
      });
      response.json().then(data => {
        this.orderList = data;
        console.log(this.orderList);
      })
    }

  }

  async sort() {
    const response = await fetch('http://localhost:8080/order/sort', { method: "PUT" });
    let result = await response.json();
    this.orderList = result;
    console.log(this.orderList);
  }

  async Sready(item: any) {
    const response = await fetch('http://localhost:8080/order/ready', {
      method: "PUT",
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',

      }
    });
  }
  isReady(item) {
    if (item.ready == "yes") {
      return true;
    }
    else { return false; }
  }

  isCancelled(item) {
    let index = this.orderList.indexOf(item);
    this.orderList.splice(index, 1);
  }

}
