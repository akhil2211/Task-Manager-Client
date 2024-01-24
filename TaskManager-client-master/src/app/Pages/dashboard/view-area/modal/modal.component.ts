import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../../../Tasks/task/create-task/create-task.component';
import { AddProjectComponent } from '../../../project/add-project/add-project.component';
import { AddMemberComponent } from '../../../project/project-details/add-member/add-member.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,CreateTaskComponent,AddProjectComponent,AddMemberComponent,DeleteConfirmationComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  modalTitle!: string;
  modalText: any|undefined;
  modelContent:any
  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  close(event:any) {
      this.closeModal.emit(false);
  }
  onConfirm(event:any){
    this.closeModal.emit(event);
    if(event)
    console.log("confirmed");
    
  }
}
