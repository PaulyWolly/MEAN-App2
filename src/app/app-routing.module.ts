import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { InitComponent } from './components/init/init.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostFrameComponent } from './components/posts/post-frame/post-frame.component';
import { PostListComponent } from './components/posts/post-list/post-list.component';


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
    path: 'post',
    component: PostFrameComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
