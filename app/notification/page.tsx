'use client';

import { useState } from 'react';

type Notification = {
  id: number;
  message: string;
  timestamp: string;
  read: boolean;
};

const sampleNotifications: Notification[] = [
  {
    id: 1,
    message: 'Your question got an upvote!',
    timestamp: 'Just now',
    read: false,
  },
  {
    id: 2,
    message: 'New answer on your question: "How to use React hooks?"',
    timestamp: '5 minutes ago',
    read: false,
  },
  {
    id: 3,
    message: 'Your answer received a comment.',
    timestamp: '1 hour ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(sampleNotifications);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">You're all caught up!</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              className={`p-4 rounded-lg border ${
                notif.read ? 'border-gray-700 bg-gray-900' : 'border-blue-600 bg-gray-800'
              }`}
            >
              <div className="text-sm">{notif.message}</div>
              <div className="text-xs text-gray-400 mt-1">{notif.timestamp}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
