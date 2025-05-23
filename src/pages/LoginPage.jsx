import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { login, isLoggingIn } = useAuthStore()

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid')
    if (!formData.password) return toast.error('Password is required')
    if (formData.password.length < 6) return toast.error('Password must be at least 6 characters long')

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = validateForm();

    if (success === true) login(formData)
  }

  return (
    <div className='my-auto flex justify-center overflow-hidden max-lg:px-4 pt-[5%]'>
      <div className='bg-base-300 p-8 rounded-lg shadow-md w-full max-w-md overflow-hidden max-lg:px-6 '>
        <h2 className='text-2xl font-bold text-center mb-2'>Login</h2>
        <p className='mb-10 tracking-wide text-center'>Welcome back, esteemed user.</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-6 relative'>
            <label className='absolute rounded bg-base-100 tracking-wider left-2 text-sm bottom-8 px-3 block mb-2' htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className='w-full px-3 py-3 border bg-base-100 rounded focus:outline-none focus:ring focus:ring-info'
            />
          </div>
          <div className='mb-2 relative'>
            <label className='absolute rounded bg-base-100 tracking-wider left-2 text-sm bottom-22 px-3 block mb-2' htmlFor='password'>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className='w-full px-3 py-3 border bg-base-100 rounded focus:outline-none focus:ring focus:ring-info'
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="mt-8 text-info opacity-0 hover:text-primary">
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>

          <button type="submit" id='submit-button' disabled={isLoggingIn} className={`w-full bg-primary text-primary-content hover:scale-105 transition-transform duration-300 py-2 rounded ${isLoggingIn && 'opacity-50 cursor-not-allowed'}`}>
            {isLoggingIn ? (
              <div className='flex items-center justify-center'>
                <Loader2 className='animate-spin mr-2 size-5' />
                'Logging In...'
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
        <p className='mt-2 text-center'>
          Don't have an account? <a href='/signup' className='text-primary hover:text-primary'>Sign up</a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage