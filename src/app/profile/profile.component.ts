import { HttpModule } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId: number;
  userName: string;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.userId = +params.get('id');
      this.userName = params.get('username');
    });
  }
}
