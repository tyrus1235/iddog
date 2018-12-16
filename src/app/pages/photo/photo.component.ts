import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  public chosenPhoto: string = '';

  public category: string = '';

  public id: number = 0;

  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const self = this;

    self.chosenPhoto = localStorage.getItem('chosenPhoto');

    if (!self.chosenPhoto || self.chosenPhoto === 'undefined' || self.chosenPhoto === 'null') {
      localStorage.removeItem('token');
      self.router.navigateByUrl('signup');
    }

    self.sub = self.route.queryParams.subscribe(params => {
      self.id = parseInt(params['id']);
      self.category = params['category'];

      console.log('self.id = '+self.id);
      console.log('self.category = '+self.category);
   });
  }

  ngOnDestroy() {
    const self = this;

    self.sub.unsubscribe();
  }

}
