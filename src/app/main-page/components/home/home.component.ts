import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrainComponentService } from '../../../shared/services/train-component.service';
import { TrainComponentsListModel } from '../../../shared/models/TrainComponentsListModel';

@Component({
  selector: 'home-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomeComponent implements OnInit {
  invalidResponse: boolean;
  TrainComponentsList: TrainComponentsListModel;
  searchText: string = '';
  pageSize = 2;
  currentPage = 1;
  totalPages: number;
  totalItems: number = 0;
  isFirstPage: boolean = false;
  isLastPage: boolean = false;
  selectedItem: any = null;
  showModal = false;

  constructor(
    private trainComponentService: TrainComponentService) {
  }

  ngOnInit(): void {
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
    this.trainComponentService.getTrainComponents(this.currentPage, this.pageSize, this.searchText)
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

  openDeleteModal(item: any) {
    this.selectedItem = item;
    this.showModal = true;
  }

  confirmDelete(): void {
    if (this.selectedItem) {
      this.trainComponentService.deleteTrainComponent(this.selectedItem.id).subscribe({
        next: () => {
          this.TrainComponentsList.items = this.TrainComponentsList.items.filter(c => c.id !== this.selectedItem.id);
          this.totalItems--;
          this.calculateTotalPages();
          this.selectedItem = null;
          this.showModal = false; 
        },
        error: (err) => {
          console.log('Error deleting train component:', err);
          this.showModal = false; 
        }
      });
    }
  }

  cancelDelete() {
    this.showModal = false;
  }

}
