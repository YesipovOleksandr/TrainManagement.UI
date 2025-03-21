import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { DeleteModalComponent } from './components/delete-modal/delete-modal.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/AuthGuard';

const homeRoutes: Routes = [
    { path: '', component: HomeComponent ,canActivate:[AuthGuard]}
  ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(homeRoutes),
  ],
  declarations: [
    HomeComponent,
    DeleteModalComponent,
  ],
  exports: [
    HomeComponent,
  ]
})
export class MainPageModule { }


