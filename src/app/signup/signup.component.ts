import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/auth.service';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  message: string = '';
  errmessage: any;

  constructor(
    public fb: FormBuilder,
    public authservice: AuthService,
    public router: Router
  ) {
    this.myForm = this.fb.group(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        conform_password: new FormControl('', [Validators.required]),
      },
      {
        validator: this.checkIfMatchingPassword('password', 'conform_password'),
      }
    );
  }

  checkIfMatchingPassword(passwordKey: string, conform_passwordKey: string) {
    return (group1: FormGroup) => {
      let password = group1.controls[passwordKey];
      let conform_password = group1.controls[conform_passwordKey];

      if (password.value == conform_password.value) {
        return;
      } else {
        conform_password.setErrors({
          notEqualToPassword: true,
        });
      }
    };
  }

  onSubmit(myForm: any) {
    let email: string = myForm.value.email;
    let password: string = myForm.value.password;
    let firstName: string = myForm.value.firstName;
    let lastName: string = myForm.value.lastName;

    this.authservice
      .signup(email, password, firstName, lastName)
      .then((user: any) => {
        firebase
          .firestore()
          .collection('users')
          .doc(user?.uid)
          .set({
            firstName: myForm.value.firstName,
            lastName: myForm.value.lastName,
            email: myForm.value.email,
            photoURL: user.photoURL,
            interests: '',
            bio: '',
            hobbies: '',
          })
          .then(() => {
            this.message = 'You have been signed up successfully. Please login';
            this.errmessage = null;
            this.router.navigate(['/myblogs']);
          })
          .catch((error) => {
            console.log(error);
            this.errmessage = error;
          });
      });
  }
  ngOnInit(): void {}
}
