import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTrainComponent } from './components/create-train.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';

const createRoutes: Routes = [
  { path: '', component: CreateTrainComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(createRoutes) 
  ],
  declarations: [CreateTrainComponent],
  exports: [CreateTrainComponent]
})
export class CreatePageModule { }
