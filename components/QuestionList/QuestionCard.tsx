import QuestionStats from './QuestionStats';
import VoteButtons from '@/components/VoteButtons';
import TagList from '@/components/TagList/TagList';
import { Question } from '@/types';

type QuestionCardProps = {
  question: Question;
  onVote: (id: number, direction: 'up' | 'down') => void;
  onTagClick: (tag: string | null) => void;
};

export default function QuestionCard({
  question,
  onVote,
  onTagClick,
}: QuestionCardProps) {
  return (
    <div className="bg-black border border-white rounded-2xl p-4 shadow-sm">
      <div className="flex gap-4">
        <QuestionStats
          votes={question.votes}
          answers={question.answers}
          views={question.views}
        />

        {/* Main column */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="text-lg font-medium mb-1">
            <a
              href={`/question/${question.id}`}
              className="text-blue-400 hover:text-blue-300"
            >
              {question.title}
            </a>
          </h3>

          {/* Excerpt */}
          <p className="text-gray-300 text-sm mb-2 line-clamp-2">
            {question.body}
          </p>

          {/* Tags */}
          <TagList tags={question.tags} onTagClick={onTagClick} />

          {/* Meta info */}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              Asked by {question.author} on{' '}
              {new Date(question.createdAt).toLocaleDateString()}
            </span>

            {/* Answers Button */}
            <a
              href={`/question/${question.id}`}
              className="text-sm text-white hover:text-lg underline"
            >
              Answers...
            </a>
          </div>
        </div>

        {/* Votes */}
        <VoteButtons
          onUpvote={() => onVote(question.id, 'up')}
          onDownvote={() => onVote(question.id, 'down')}
        />
      </div>
    </div>
  );
}
