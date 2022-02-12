import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../../models/news.model';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem!: News;
  constructor() { }

  ngOnInit(): void {
  }

}
