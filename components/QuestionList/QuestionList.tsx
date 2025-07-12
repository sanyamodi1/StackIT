import QuestionCard from './QuestionCard';
import { Question } from '@/types';

type QuestionListProps = {
  questions: Question[];
  onVote: (id: string, direction: 'up' | 'down') => void; // ← id is a string
  onTagClick: (tag: string | null) => void;
};

export default function QuestionList({
  questions,
  onVote,
  onTagClick,
}: QuestionListProps) {
  /* ——— Empty list ——— */
  if (questions.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <div className="rounded-2xl border border-white px-6 py-8">
          <p className="text-white">No questions yet — break the silence!</p>
        </div>
      </div>
    );
  }

  /* ——— Questions ——— */
  return (
    <div className="space-y-4">
      {questions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          onVote={onVote}
          onTagClick={onTagClick}
        />
      ))}
    </div>
  );
}
