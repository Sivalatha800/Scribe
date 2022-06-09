import { Component, OnInit } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css'],
})
export class MyblogsComponent implements OnInit {
  user: any = [];
  constructor() {
    this.user = firebase.auth().currentUser;
  }
  onPostCreated() {}

  ngOnInit(): void {}
}
