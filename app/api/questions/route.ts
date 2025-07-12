import { prisma } from '@/app/generated/prisma
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { title, body, tags } = await req.json();
  const question = await prisma.question.create({
    data: {
      title,
      body,
      tags,
      authorId: 'some-user-id', // replace with session.user.id
    },
  });

  return NextResponse.json({
    id: question.id,
    title: question.title,
    body: question.body,
    votes: question.votes,
    answers: 0,
    views: question.views,
    tags: question.tags,
    author: 'you',
    createdAt: question.createdAt.toISOString(),
  });
}
