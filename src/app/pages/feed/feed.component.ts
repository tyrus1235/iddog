import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal/modal.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PhotoComponent } from '../photo/photo.component';

/** Componente que representa a página de feed de fotos. */
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  /** Vetor com flags que indicam qual categoria é a atualmente escolhida. */
  public chosenCategory: Array<boolean> = [
    true, false, false, false
  ];

  /** Vetor com os nomes das categorias diferentes. */
  public categories: Array<string> = [
    'husky', 'labrador', 'hound', 'pug'
  ];

  /** Nome da categoria atual. */
  private currCategory: string = 'husky';

  /** Vetor com todas as URLs das imagens requisitadas. */
  public images: Array<string> = [];

  /** Essa é a URL de requisição de fotos da API. */
  private feedURL: string = 'https://api-iddog.idwall.co/feed';

  /** O serviço para requisições HTTP. */
  private http: XMLHttpRequest = new XMLHttpRequest();

  /** Token de autenticação da API (JWT). */
  private token: string = '';

  /** Assinatura assíncrona para leitura dos parâmetros de query. */
  private sub: Subscription;

  constructor(
    private modalService: ModalService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const self = this;

    self.token = localStorage.getItem('token');

    self.sub = self.route.queryParams.subscribe(params => {
      self.currCategory = params && params['category'] ? params['category'] : 'husky';
      
      console.log('self.currCategory = '+self.currCategory);

      self.changeCategory(self.categories.indexOf(self.currCategory));
   });
  }

  /**
   * Troca a categoria selecionada.
   * @param index Índice da categoria selecionada.
   */
  public changeCategory(index: number): void {
    const self = this;
    console.log('index: ', index);
    
    /** Tamanho do vetor de categorias. */
    const categoriesLength = self.categories.length;

    for (let i = 0; i < categoriesLength; i++) {
      if (i !== index) {
        self.chosenCategory[i] = false;
      }
      else {
        self.chosenCategory[i] = true;
        self.currCategory = self.categories[i];
        window.history.replaceState({}, null, '/feed?category='+self.currCategory);
      }
    }

    self.updatePhotos(self.categories[index]);
  }

  /**
   * Atualiza a listagem de fotos com as URLs recebidas da API.
   * @param category Nome da categoria de fotos que serão obtidas.
   */
  private updatePhotos(category: string): void {
    const self = this;

    if (self.categories.indexOf(category) !== -1) {
      self.http.open('GET', self.feedURL+'?category='+category, true);

      self.http.setRequestHeader("Authorization", self.token);
      self.http.setRequestHeader("Content-type", "application/json");

      self.http.onreadystatechange = () => {
        if (self.http.readyState == XMLHttpRequest.DONE) {
          /** Resposta da requisição HTTP GET. */
          const response = JSON.parse(self.http.response);

          console.log('Request Response: ', response);
          if (self.http.status == 200) {
            self.images = response.list;
          }
        }
      };

      self.http.send();
    }
  }

  public choosePhoto(id: number, photoURL: string): void {
    const self = this;

    localStorage.setItem('chosenPhoto', photoURL);
    
    window.history.replaceState({}, null, '/photo?category='+self.currCategory+'&id='+id);

    self.modalService.init(PhotoComponent, null, null);
  }

}
