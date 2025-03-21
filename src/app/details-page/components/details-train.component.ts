import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrainComponentService } from '../../shared/services/train-component.service';
import { TrainComponentsModel } from 'src/app/shared/models/TrainComponentsModel';


@Component({
  selector: 'details-component',
  templateUrl: './details-train.component.html',
  styleUrls: ['./details-train.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DetailsTrainComponent{
    trainComponent: TrainComponentsModel;
    originalQuantity: number | null;
    errorMessage: string = ''; 

  constructor(private route: ActivatedRoute,private trainComponentService: TrainComponentService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.trainComponentService.getTrainComponentById(id).subscribe({
      next: (data) => {
        this.trainComponent = data;
        this.originalQuantity = data.quantity;
      },
      error: (err) => {
        console.error('Error fetching train component', err);
      }
    });
  }

  saveChanges(): void {
    if (this.trainComponent.quantity !== this.originalQuantity) {
      if (this.trainComponent.quantity === null) {
        alert('Quantity cannot be null');
        return;
      }

      this.trainComponentService.updateQuantity(this.trainComponent.id, this.trainComponent.quantity)
      .subscribe({
        next: () => {
            this.errorMessage = '';
        },
        error: (err) => {
            if (err.error && err.error.message) {
              this.errorMessage = 'Error: ' + err.error.message;
              console.error('Error details:', err.error.details);
            } else {
              this.errorMessage = 'An unknown error occurred.';
            }
          }
      });
  }
      
  }

  isQuantityInvalid(): boolean {
    const quantity = this.trainComponent?.quantity;
    return quantity !== null && (quantity < 0 || !Number.isInteger(quantity));
  }
}
