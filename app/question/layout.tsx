// app/question/layout.tsx

export default function QuestionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-800 mb-4">📘 StackIt Q&A</h1>
      <div className="bg-white p-4 rounded shadow">{children}</div>
    </div>
  );
}
