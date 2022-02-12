import { Component, ViewChild } from '@angular/core';
import { NewsService } from '../services/news.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.sass']
})
export class FormComponent {
  @ViewChild('form') form!: NgForm;

  constructor(
    private newsService: NewsService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.form.valid) {
      const messageData = this.form.value;
      this.newsService.postNews(messageData);
      void this.router.navigate(['/']);
    }
  }
}
