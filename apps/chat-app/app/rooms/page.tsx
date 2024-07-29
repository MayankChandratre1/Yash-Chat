"use client"
import Layout from '@/components/Layout'
import RoomList from '@/components/RoomList'
import { createRoom } from '@/services/api'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [formdata, setFormdata] = useState<{name: string, description: string, isPrivate: boolean, type: string, joinable: boolean}>({
        name: "Default room", description: "A room", isPrivate: false, type: "dunno", joinable: true
    })

    const handlechange:React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit:React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        await createRoom(
            formdata.name,
            formdata.description,
            formdata.isPrivate,
            formdata.type,
            formdata.joinable
        )
        console.log("Room created");
    }

    const router = useRouter()

  return (
    <Layout>
        <div className='text-black'>
            <form className='flex flex-col gap-5 border border-gray-700 p-5  rounded-md' onSubmit={handleSubmit}>
                <h3 className='text-white'>Create Room</h3>
                <input name='name' className='px-3 py-2 rounded-md' type="text" placeholder='Name of Room' value={formdata.name} onChange={handlechange} />
                <input name='description' className='px-3 py-2 rounded-md' type="text" placeholder='Description' value={formdata.description} onChange={handlechange} />
                <button type='submit' className='p-3 bg-white rounded-md'>Submit</button>
            </form>
        </div>
        <div className='text-black mt-5'>
            <RoomList onRoomSelect={(roomId)=>{
                router.push("/rooms/"+roomId)
            }}/>
        </div>
    </Layout>
  )
}

export default page