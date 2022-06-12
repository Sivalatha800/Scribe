import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  loggedIn: boolean = false;
  user: any;
  id: any;
  constructor() {
    this.user = firebase.auth().currentUser;
    if (this.user) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user; //for our id in url
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
  }

  ngOnInit(): void {}
  logout() {
    firebase.auth().signOut();
  }
}
