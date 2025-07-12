'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Question {
  id: string
  title: string
  tags: string[]
  createdAt: string
}

interface User {
  id: string
  name: string
  email: string
  image?: string
}

export default function ProfilePage() {
  const router = useRouter()

  // Hardcoded mock user
  const user: User = {
    id: '1',
    name: 'Demo User',
    email: 'demo@stackit.com',
    image: 'https://api.dicebear.com/6.x/personas/svg?seed=demo'
  }

  // Hardcoded mock questions
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    setQuestions([
      {
        id: 'q1',
        title: 'How does useEffect cleanup work?',
        tags: ['react', 'hooks'],
        createdAt: '2024-06-15'
      },
      {
        id: 'q2',
        title: 'What is JWT and how does it work?',
        tags: ['jwt', 'auth'],
        createdAt: '2024-06-25'
      }
    ])
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Profile Info */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border p-6 rounded-lg shadow-sm">
        {user.image && (
          <img
            src={user.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => router.push('/profile/edit')}
              className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit Profile
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* Questions Asked */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Questions You’ve Asked</h2>
        {questions.length === 0 ? (
          <p className="text-gray-600">You haven’t posted any questions yet.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q) => (
              <li key={q.id} className="border p-4 rounded shadow-sm">
                <h3 className="font-semibold text-lg">{q.title}</h3>
                <p className="text-sm text-gray-500">{q.createdAt}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {q.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

