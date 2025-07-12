type QuestionStatsProps = {
  votes: number;
  answers: number;
};

export default function QuestionStats({ votes, answers }: QuestionStatsProps) {
  return (
    <div className="flex flex-col items-center w-20">
      <div className="text-center">
        <span className="block text-lg font-medium">{votes}</span>
        <span className="text-xs text-gray-500">votes</span>
      </div>
      <div className="text-center mt-2">
        <span className="block text-lg font-medium">{answers}</span>
        <span className="text-xs text-gray-500">answers</span>
      </div>
    </div>
  );
}