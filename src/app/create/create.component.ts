import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';

import { Editor, Toolbar } from 'ngx-editor';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateComponent implements OnInit, OnDestroy {
  title: string = '';
  content: string = '';

  @Output('postCreated') postCreated = new EventEmitter();

  editor: any = Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor() {}

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createPost() {
    firebase
      .firestore()
      .collection('posts')
      .add({
        title: this.title,
        content: this.content,
        owner: firebase.auth().currentUser?.uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((data) => {
        console.log(data);
        this.postCreated.emit();
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
