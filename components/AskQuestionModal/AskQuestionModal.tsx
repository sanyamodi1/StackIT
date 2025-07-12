import AskQuestionForm from './AskQuestionForm';

type AskQuestionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: { title: string; body: string; tags: string[] }) => void;
};

export default function AskQuestionModal({ isOpen, onClose, onSubmit }: AskQuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4">Ask a Question</h2>
        <AskQuestionForm onCancel={onClose} onSubmit={onSubmit} />
      </div>
    </div>
  );
}