export type Question = {
  id: number;
  title: string;
  body: string;
  votes: number;
  answers: number;
  views: number;
  tags: string[];
  author: string;
  createdAt: string;
};