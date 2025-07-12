import { getQuestions } from '@/lib/prisma/questions';
import ClientHome from '@/components/ClientHome';

// This runs only on the server
export default async function HomePage() {
  const questions = await getQuestions();   // ← Prisma query
  return <ClientHome initialQuestions={questions} />;
}
