import { ActivatedRoute } from '@angular/router';
import { FollowersService } from './../services/followers.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any[];

  constructor(
    private route: ActivatedRoute,
    private followersService: FollowersService
  ) {}

  ngOnInit() {
    Observable.combineLatest([
      this.route.paramMap,
      this.route.queryParamMap
    ]).subscribe(combined => {
      const id = combined[0].get('id');
      const page = combined[1].get('page');
    });

    this.followersService
      .getAll()
      .subscribe(followers => (this.followers = followers));
  }
}
