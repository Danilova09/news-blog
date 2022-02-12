import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { News } from '../models/news.model';
import { Comment } from '../models/comment.model';
import { CommentsService } from '../services/comments.service';
import { NewsService } from '../services/news.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.sass']
})
export class NewsDetailsComponent implements OnInit {
  @ViewChild('form') form!: NgForm;
  newsItem!: News;
  newsComments: Comment[] = [];
  showComments = false;
  newsId!: number;

  constructor(
    private newsService: NewsService,
    private commentsService: CommentsService,
    private route: ActivatedRoute
  ) {
  }

   ngOnInit(): void{
    const id = this.route.snapshot.paramMap.get('newsItemId');
    this.newsService.getNewsById(id).pipe(
      map((news) => {
        return new News(news.id, news.title, news.datetime, news.description, news.image);
      })).subscribe({
      next: (news => {
        this.newsItem = news;
        this.newsId = news.id;
      }),
    });
  }

  getComments() {
    this.showComments =  !this.showComments;
    this.commentsService.getNewsComments(this.newsId).subscribe({
      next: (comments: Comment[]) => {
        console.log(comments)
        this.newsComments = comments;
      },
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const commentData = this.form.value;
      this.commentsService.postComment(commentData);
    }
  }
}
