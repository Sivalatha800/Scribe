import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = {};
  posts: any[] = [];

  constructor(public activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe((routeParms) => {
      this.getProfile(routeParms?.['id']);
      this.getUsersPosts(routeParms?.['id']);
    });
    // let id = this.activateRoute.snapshot.paramMap.get('id');
    // this.getProfile(id);
    // this.getUsersPosts(id);
  }
  ngOnInit(): void {}

  getProfile(id: any) {
    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        this.user = documentSnapshot.data();
        this.user.displayName = this.user.firstName + ' ' + this.user.lastName;
        this.user.id = documentSnapshot.id;
        this.user.hobbies = this.user.hobbies.split(',');
        console.log(this.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUsersPosts(id: any) {
    firebase
      .firestore()
      .collection('posts')
      .where('owner', '==', id)
      .get()
      .then((data) => {
        this.posts = data.docs;
      });
  }
}
