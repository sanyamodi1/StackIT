'use client';

import Link from "next/link";
import { useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();   // ↳ “authenticated” | “loading” | “unauthenticated”
  const isLoggedIn = status === "authenticated";

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* ───────────────────────────────── Top Bar */}
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" className="text-2xl font-extrabold text-blue-600">
          StackIt
        </Link>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-blue-600 transition"
              >
                Profile
              </Link>

              <button
                aria-label="Notifications"
                className="relative text-gray-700 hover:text-blue-600 transition"
                onClick={() => {
                  /* open notifications drawer / modal here */
                }}
              >
                <Bell size={22} />
                {/* optional unread dot */}
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500" />
              </button>

              {/* remove this <button> if you don’t want a logout link here */}
              <button
                onClick={() => signOut()}
                className="text-sm text-gray-500 hover:text-blue-600 transition"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn()}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 transition"
            >
              Log in
            </button>
          )}
        </div>

        {/* Mobile burger */}
        <div className="md:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ───────────────────────────────── Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden space-y-4 px-4 pb-4 pt-2">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="block text-gray-700 hover:text-blue-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                Profile
              </Link>

              <button
                aria-label="Notifications"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
                onClick={() => {
                  /* open notifications modal */
                  setMobileOpen(false);
                }}
              >
                <Bell size={18} />
                <span>Notifications</span>
              </button>

              <button
                onClick={() => {
                  signOut();
                  setMobileOpen(false);
                }}
                className="block text-left text-gray-500 hover:text-blue-600"
              >
                Log out
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                signIn();
                setMobileOpen(false);
              }}
              className="w-full text-left text-gray-700 hover:text-blue-600 transition"
            >
              Log in
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
