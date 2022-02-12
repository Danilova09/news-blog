import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../models/news.model';
import { NewsService } from '../../../services/news.service';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass']
})
export class NewsItemComponent {
  @Input() newsItem!: News;
  removing = false;

  constructor(
    private newsService: NewsService,
  ) { }
  
  remove() {
    this.removing = true;
    this.newsService.removeNews(this.newsItem.id).subscribe(() => {
      this.removing = false;
    })
  }
}
