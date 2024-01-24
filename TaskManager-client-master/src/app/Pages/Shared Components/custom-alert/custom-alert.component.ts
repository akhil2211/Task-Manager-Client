import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent {
  @Input() responseMessage: any;

  closeAlert() {
 
  }
}


//   openCustomAlert(responseMessage: string) {
//     const dialogRef = this.dialog.open(CustomAlertComponent, {
//       width: '400px',
//       data: { responseMessage }
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//     });
//   }

 
//   this.projectService.postReturn(`${environment.apiUrl}/api/v1/project/task/create`,taskData,{headers}).subscribe((resp:any)=>{
//     this.taskCreateSuccess=true;
//     this.openCustomAlert(resp.response);
//     this.taskForm.reset();
//     console.log(resp.response);
//   });
// }
