import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {
  public currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }
}
