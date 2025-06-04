import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Label } from '../components/ui/label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'

type AuthMode = 'signin' | 'signup' | 'forgot'

export default function AdminAuthPage() {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleAuth = async () => {
    setLoading(true)
    setMessage(null)

    try {
      if (mode === 'signin') {
        console.log('Signing in with', email,password);
        const { data,error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        console.log('Sign in data:', data);
        
        setMessage('Logged in successfully!')
        navigate('/admin')
      }

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage('Sign up successful. Check your email to verify.')
      }

      if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        })
        if (error) throw error
        setMessage('Password reset email sent.')
      }
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center capitalize">{mode === 'forgot' ? 'Forgot Password' : mode}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          <Button onClick={handleAuth} className="w-full" disabled={loading}>
            {loading ? 'Please wait...' : mode === 'forgot' ? 'Send reset email' : mode}
          </Button>

          <div className="text-sm text-center text-muted-foreground space-y-1">
            {mode === 'signin' && (
              <>
                <p>
                  Don't have an account?{' '}
                  <button className="underline" onClick={() => setMode('signup')}>
                    Sign up
                  </button>
                </p>
                <p>
                  <button className="underline" onClick={() => setMode('forgot')}>
                    Forgot password?
                  </button>
                </p>
              </>
            )}

            {mode === 'signup' && (
              <p>
                Already have an account?{' '}
                <button className="underline" onClick={() => setMode('signin')}>
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                <button className="underline" onClick={() => setMode('signin')}>
                  Back to sign in
                </button>
              </p>
            )}
          </div>

          {message && <p className="text-sm text-center text-red-600">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
