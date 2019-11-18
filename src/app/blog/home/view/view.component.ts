import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BlogService } from '../../blog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {

  private dataSubscription: Subscription
  currentBlog: any;
  currentBlogId: string;
  isLoaded: boolean = false;

  constructor(private blogService: BlogService, private _route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoaded = true;
    this.dataSubscription = this._route.params.subscribe((param: Params) => {
      this.blogService.getASingleBlog(param['id']).subscribe((next) => {
        // console.log(next);
        this.currentBlogId = param['id'];
        this.currentBlog = next['data'];
        this.isLoaded = false;
      }, (error) => {
        // console.log(error);
        this.toastr.error(`Error, ${error.message}`);
        this.isLoaded = false;
      })
    })

  }

  goToEdit = () => {
    this.router.navigate(['edit'], {relativeTo: this._route});
  }

  onDelete = () => {
    this.blogService.deleteABlog(this.currentBlogId).subscribe((next) => {
      // console.log(next);
      this.toastr.success(`Success, ${next.message}`);
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 1000);
    }, (error) => {
      // console.log(error);
      this.toastr.error(`Error, ${error.message}`);
    })
  }

  goBack = () => {
    this.router.navigate(['../'], { relativeTo: this._route });
  }

  ngOnDestroy() {
    // console.log(`single view destroyed`);
    this.dataSubscription.unsubscribe();
  }

}
