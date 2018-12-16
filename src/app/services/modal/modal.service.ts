import { Injectable } from '@angular/core';
import { DomService } from './../dom/dom.service';

/** Serviço que controla os modais da aplicação. */
@Injectable()
export class ModalService {

  /** ID do elemento da DOM que conterá o modal. */
  private modalElementId: string = 'modal-container';
  /** ID do elemento da DOM que conterá o overlay. */
  private overlayElementId: string = 'overlay';

  constructor(
    private domService: DomService
  ) { }

  /**
   * Inicializa e mostra o modal desejado.
   * @param component Componente que será apresentado.
   * @param inputs Quaisquer inputs para o Component.
   * @param outputs Quaisquer outputs para o Component.
   */
  init(component: any, inputs: object, outputs: object) {
    const self = this;

    let componentConfig = {
      inputs:inputs,
      outputs:outputs
    }
    self.domService.appendComponentTo(self.modalElementId, component, componentConfig);
    document.getElementById(self.modalElementId).className = 'show';
    document.getElementById(self.overlayElementId).className = 'show';
  }

  /** Destrói (esconde) o modal. */
  destroy() {
    const self = this;

    self.domService.removeComponent();
    document.getElementById(self.modalElementId).className = 'hidden';
    document.getElementById(self.overlayElementId).className = 'hidden';
  }
}