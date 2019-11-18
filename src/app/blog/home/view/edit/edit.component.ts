import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { BlogService } from 'src/app/blog/blog.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit, OnDestroy {

  editBlog: FormGroup;
  title: FormControl;
  description: FormControl;
  bodyHtml: FormControl;
  category: FormControl;
  categories: string[] = ['Action', 'Drama', 'Comedy', 'Technology'];
  currentBlog: any = []
  currentBlogId: string = '';
  dataSubscription: Subscription;
  isLoaded: boolean = false;

  constructor(private _route: ActivatedRoute, private router: Router, private blogService: BlogService, private toastr: ToastrService) { }

  ngOnInit() {
    this.isLoaded = true;
    this.createFormControl();
    this.createForm();
    this.dataSubscription = this._route.params.subscribe((param: Params) => {
      this.blogService.getASingleBlog(param['id']).subscribe((next) => {
        this.currentBlogId = param['id'];
        this.currentBlog = next['data'];
        this.currentEditValue(this.currentBlog);
        this.isLoaded = false;
      });
    });

  }

  createFormControl = () => {
    this.title = new FormControl('', [Validators.required]);
    this.bodyHtml = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.category = new FormControl('', [Validators.required]);
  }

  createForm = () => {
    this.editBlog = new FormGroup({
      'title': this.title,
      'bodyHtml': this.bodyHtml,
      'description': this.description,
      'category': this.category
    });
  }

  currentEditValue = (currentBlog) => {
    this.editBlog.setValue({
      'title': currentBlog.title,
      'bodyHtml': currentBlog.bodyHtml,
      'description': currentBlog.description,
      'category': currentBlog.category
    })
  }

  onSubmit = () => {
    if (this.editBlog.valid) {
      // console.log(this.editBlog);
      this.blogService.editABlog(this.currentBlogId, this.editBlog.value).subscribe((next) => {
        // console.log(next);
        this.toastr.success(`Success, ${next.message}`);
        setTimeout(() => {
          this.router.navigate(['../'], {relativeTo: this._route});
        }, 1000);
      }, (error) => {
        // console.log(error);
        this.toastr.error(`Error, ${error.message}`);
      })
    }
  }

  onReset = () => {
    this.editBlog.reset();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
