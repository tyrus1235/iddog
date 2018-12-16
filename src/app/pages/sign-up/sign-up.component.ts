import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

/** Componente que representa (e controla) a tela de login/signup da aplicação. */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  /** Essa é a URL de login da API. */
  private signupURL: string = 'https://api-iddog.idwall.co/signup';

  /** O serviço para requisições HTTP. */
  private http: XMLHttpRequest = new XMLHttpRequest();

  /** O email do usuário que estiver fazendo login. */
  public email: string = '';

  /** Flag que indica se a mensagem de erro de validação deve ser apresentada ao usuário. */
  public showError: boolean = false;

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    const self = this;

    /** JWT salvo, obtido pela API. */
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined' && token !== 'null') {
      self.router.navigateByUrl('feed');
    }
  }

  /**
   * Envia uma requisição POST para o endpoint de login/autenticação da API.
   * Se o login for realizado com sucesso, leva o usuário à próxima página.
   */
  public signUp(): void {
    const self = this;

    console.log('Email: ', self.email);
    
    if (self.validateEmail(self.email)) {
      self.http.open("POST", self.signupURL, true);

      self.http.setRequestHeader("Content-type", "application/json");

      self.http.onreadystatechange = () => {
        if (self.http.readyState == XMLHttpRequest.DONE) {
          const response = JSON.parse(self.http.response);
          console.log('Request Response: ', response);
          if (self.http.status == 200) {
            self.showError = false;
            if (response.user.token) {
              localStorage.setItem('token', response.user.token);
              self.router.navigateByUrl('feed');
            }
            else {
              console.error('No JWT Token received from the API!');
            }
          }
          else {
            self.showError = true;
          }
        }
      };

      self.http.send(JSON.stringify({
        email: self.email}
      ));
    }
    else {
      self.showError = true;
    }
  }

  /**
   * Validação de emails por regex (expressão regular).
   * @param email String com email do usuário.
   */
  public validateEmail(email): boolean {
    /** Expressão regular que aceita caracteres Unicode para validação de emails. */
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    return re.test(String(email).toLowerCase());
  }

}
