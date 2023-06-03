import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { InitComponent } from './components/init/init.component';
import { PostCreateComponent } from './components/posts/post-create/post-create.component';
import { PostFrameComponent } from './components/posts/post-frame/post-frame.component';


const routes: Routes = [
  // {
  //   path: 'post-view',
  //   component: PostViewComponent
  // },
  // {
  //   path: 'post-create',
  //   component: PostCreateComponent
  // },
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
