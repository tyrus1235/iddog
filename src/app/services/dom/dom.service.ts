import { Injectable, Injector, ComponentFactoryResolver, EmbeddedViewRef, ApplicationRef } from '@angular/core';

/** Serviço de manipulação da DOM. */
@Injectable()
export class DomService {

  /** Component filho. */
  private childComponentRef:any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  /**
   * Conectar um componente a outro.
   * @param parentId ID do Component pai.
   * @param child O Component filho.
   * @param childConfig Configuração para o Component filho.
   */
  public appendComponentTo(parentId: string, child: any, childConfig?: childConfig) {
    const self = this;

    /** Criar uma referência do Component filho do Component atual. */
    const childComponentRef = self.componentFactoryResolver
      .resolveComponentFactory(child)
      .create(self.injector);

    // Conecte a configuração ao filho (inputs e outputs).
    self.attachConfig(childConfig, childComponentRef);

    self.childComponentRef = childComponentRef;
    // Conecte o componente ao appRef, garantindo que esteja dentro da árvore de componentes do Angular.
    self.appRef.attachView(childComponentRef.hostView);

    // Obter elemento DOM do componente.
    const childDomElem = (childComponentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    // Conectar o elemento DOM ao corpo da página.
    document.getElementById(parentId).appendChild(childDomElem);

  }

  /**
   * Remove um componente da view.
   */
  public removeComponent() {
    const self = this;
    self.appRef.detachView(self.childComponentRef.hostView);
    self.childComponentRef.destroy();
  }

  /**
   * Conecta uma configuração a um componente.
   * @param config Configuração que será acoplada.
   * @param componentRef Referência do componente.
   */
  private attachConfig(config, componentRef){
    let inputs = config.inputs;
    let outputs = config.outputs;
    for(var key in inputs){
      componentRef.instance[key] = inputs[key];
    }
    for(var key in outputs){
      componentRef.instance[key] = outputs[key];
    }
    
  }
}
interface childConfig{
  inputs:object,
  outputs:object
}