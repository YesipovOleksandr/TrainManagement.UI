import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsTrainComponent } from './components/details-train.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';

const createRoutes: Routes = [
  { path: '', component: DetailsTrainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(createRoutes) 
  ],
  declarations: [DetailsTrainComponent],
  exports: [DetailsTrainComponent]
})
export class DetailsPageModule { }
