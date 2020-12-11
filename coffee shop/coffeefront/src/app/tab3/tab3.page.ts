import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  userStack;

  constructor() { }
  login = false;
  exist = true;
  // a=console.log(sessionStorage.length);

  async logIn() {

    const Username = document.querySelector('#UName');
    const Password = document.querySelector('#password');

    const message = {
      "username": (Username as HTMLInputElement).value,
      "password": (Password as HTMLInputElement).value
    };
    // console.log(message);

    const user = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // let result = user.clone()
    // console.log(JSON.stringify(user.clone().json()));
    
    // let result = user.json();
    // result.then(Response =>{
    //   console.log(Response);     
    // })

    user.json().then(data => {
      // console.log(typeof(data), data.length);
      if (data.length == 0) {
        this.exist = false;
        alert("You are not our user, please register first");
        (Username as HTMLInputElement).value = '';
        (Password as HTMLInputElement).value = '';
      } else {
        this.login = true;
        sessionStorage.clear();
        sessionStorage.setItem('id', data[0].id);
        sessionStorage.setItem('username', data[0].username);
        sessionStorage.setItem('password', data[0].passsword);
        sessionStorage.setItem('name', data[0].name);
        sessionStorage.setItem('role', data[0].role);
        console.log(data);
        
      }
    })
  }


  async register() {
    const RUName = document.querySelector('#UName');
    const RPassword = document.querySelector('#password');
    const RName = document.querySelector('#name');
    const RRole = document.querySelector('#role');

    const message = {
      "username": (RUName as HTMLInputElement).value,
      "password": (RPassword as HTMLInputElement).value,
      "name": (RName as HTMLInputElement).value,
      "role": (RRole as HTMLInputElement).value
    }

    const user = await fetch('http://localhost:8080/user/register', {
      method: "POST",
      body: JSON.stringify(message),
      headers: { 'Content-Type': 'application/json' }
    })
    user.json().then(data => {
      console.log(data);
      // this.userStack=data;

      if (data.length == 0) {
        alert("Your username or passsword is exist, please try different");

        (RUName as HTMLInputElement).value = '';
        (RPassword as HTMLInputElement).value = '';
        (RName as HTMLInputElement).value = '';
        (RRole as HTMLInputElement).value = '';

      } else {
        this.login = true;
        sessionStorage.clear();
        sessionStorage.setItem('id', data[0].id);
        sessionStorage.setItem('username', data[0].username);
        sessionStorage.setItem('password', data[0].passsword);
        sessionStorage.setItem('name', data[0].name);
        sessionStorage.setItem('role', data[0].role);
      }
    });



  }

  logOut() {
    sessionStorage.clear();
    this.login = false;
  }
}
