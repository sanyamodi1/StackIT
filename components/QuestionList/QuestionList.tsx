import QuestionCard from './QuestionCard';
import { Question } from '@/types';

type QuestionListProps = {
  questions: Question[];
  onVote: (id: number, direction: 'up' | 'down') => void;
  onTagClick: (tag: string | null) => void;
};

export default function QuestionList({ questions, onVote, onTagClick }: QuestionListProps) {
  if (questions.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No questions found. Be the first to ask!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {questions.map(question => (
        <QuestionCard
          key={question.id}
          question={question}
          onVote={onVote}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}