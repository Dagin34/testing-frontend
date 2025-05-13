import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if(!formData.fullName.trim()) return toast.error('Full Name is required')
    if(!formData.email.trim()) return toast.error('Email is required')
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error('Email is invalid')
    if(!formData.password) return toast.error('Password is required')
    if(formData.password.length < 6) return toast.error('Password must be at least 6 characters long')

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = validateForm();
    console.log(formData)

    if (success === true) signup(formData)
  }

  return (
    <div className='flex justify-center overflow-hidden max-lg:px-4 pt-[5%]'>
      <div className='bg-base-300 p-8 rounded-lg shadow-md w-full max-w-md overflow-hidden max-lg:px-6 '>
        <h2 className='text-2xl font-bold text-center mb-2'>Sign Up</h2>
        <p className='mb-10 tracking-wide text-center'>Get started with your free account</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-6 relative'>
            <label className='absolute rounded tracking-wider bg-base-100  left-2 text-sm bottom-8 px-3 block mb-2' htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className='w-full px-3 py-3 border bg-base-100 rounded focus:outline-none focus:ring focus:ring-info'
            />
          </div>
          <div className='mb-6 relative'>
            <label className='absolute rounded tracking-wider bg-base-100  left-2 text-sm bottom-8 px-3 block mb-2' htmlFor='email'>Email</label>
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
              className='w-full px-3 py-3 border bg-base-100 rounded focus:outline-none  focus:ring focus:ring-info'
            />

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="mt-8 text-info hover:text-primary opacity-0">
              {showPassword ? 'Hide Password' : 'Show Password'}
            </button>
          </div>

          <button type="submit" disabled={isSigningUp} className={`w-full bg-primary text-primary-content hover:scale-105 transition-transform duration-300 py-2 rounded ${isSigningUp && 'opacity-50 cursor-not-allowed'}`}>
            {isSigningUp ? (
              <div className='flex items-center justify-center'>
                <Loader2 className='animate-spin mr-2 size-5' />
                'Signing Up...'
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <p className='mt-2 text-center'>
          Already have an account? <a href='/login' className='text-primary hover:text-primary'>Login</a>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage