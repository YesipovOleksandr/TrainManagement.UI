import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm} from '@angular/forms';
import { TrainComponentService } from '../../shared/services/train-component.service';
import { TrainComponentsModel } from 'src/app/shared/models/TrainComponentsModel';
import { Router } from '@angular/router'; 


@Component({
  selector: 'create-component',
  templateUrl: './create-train.component.html',
  styleUrls: ['./create-train.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CreateTrainComponent{
  invalidCreate: string = '';
  newTrainComponent: TrainComponentsModel = {
    id: 0,
    name: '',
    uniqueNumber: '',
    canAssignQuantity: false, 
    quantity: null 
  };

  constructor(private router: Router,private trainComponentService: TrainComponentService) {}

  createTrainComponent(form: NgForm): void {
    if (form.valid) {
      const formData = form.value;

      if (!this.newTrainComponent.canAssignQuantity) {
        this.newTrainComponent.quantity = null; 
      }
  
      this.trainComponentService.createTrainComponent(formData).subscribe({
        next: (response) => {
          console.log('Train component created successfully:', response);
           this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error creating train component:', err);
          if (err.status === 400 && err.error?.message) {
            this.invalidCreate = err.error.message;  
          } else {
            this.invalidCreate = 'An error occurred while creating the train component.';
          }
        }
      });
    }
  }
}
