import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TrainComponentsListModel } from '../models/TrainComponentsListModel';
import { TrainComponentsModel } from '../models/TrainComponentsModel';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class TrainComponentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTrainComponents(currentPage: number, pageSize: number, searchText: string): Observable<TrainComponentsListModel> {
    const auth_token = this.authService.getToken(); 

    return this.http.get<TrainComponentsListModel>(`${environment.apiUrl}TrainComponents`, {
      params: {
        page: currentPage.toString(),
        number: pageSize.toString(),
        search: searchText || ''
      },
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${auth_token}`
      })
    });
  }

  deleteTrainComponent(id: number): Observable<void> {
    const auth_token = this.authService.getToken(); 
    return this.http.delete<void>(`${environment.apiUrl}TrainComponents/${id}`, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${auth_token}`
      })
    });
  }

  createTrainComponent(component: TrainComponentsModel): Observable<TrainComponentsModel> {
    const auth_token = this.authService.getToken(); 
    return this.http.post<TrainComponentsModel>(`${environment.apiUrl}TrainComponents`, component, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         'Authorization': `Bearer ${auth_token}`
      })
    });
  }
}
