import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

export default async function UserProfile({ params }: Props) {
  const userId = params.id

  // 🟠 TEMPORARY: Hardcoded user list
  const allUsers = [
    {
      id: '1',
      name: 'Demo User',
      email: 'demo@stackit.com',
      image: 'https://api.dicebear.com/6.x/personas/svg?seed=demo',
      questions: [
        {
          id: 'q1',
          title: 'How does useEffect cleanup work?',
          tags: ['react', 'hooks'],
          createdAt: '2024-06-15'
        }
      ]
    },
    {
      id: '2',
      name: 'Alice Stack',
      email: 'alice@stackit.com',
      image: 'https://api.dicebear.com/6.x/personas/svg?seed=alice',
      questions: []
    }
  ]

  const user = allUsers.find((u) => u.id === userId)

  if (!user) return notFound()

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border p-6 rounded-lg shadow-sm">
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Questions Asked</h2>
        {user.questions.length === 0 ? (
          <p className="text-gray-500">No questions posted yet.</p>
        ) : (
          <ul className="space-y-4">
            {user.questions.map((q) => (
              <li key={q.id} className="border p-4 rounded">
                <h3 className="font-medium text-lg">{q.title}</h3>
                <p className="text-sm text-gray-400">{q.createdAt}</p>
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
