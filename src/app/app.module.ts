import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { HttpClientModule } from '@angular/common/http';
import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateComponent } from './create/create.component';
import { PostComponent } from './post/post.component';
import { ViewComponent } from './view/view.component';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const firebaseConfig = {
  apiKey: 'AIzaSyBW7uR-U88OHs0qyoC8UT7YHL0yArFfgo8',
  authDomain: 'internshalaangularproject.firebaseapp.com',
  projectId: 'internshalaangularproject',
  storageBucket: 'internshalaangularproject.appspot.com',
  messagingSenderId: '593704543288',
  appId: '1:593704543288:web:05b6c8ce170a2d117272cd',
  measurementId: 'G-PNGRCY8YD6',
};

const app = firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MyblogsComponent,
    ProfileComponent,
    CreateComponent,
    PostComponent,
    ViewComponent,
    CommentsComponent,
    EditProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
