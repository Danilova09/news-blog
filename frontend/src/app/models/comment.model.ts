export class Comment {
  constructor(
    public id: string,
    public author: string,
    public description: string,
    public newsId: number,
  ) {}
}

export interface CommentData {
  title: string;
  description: string;
  news_id: number;
}
