import { Injectable } from '@angular/core';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string, firstName: string, lastName: string) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((response) => {
          let randomNumber = Math.floor(Math.random() * 1000);

          response.user
            ?.updateProfile({
              displayName: firstName + ' ' + lastName,
              photoURL: 'https://robohash.org/' + randomNumber,
            })
            .then(() => {
              resolve(response);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  constructor() {}
}
