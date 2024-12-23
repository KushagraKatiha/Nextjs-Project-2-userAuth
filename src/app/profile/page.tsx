'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProfilePage() {
  const [data, setData] = useState('nothing')
  const [err, setErr] = useState('')
  
  const router = useRouter()

  const getUserDetails = async () => {
    try {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
    } catch (error: any) {
        console.log(error.message);
        setErr(error.message)     
    }
  }

  const logout = async () => {
    try {
        const res = await axios.get('/api/users/logout')
        console.log(res.data);        
        toast.success('Logout Success')
        router.push('/login')
    } catch (error: any) {
        console.log(error.message);
        toast.error(error.message)
    }
  }
  
  
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
        <h1>Profile page</h1>
        
        <hr />
        {err && <h2>{err}</h2>}
        <h2>{data === 'nothing' ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        
        <hr />

        <button
            onClick={logout}
            className='mb-4 rounded-lg bg-blue-500 text-white px-2 py-1'
        >
            Logout
        </button>

        <button
            onClick={getUserDetails}
            className='rounded-lg bg-green-500 text-white px-2 py-1'
        >
            Get User Data
        </button>

    </div>
  )
}