import { prisma } from '@/app/generated/prisma';

export async function getQuestions() {
  const questions = await prisma.question.findMany({
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  });

  return questions.map(q => ({
    id: q.id,
    title: q.title,
    body: q.body,
    votes: q.votes,
    answers: q.answers.length,
    views: q.views,
    tags: q.tags,
    author: q.author.name,
    createdAt: q.createdAt.toISOString(),
  }));
}
