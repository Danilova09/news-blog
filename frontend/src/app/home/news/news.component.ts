import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { News } from '../../models/news.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass']
})
export class NewsComponent implements OnInit, OnDestroy {
  news: News[] = [];
  newsSubscription!: Subscription;
  constructor(
    private  newsService: NewsService,
  ) { }

  ngOnInit(): void {
    this.newsService.fetchNews();
    this.newsSubscription = this.newsService.newsChange.subscribe((news: News[]) => {
      this.news = news;
    })
  }

  ngOnDestroy() {
    this.newsSubscription.unsubscribe();
  }

}
