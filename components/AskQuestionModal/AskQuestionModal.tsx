import AskQuestionForm from './AskQuestionForm';

type AskQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: { title: string; description: string; tags: string[] }) => void;
};

export default function AskQuestionModal({ isOpen, onClose, onSubmit }: AskQuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-background rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">What's on your mind?</h2>
        <AskQuestionForm onCancel={onClose} onSubmit={onSubmit} />
      </div>
    </div>
  );
}
