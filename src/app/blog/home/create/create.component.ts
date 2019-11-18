import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { BlogService } from '../../blog.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createBlog: FormGroup;
  title: FormControl;
  blogBody: FormControl;
  description: FormControl;
  category: FormControl;
  categories: string[] = ['Action', 'Drama', 'Comedy', 'Technology'];

  constructor(private blogService: BlogService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
  }

  createFormControl = () => {
    this.title = new FormControl('', [Validators.required]);
    this.blogBody = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.category = new FormControl('', [Validators.required]);
  }

  createForm = () => {
    this.createBlog = new FormGroup({
      title: this.title,
      blogBody: this.blogBody,
      description: this.description,
      category: this.category
    })
  }

  onSubmit = () => {
    if (this.createBlog.valid) {
      // console.log(this.createBlog);
      this.blogService.createABlog(this.createBlog.value).subscribe((next) => {
        // console.log(next);
        this.toastr.success(`Success, ${next.message}`);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 800);
      }, (error) => {
        // console.log(error);
        this.toastr.error(`Error, ${error.message}`);
      })
    }
  }

  onReset = () => {
    this.createBlog.reset();
  }

}
