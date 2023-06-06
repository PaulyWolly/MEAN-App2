import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { InitComponent } from './components/init/init.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';

import { PostListComponent } from './components/posts/post-list/post-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';


const routes: Routes = [
  {
    path: 'list',
    component: PostListComponent
  },
  {
    path: 'create',
    component: PostCreateComponent
  },
  {
    path: 'init',
    component: InitComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'edit/:postId',
    component: PostCreateComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
