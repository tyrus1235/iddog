import { Component } from '@angular/core';
import { ModalService } from './services/modal/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Título da aplicação. */
  public title: string = 'IDdog';

  constructor(
    private modalService: ModalService
  ) {}

  public removeModal(): void {
    const self = this;

    self.modalService.destroy();

    window.history.replaceState({}, null, '/feed');
  }
}
