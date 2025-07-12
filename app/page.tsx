import { getQuestions } from '@/lib/prisma/questions';
import ClientHome from '@/components/ClientHome';

export default async function HomePage() {
  const questions = await getQuestions(); // fetch from DB
  return <ClientHome initialQuestions={questions} />;
}
