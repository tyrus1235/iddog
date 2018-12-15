import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FeedComponent } from './feed/feed.component';
import { PhotoComponent } from './photo/photo.component';

const routes: Routes = [
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'feed', component: FeedComponent
  },
  {
    path: 'feed?:category&:id', component: PhotoComponent
  },
  { path: '',
    redirectTo: '/signup',
    pathMatch: 'full'
  },
  { path: '**', component: SignUpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
