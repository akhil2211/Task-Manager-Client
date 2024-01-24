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
  addDynamicComponent(modalTitle: string, modalText?:any,modelContent?:any):Promise<any> {
    return new Promise((resolve, reject) => {
      const factory = this.factoryResolver.resolveComponentFactory(ModalComponent);
      const component = factory.create(this.rootViewContainer.parentInjector);
      component.instance.modalTitle = modalTitle;
      component.instance.modelContent = modelContent;
      if(modalText){
      component.instance.modalText = modalText;}

      const subscription = component.instance.closeModal.subscribe((value) => {
        this.removeDynamicComponent(component);
        resolve(value);
      });
  
      this.rootViewContainer.insert(component.hostView);
  
      component.onDestroy(() => {
        subscription.unsubscribe();
        this.removeDynamicComponent(component);
      });
    });

  }

  
  removeDynamicComponent(component:any) {
      component.destroy();
  }
}



