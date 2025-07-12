// app/layout.tsx
export const metadata = {
  title: 'StackIt',
  description: 'Minimal Q&A Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
