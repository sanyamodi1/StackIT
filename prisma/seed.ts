import { PrismaClient } from '../app/generated/prisma'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  // Hash password once for reuse
  const hashedPassword = await bcrypt.hash("password123", 10)

  // Create fake users
  const user1 = await prisma.user.create({
    data: {
      name: "sanya",
      fullName: "sanya modi",
      email: "sanya@example.com",
      password: hashedPassword,
      image: "https://i.pravatar.cc/150?img=1"
    }
  })

  const user2 = await prisma.user.create({
    data: {
      name: "neeraj",
      fullName: "neeraj singh",
      email: "neeraj@example.com",
      password: hashedPassword,
      image: "https://i.pravatar.cc/150?img=2"
    }
    
  })
  const user3 = await prisma.user.create({
    data: {
      name: "trisha",
      fullName: "trisha agarwal",
      email: "trisha@example.com",
      password: hashedPassword,
      image: "https://i.pravatar.cc/150?img=2"
    }
    
  })
  const user4 = await prisma.user.create({
    data: {
      name: "sunny",
      fullName: "sunny haokip",
      email: "sunny@example.com",
      password: hashedPassword,
      image: "https://i.pravatar.cc/150?img=2"
    }
    
  })

  // Create fake questions
  const question1 = await prisma.question.create({
    data: {
      title: "How does React work under the hood?",
      content: "I've always been curious about how the virtual DOM works.",
      tags: ["react", "javascript", "frontend"],
      userId: user1.id
    }
  })

  const question2 = await prisma.question.create({
    data: {
      title: "Best practices for using Prisma with Next.js?",
      content: "Should I use Prisma Client as a singleton? What about caching?",
      tags: ["next.js", "prisma", "backend"],
      userId: user2.id
    }
  })

  // Create answers
  await prisma.answer.create({
    data: {
      content: "React uses a virtual DOM to improve rendering performance.",
      questionId: question1.id,
      userId: user2.id,
      upvotes: 5,
      downvotes: 0,
      isAccepted: true
    }
  })

  await prisma.answer.create({
    data: {
      content: "Use a global Prisma client and avoid instantiating it multiple times.",
      questionId: question2.id,
      userId: user1.id,
      upvotes: 3,
      downvotes: 1
    }
  })

  // Add notifications
  await prisma.notification.createMany({
    data: [
      {
        content: "Bob answered your question.",
        userId: user4.id
      },
      {
        content: "Alice replied to your Prisma question.",
        userId: user3.id
      }
    ]
  })

  console.log("✅ Fake data inserted")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
