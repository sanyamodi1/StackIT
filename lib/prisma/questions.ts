import { PrismaClient } from '../../app/generated/prisma';

const prisma = new PrismaClient();

export async function getQuestions() {
  const questions = await prisma.question.findMany({
    include: {
      user: true,
      answers: true, // includes upvotes/downvotes per answer
    },
    orderBy: { createdAt: 'desc' },
  });

  return questions.map((q) => {
    const totalVotes = q.answers.reduce(
      (sum, ans) => sum + ans.upvotes - ans.downvotes,
      0
    );

    return {
      id: q.id,
      title: q.title,
      description: q.content,
      answers: q.answers.length,
      tags: q.tags,
      author: q.user.name,
      createdAt: q.createdAt.toISOString(),
      votes: totalVotes, // ✅ include calculated votes
    };
  });
}

export async function getQuestionById(id: string) {
  const question = await prisma.question.findUnique({
    where: { id },
    include: {
      user: true,
      answers: true,
    },
  });

  if (!question) return null;

  const totalVotes = question.answers.reduce(
    (sum, ans) => sum + ans.upvotes - ans.downvotes,
    0
  );

  return {
    id: question.id,
    title: question.title,
    description: question.content,
    tags: question.tags,
    author: question.user.name,
    createdAt: question.createdAt.toISOString(),
    answers: question.answers.map((ans) => ans.content),
    votes: totalVotes,
  };
}
