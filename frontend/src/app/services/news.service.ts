import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News } from '../models/news.model';
import { interval, map, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: News[] = [];
  newsChange = new Subject<News[]>();
  newsInterval = interval(2000);
  lastDatetime = '';

  constructor(private http: HttpClient) { }

  fetchNews() {
    this.newsInterval.subscribe(() => {
      this.http.get<News[]>(`http://localhost:5000/news`).pipe(
        map((news: News[]) => {
          if (news.length > 0) {
            this.lastDatetime = news[0].datetime;
            return news.map(news => {
              return new News(
                news.id,
                news.title,
                news.description,
                news.datetime,
                news.image,
              );
            });
          }
          return this.news;
        })).subscribe({
        next: (news => this.newsChange.next(news)),
        error: (error => console.log(error)),
      });
    });
  }

}
