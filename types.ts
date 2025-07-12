export type Question = {
  id: string;
  title: string;
  description: string;
  answers: number;
  tags: string[];
  author: string;
  createdAt: string;
  votes: number;
};