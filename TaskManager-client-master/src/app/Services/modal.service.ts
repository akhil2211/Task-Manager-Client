import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { ModalComponent } from '../Pages/dashboard/view-area/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private rootViewContainer!: ViewContainerRef;

  constructor(private factoryResolver: ComponentFactoryResolver) {
      this.factoryResolver = factoryResolver;
  }
  setRootViewContainerRef(viewContainerRef:ViewContainerRef) {
      this.rootViewContainer = viewContainerRef;
  }
  addDynamicComponent(modalTitle: string, modalText?:any) {
      const factory = this.factoryResolver.resolveComponentFactory(ModalComponent);
      const component = factory.create(this.rootViewContainer.parentInjector);
      component.instance.modalTitle = modalTitle;
      if(modalText){
      component.instance.modalText = modalText;}
      component.instance.closeModal.subscribe(() => this.removeDynamicComponent(component));

      this.rootViewContainer.insert(component.hostView);
  }

  removeDynamicComponent(component:any) {
      component.destroy();
  }
}
