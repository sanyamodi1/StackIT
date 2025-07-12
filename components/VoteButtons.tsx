type VoteButtonsProps = {
  onUpvote: () => void;
  onDownvote: () => void;
};

export default function VoteButtons({ onUpvote, onDownvote }: VoteButtonsProps) {
  return (
    <div className="flex flex-col items-center">
      <button 
        onClick={onUpvote}
        className="p-1 text-gray-500 hover:text-green-500"
      >
        ▲
      </button>
      <button 
        onClick={onDownvote}
        className="p-1 text-gray-500 hover:text-red-500"
      >
        ▼
      </button>
    </div>
  );
}