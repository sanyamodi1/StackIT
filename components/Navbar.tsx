'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  Bell,
  User,
  LogIn,
  LogOut,
} from 'lucide-react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useSearch } from '@/lib/SearchContext';
import SearchBar from './SearchBar';

export default function Navbar() {
  // ───────────────────────────────────────── client state
  const [mobileOpen, setMobileOpen] = useState(false);
  const { term, setTerm } = useSearch();
  const { data: session, status } = useSession();

  const toggleMobile = () => setMobileOpen((o) => !o);

  // ───────────────────────────────────────── reusable bits
  const AuthButton = () =>
    status === 'loading' ? null : session ? (
      <button
        onClick={() => signOut()}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <User size={18} />
        <span className="hidden sm:inline">Hi, {session.user?.name || 'User'}</span>
        <LogOut size={18} className="sm:ml-1" />
      </button>
    ) : (
      <button
        onClick={() => signIn()}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
      >
        <LogIn size={18} />
        <span className="hidden sm:inline">Sign&nbsp;in</span>
      </button>
    );

  // ───────────────────────────────────────── render
  return (
    <header className="border-b">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* brand / home */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80"
        >
          Stack<span className="text-[#ff9696]">It</span>
        </Link>

        {/* desktop search */}
        <div className="hidden sm:block w-72">
          <SearchBar value={term} onChange={setTerm} placeholder="Search questions…" />
        </div>

        {/* right‑side buttons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Bell size={20} />
          </button>
          <AuthButton />

          {/* burger */}
          <button
            onClick={toggleMobile}
            className="sm:hidden rounded p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* mobile panel */}
      {mobileOpen && (
        <div className="sm:hidden border-t bg-white dark:bg-zinc-900">
          <div className="px-4 py-4 space-y-4">
            <SearchBar
              value={term}
              onChange={(v) => {
                setTerm(v);
                setMobileOpen(false); // optionally close panel on submit
              }}
              placeholder="Search questions…"
            />

            <Link
              href="/"
              className="block rounded px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              onClick={() => setMobileOpen(false)}
            >
              Home
            </Link>

            {/* add other links here if needed */}

            <AuthButton />
          </div>
        </div>
      )}
    </header>
  );
}
