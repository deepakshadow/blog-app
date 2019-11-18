import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { HomeComponent } from './home/home.component';
import { ViewComponent } from './home/view/view.component';
import { EditComponent } from './home/view/edit/edit.component';
import { CreateComponent } from './home/create/create.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'home/create', component: CreateComponent },
  { path: 'home/:id', component: ViewComponent },
  { path: 'home/:id/edit', component: EditComponent },
  { path: 'not', component: PageNotFoundComponent },
  { path: '*', redirectTo: "/not" },
  { path: '**', redirectTo: "/not" }
]

@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent,
    EditComponent,
    CreateComponent,
    PageNotFoundComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 900
    }),
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class BlogModule { }
