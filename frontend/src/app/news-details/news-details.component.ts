import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { News } from '../models/news.model';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.sass']
})
export class NewsDetailsComponent implements OnInit {
  newsItem!: News;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('newsItemId');
    this.newsService.getNewsById(id).pipe(
      map((news) => {
        return new News(news.id, news.title, news.datetime, news.description, news.image);
      })).subscribe({
      next: (news => this.newsItem = news),
    });
  }

  onSubmit() {

  }
}
