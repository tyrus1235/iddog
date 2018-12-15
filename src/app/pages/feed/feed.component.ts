import { Component, OnInit } from '@angular/core';

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

  /** Vetor com todas as URLs das imagens requisitadas. */
  public images: Array<string> = [];

  /** Essa é a URL de requisição de fotos da API. */
  private feedURL: string = 'https://api-iddog.idwall.co/feed';

  /** O serviço para requisições HTTP. */
  private http: XMLHttpRequest = new XMLHttpRequest();

  /** Token de autenticação da API (JWT). */
  private token: string = '';

  constructor() { }

  ngOnInit() {
    const self = this;

    self.token = localStorage.getItem('token');

    self.updatePhotos(self.categories[0]);
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
      }
    }

    self.updatePhotos(self.categories[index]);
  }

  private updatePhotos(category: string): void {
    const self = this;

    if (self.categories.indexOf(category) !== -1) {
      self.http.open('GET', self.feedURL+'?category='+category, true);

      self.http.setRequestHeader("Authorization", self.token);
      self.http.setRequestHeader("Content-type", "application/json");

      self.http.onreadystatechange = () => {
        if (self.http.readyState == XMLHttpRequest.DONE) {
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

}
