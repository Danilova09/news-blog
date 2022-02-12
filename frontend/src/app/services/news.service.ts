import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { News, NewsData } from '../models/news.model';
import { interval, map, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  news: News[] = [];
  newsChange = new Subject<News[]>();
  newsInterval = interval(2000);
  lastDatetime = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {
  }

  fetchNews() {
    this.newsInterval.subscribe(() => {
      this.http.get<News[]>(`http://localhost:5000/news`).pipe(
        map((news: News[]) => {
          console.log(news);
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

  getNewsById(id: string | null) {
    return this.http.get<News>(`http://localhost:5000/news/${id}`);
  }

  postNews(NewsData: NewsData) {
    const formData = new FormData();
    Object.keys(NewsData).forEach(key => {
      if (NewsData[key] !== null) formData.append(key, NewsData[key]);
    });
    this.http.post(`http://localhost:5000/news`, formData).subscribe();
  }

  removeNews(newsId: number) {
    const id = newsId.toString();
    return this.http.delete(`http://localhost:5000/news/${id}`);
  }
}
