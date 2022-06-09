import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(public activatedRouter: ActivatedRoute) {
    let id = this.activatedRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {}
}
