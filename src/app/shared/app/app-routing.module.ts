import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageModule } from '../../main-page/main-page.module';
import { LoginComponent } from 'src/app/login/login.component';
import { AuthGuard } from 'src/app/guards/AuthGuard';

const routes: Routes = [
  { path: '', component: MainPageModule, canActivate: [AuthGuard] },
  { path: 'create', loadChildren: () => import('../../create-page/create-page.module').then(m => m.CreatePageModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
