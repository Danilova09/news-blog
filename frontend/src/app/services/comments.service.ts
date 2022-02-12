import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Comment, CommentData } from '../models/comment.model';


@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
  ) {
  }

  getNewsComments(newsId: number) {
     return  this.http.get<Comment[]>(`http://localhost:5000/comments?news_id=${newsId}`).pipe(
        map((comments: Comment[]) => {
          console.log(comments);
            return comments.map(comment => {
              return new Comment(
                comment.id,
                comment.author,
                comment.description,
                comment.newsId,
              );
            });
          return comments;
        }));
  }

  postComment(commentData: CommentData) {
    this.http.post('http://localhost:5000/comments', commentData).subscribe();
  }
}



