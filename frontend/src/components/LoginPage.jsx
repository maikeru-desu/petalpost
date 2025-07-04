import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');
  const [rememberMe, setRememberMe] = useState(false);
  
  // Use the refactored login hook from useAuth.js
  const loginMutation = useLogin();
  return (
    <div className="flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8" 
      style={{ 
        background: `linear-gradient(135deg, rgba(var(--color-ecru)/0.9) 0%, rgba(var(--color-flax)/0.7) 100%)`,
        backgroundImage: `url('/src/assets/flowers-bg.png')`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay'
      }}>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-2xl relative overflow-hidden">
        {/* Decorative corner flowers */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full" 
          style={{ backgroundColor: 'rgba(var(--color-flax)/0.1)' }}></div>
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full" 
          style={{ backgroundColor: 'rgba(var(--color-redwood)/0.1)' }}></div>
        
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-extrabold" style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm" style={{ color: 'rgb(var(--color-wine))' }}>
            Welcome back to PetalPost
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate({ email, password });
        }}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input 
                id="email-address" 
                name="email" 
                type="email" 
                autoComplete="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:z-10 sm:text-sm" 
                style={{ 
                  borderColor: 'rgba(var(--color-caput-mortuum)/0.3)',
                  ':focus': { 
                    borderColor: 'rgb(var(--color-wine))',
                    boxShadow: '0 0 0 1px rgba(var(--color-wine)/0.2)' 
                  } 
                }}
                placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                autoComplete="current-password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:z-10 sm:text-sm" 
                style={{ 
                  borderColor: 'rgba(var(--color-caput-mortuum)/0.3)',
                  ':focus': { 
                    borderColor: 'rgb(var(--color-wine))',
                    boxShadow: '0 0 0 1px rgba(var(--color-wine)/0.2)' 
                  } 
                }}
                placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 focus:ring-indigo-500 border-gray-300 rounded" 
                style={{ 
                  color: 'rgb(var(--color-wine))',
                  borderColor: 'rgba(var(--color-caput-mortuum)/0.3)'
                }} />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium hover:underline transition-all duration-200" 
                style={{ color: 'rgb(var(--color-wine))' }}>
                Forgot your password?
              </a>
            </div>
          </div>

          {loginMutation.error && (
            <div className="rounded-md bg-red-50 p-4 mb-3">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">
                    {loginMutation.error?.response?.data?.message || 'Invalid email or password'}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div>
            <button 
              type="submit" 
              disabled={loginMutation.isPending}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300 shadow-md hover:shadow-lg" 
              style={{ 
                backgroundColor: loginMutation.isPending ? 'rgba(var(--color-wine)/0.7)' : 'rgb(var(--color-wine))',
                ':hover': { backgroundColor: 'rgb(var(--color-redwood))' },
                ':focus': { boxShadow: '0 0 0 3px rgba(var(--color-wine)/0.5)' }
              }}>
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {loginMutation.isPending ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center pt-4 mt-6 border-t" style={{ borderColor: 'rgba(var(--color-flax)/0.3)' }}>
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="font-medium hover:underline transition-all duration-200" 
              style={{ color: 'rgb(var(--color-wine))' }}>
              Sign up now
            </a>
          </p>
        </div>

        {/* Decorative flower element */}
        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" 
            style={{ color: 'rgb(var(--color-caput-mortuum))' }}>
            <path d="M12 7.5c2.5 0 4.5-2 4.5-4.5 0 2.5 2 4.5 4.5 4.5-2.5 0-4.5 2-4.5 4.5 0-2.5-2-4.5-4.5-4.5zM12 16.5c2.5 0 4.5-2 4.5-4.5 0 2.5 2 4.5 4.5 4.5-2.5 0-4.5 2-4.5 4.5 0-2.5-2-4.5-4.5-4.5zM3 16.5c2.5 0 4.5-2 4.5-4.5 0 2.5 2 4.5 4.5 4.5-2.5 0-4.5 2-4.5 4.5 0-2.5-2-4.5-4.5-4.5z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
