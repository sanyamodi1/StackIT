// app/question/layout.tsx

export default function QuestionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6">
      <div className="bg-background p-4 rounded shadow">{children}</div>
    </div>
  );
}
