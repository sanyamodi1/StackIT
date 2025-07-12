import QuestionStats from './QuestionStats';
import VoteButtons from '@/components/VoteButtons';
import TagList from '@/components/TagList/TagList';
import { Question } from '@/types';

type QuestionCardProps = {
  question: Question;
  onVote: (id: number, direction: 'up' | 'down') => void;
  onTagClick: (tag: string | null) => void;
};

export default function QuestionCard({ question, onVote, onTagClick }: QuestionCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex gap-4">
        <QuestionStats
          votes={question.votes}
          answers={question.answers}
          views={question.views}
        />
        
        <div className="flex-1">
          <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 mb-1">
            <a href={`/question/${question.id}`}>{question.title}</a>
          </h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{question.body}</p>
          
          <TagList 
            tags={question.tags}
            onTagClick={onTagClick}
          />
          
          <div className="flex justify-end text-xs text-gray-500">
            <span>Asked by {question.author} on {question.createdAt}</span>
          </div>
        </div>
        
        <VoteButtons
          onUpvote={() => onVote(question.id, 'up')}
          onDownvote={() => onVote(question.id, 'down')}
        />
      </div>
    </div>
  );
}