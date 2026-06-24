'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface SessionUser {
  name: string
  email: string
  role: string
}

export default function Header() {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<SessionUser | null>(null)
  const [authLoaded, setAuthLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        setUser(data ?? null)
        setAuthLoaded(true)
      })
      .catch(() => setAuthLoaded(true))
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/')
    router.refresh()
  }

  const firstName = user?.name?.split(' ')[0] ?? ''

  return (
    <header className="bg-blue-slate shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/logo-white.svg"
              alt="Nuvho"
              width={140}
              height={36}
              priority
              className="h-9 w-auto"
            />
          </Link>

          {/* Right nav — desktop */}
          <nav className="hidden sm:flex items-center gap-3">
            {!authLoaded ? null : user ? (
              <>
                {user.email.endsWith('@nuvho.com') && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-xs font-heading font-semibold
                               bg-white/15 hover:bg-white/25 text-white rounded-full px-3 py-1.5
                               transition-colors border border-white/20"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin
                  </Link>
                )}
                <span className="text-white/90 font-body text-sm">
                  Hello, {firstName}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn-outline-white text-sm py-2 px-5"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="text-white/80 hover:text-white font-body text-sm transition-colors"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="btn-outline-white text-sm py-2 px-5"
                >
                  Login
                </Link>
              </>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="sm:hidden bg-blue-slate/95 border-t border-white/10 px-4 py-4 space-y-3">
          {user ? (
            <>
              <span className="block text-white/90 text-sm py-1">Hello, {firstName}</span>
              {user.email.endsWith('@nuvho.com') && (
                <Link href="/admin" className="block text-white/80 hover:text-white text-sm py-1 font-heading font-semibold">
                  ⚙ Admin Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="btn-outline-white text-sm inline-block"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signup" className="block text-white/80 hover:text-white text-sm py-1">
                Sign Up
              </Link>
              <Link href="/login" className="btn-outline-white text-sm inline-block">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
