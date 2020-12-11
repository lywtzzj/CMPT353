import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component } from '@angular/core';
import { strict } from 'assert';
import { element } from 'protractor';
import { stringify } from 'querystring';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {
    this.isCustomer = this.Customer();

  }
  isCustomer;
  Customer() {
    if (sessionStorage.getItem('role') == "staff") {
      return false;
    } else {
      return true;
    }
  }
  menuList = [] as {
    id: number,
    name: string,
    unitPrice: number,
    quantity: number
  }[];
  async ionViewDidEnter() {
    const response = await fetch('http://localhost:8080/menu');
    var result = await response.json();
    result.forEach(element => {
      element.quantity = 0;
    });
    this.menuList = result;
    console.log(this.menuList);
  }
  addQuantity(menu) {
    menu.quantity++;
  }
  reduceQuantity(menu) {
    // if (menu.quantity > 0) {
    menu.quantity--;
    // }
  }
  order = {} as {
    id: number,
    userId: string,
    time: string,
    ready: string,
    cancelled: string,
    list: string
  }
  async submit() {
    this.order.list = '';
    this.menuList.forEach(element => {
      if (element.quantity != 0) {
        this.order.list += element.name + ":" + element.quantity + ','
      }
    });
    this.order.userId = sessionStorage.getItem('id');
    const response = await fetch('http://localhost:8080/order',
      {
        method: "POST",
        body: JSON.stringify(this.order),
        headers: { 'content-type': 'application/json' }
      });
    let result = response.json();
    console.log(result);

  }


  async priceReduce(item) {
    item.unitPrice--;
    const message = {
      id: item.id,
      name: item.name,
      unitPrice: item.unitPrice
    }
    const response = await fetch(`http://localhost:8080/menu?id=${item.id}`, {
      method: "PUT",
      body: JSON.stringify(message),
      headers: { 'content-type': 'application/json' }
    });
    if (response.ok) {
      alert("prince changed")
    }
  }

  async priceAdd(item) {
    item.unitPrice++;
    const message = {
      id: item.id,
      name: item.name,
      unitPrice: item.unitPrice
    }
    const response = await fetch(`http://localhost:8080/menu?id=${item.id}`, {
      method: "PUT",
      body: JSON.stringify(message),
      headers: { 'content-type': 'application/json' }
    });
    if (response.ok) {
      alert("prince changed")
    }
  }

  async addMenuItem() {
    const inputName = document.querySelector('#inputName');
    const inputPrice = document.querySelector('#inputPrice');
    const message = {
      name: (inputName as HTMLInputElement).value,
      unitPrice: (inputPrice as HTMLInputElement).value
    };
    const response = await fetch('http://localhost:8080/menu', {
      method: "POST",
      body: JSON.stringify(message),
      headers: { 'content-type': 'application/json' }
    });
    response.json().then(data => {
      console.log(data);

    })
    // setTimeout(this.ionViewDidEnter, 1000)
  }
}
