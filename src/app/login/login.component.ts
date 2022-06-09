import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  message: string = '';
  errmessage: string = '';
  constructor(
    public fb: FormBuilder,
    public authservice: AuthService,
    public router: Router
  ) {
    this.myForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(form: any) {
    this.authservice
      .login(form.value.email, form.value.password)
      .then((data) => {
        console.log(data);
        this.message = 'Login Successfully';
        this.router.navigate(['/myblogs']);
      })
      .catch((error) => {
        console.log(error);
        this.errmessage = 'Email does not exist  or wrong Password';
      });
  }
}
