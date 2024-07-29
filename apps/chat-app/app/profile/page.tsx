
"use client"
import React, { useState, useEffect } from 'react';
import { ProfileFormProps, UserProfile } from '@/type';
import { getUserProfile, updateUserProfile } from '@/services/api'; // Adjust if needed
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';

// {
//   id: number;
//     email: string;
//     name?: string;
//     avatarUrl?: string;
// }

const ProfileForm: React.FC<ProfileFormProps> = ({ initialProfile }) => {
  const [profile, setProfile] = useState<UserProfile | null>(initialProfile);
  const router = useRouter()
  const [success, setSuccess] = useState<string|null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const {data} = await getUserProfile()
      console.log(data);
      setProfile(data)
    }
     fetchProfile()
    // setProfile(initialProfile);
  }, [initialProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSuccess(null)
    setProfile({
      ...profile!,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (profile && profile.name && profile.email) {
        await updateUserProfile(profile.name, profile.email);
        console.log("Success");
        setSuccess("Succcessfully updated your profile!!")
        // Handle success (e.g., show a success message or redirect)
      }
    } catch (err) {
      // Handle error (e.g., show an error message)
      console.log(err);
      
    }
  };

  if (!profile) return <p>No profile data available.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className='text-green-500 italic'>{success}</div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={profile.name || ''}
          placeholder='Enter name'
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={profile.email}
          onChange={handleChange}
          placeholder='Enter email'
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
        />
      </div>
      <div>
        <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
          Avatar URL
        </label>
        <input
          id="avatarUrl"
          name="avatarUrl"
          type="text"
          value={profile.avatarUrl || ''}
          placeholder='Enter avatar url'
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-1"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Save Changes
      </button>
    </form>
  );
};



const page = () => {
  return (
    <Layout>
      <div className='text-black'>
      <ProfileForm initialProfile={
            {id: 1,
              email: "mayanlmchandratre@gmail.com",
              name: "Mayank",
              avatarUrl: "no-url",
              createdAt:"",
              updatedAt:""
            }
      } />
    </div>
    </Layout>
  )
}

export default page


