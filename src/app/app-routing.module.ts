import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostsComponent } from './component/posts/posts.component';

const routes: Routes = [
  {path: '', component: AppComponent, children: [
    {path: '', component: PostsComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
