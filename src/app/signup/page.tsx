'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignupPage() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "", 
        username: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log(response.data);
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user.email.length>0 && user.username.length >0 && user.password.length >0) {
            setButtonDisabled(false)
        }else{
            setButtonDisabled(true)
        }
    }, [user])

    return (
    <div className='flex flex-col items-center justify-center h-screen'
    >
        <h1>{loading ? "Processing" : "Signup"}</h1>

        <label htmlFor="username">username</label>
        <input
        className='rounded-lg border border-gray-300 px-2 mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='username'
        value = {user.username} 
        type="text" 
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='username'
        />

        <label htmlFor="email">email</label>
        <input
        className='rounded-lg border border-gray-300 px-2 mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='email'
        value = {user.email} 
        type="text" 
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email'
        />

        <label htmlFor="password">password</label>
        <input
        className='rounded-lg border border-gray-300 px-2 mb-4 focus:outline-none focus:border-gray-600 text-black'
        id='password'
        value = {user.password} 
        type="text" 
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password'
        />

        <button className='rounded-lg px-2 py-1' onClick={onSignup}>
            {buttonDisabled ? "Fill all fields" : "Signup"}
        </button>

        <Link href='/login'>Visit Login Page</Link>
    </div>
  )
}

