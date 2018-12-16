import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FeedComponent } from './pages/feed/feed.component';
import { PhotoComponent } from './pages/photo/photo.component';

const routes: Routes = [
  {
    path: 'signup', component: SignUpComponent
  },
  {
    path: 'feed', component: FeedComponent
  },
  {
    path: 'photo', component: PhotoComponent
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
