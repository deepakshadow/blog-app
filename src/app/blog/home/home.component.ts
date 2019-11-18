import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogService } from '../blog.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  allBlogs: any;
  private dataSubscription: Subscription;
  isLoaded: boolean = false;

  constructor(private blogService: BlogService) { }

  ngOnInit() {
    this.isLoaded = true;
    this.dataSubscription = this.blogService.getAllData().subscribe((next) => {
      // console.log(next);
      this.allBlogs = next.body['data'];
      this.isLoaded = false;
    }, (error) => {
      // console.log(error);
      this.isLoaded = false;
    })
  }

  ngOnDestroy() {
    // console.log(`data destryoed`);
    this.dataSubscription.unsubscribe();
  }

}
