import { useCallback, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { AuthContext } from './useAuth'

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isMounted) return
      if (!error) {
        setSession(data.session ?? null)
        setUser(data.session?.user ?? null)
      }
      setIsInitializing(false)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null)
      setUser(nextSession?.user ?? null)
      setIsInitializing(false)
    })

    return () => {
      isMounted = false
      subscription?.subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (isInitializing) return

    const path = location.pathname
    const isAuthed = Boolean(session)

    if (isAuthed && path === '/login') {
      navigate('/dashboard', { replace: true })
      return
    }

    if (!isAuthed && path.startsWith('/dashboard')) {
      navigate('/login', { replace: true })
    }
  }, [isInitializing, location.pathname, navigate, session])

  const signInWithEmailPassword = useCallback(async ({ email, password }) => {
    return supabase.auth.signInWithPassword({ email, password })
  }, [])

  const signInWithPhonePassword = useCallback(async ({ phone, password }) => {
    return supabase.auth.signInWithPassword({ phone, password })
  }, [])

  const signUpWithEmailPassword = useCallback(async ({ email, password, emailRedirectTo }) => {
    return supabase.auth.signUp({
      email,
      password,
      options: emailRedirectTo ? { emailRedirectTo } : undefined
    })
  }, [])

  const signUpWithPhonePassword = useCallback(async ({ phone, password }) => {
    return supabase.auth.signUp({ phone, password })
  }, [])

  const verifyPhoneOtp = useCallback(async ({ phone, token }) => {
    return supabase.auth.verifyOtp({ phone, token, type: 'sms' })
  }, [])

  const signOut = useCallback(async () => {
    const result = await supabase.auth.signOut()
    navigate('/', { replace: true })
    return result
  }, [navigate])

  const value = useMemo(
    () => ({
      session,
      user,
      isInitializing,
      isAuthenticated: Boolean(session),
      signInWithEmailPassword,
      signInWithPhonePassword,
      signUpWithEmailPassword,
      signUpWithPhonePassword,
      verifyPhoneOtp,
      signOut
    }),
    [
      isInitializing,
      session,
      signInWithEmailPassword,
      signInWithPhonePassword,
      signOut,
      signUpWithEmailPassword,
      signUpWithPhonePassword,
      user,
      verifyPhoneOtp
    ]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
