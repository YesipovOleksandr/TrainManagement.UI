import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { TrainComponentsListModel } from '../../models/TrainComponentsListModel';

@Component({
  selector: 'home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  invalidResponse: boolean;
  auth_token: string;
  TrainComponentsList: TrainComponentsListModel;
  searchText: string = '';
  pageSize = 2;
  currentPage = 1;
  totalPages: number;
  totalItems: number = 0;
  isFirstPage: boolean = false;
  isLastPage: boolean = false;

  constructor(
    private http: HttpClient,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.auth_token = this.authService.getToken();
    this.GetsTrainComponents();
  }

  get pageRange(): string {
    const start = (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
    this.isFirstPage = this.currentPage === 1;
    this.isLastPage = this.currentPage === this.totalPages;
    return `${start}-${end} of ${this.totalItems}`;
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
    }
    this.GetsTrainComponents();
    this.isFirstPage = this.currentPage === 1;
    this.isLastPage = this.currentPage === this.totalPages||this.totalPages===0;
  }

  GetsTrainComponents() {
    this.http.get<TrainComponentsListModel>(environment.apiUrl + "TrainComponents", {
      params: {
        page: this.currentPage,
        number: this.pageSize,
        search: this.searchText || ''
      },
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${this.auth_token}`
      })
    })
      .subscribe({
        next: (response: TrainComponentsListModel) => {
          this.TrainComponentsList = response;
          this.totalItems = response.allCount;
          this.calculateTotalPages();
          console.log(this.TrainComponentsList);
        },
        error: (err: HttpErrorResponse)=>{
          this.invalidResponse = true
          console.log(err);
        } 
      })
  }

  onSearchChange(searchValue: string) {
    this.searchText = searchValue;
    this.currentPage = 1;
    this.GetsTrainComponents();
  }

  reloadPage() {
    window.location.reload();
  }

}
