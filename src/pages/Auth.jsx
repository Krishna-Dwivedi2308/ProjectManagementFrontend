import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login'
import Signup from '@/components/Signup'
const Auth = () => {
  return (
    <div className='pt-20'>
         <div className='mt-10 flex flex-col items-center gap-10'>
    {/* <div className='text-5xl font-extrabold'>{longlink
    ? (<h1>Please Login First.We will pick you where you left off!</h1>) 
    : (<h1>Login/Signup</h1>)}</div> */}
    <Tabs defaultValue="login" className="w-100 flex flex-col items-center ">
      <TabsList className='w-100'>
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="signup">SignUp</TabsTrigger>
      </TabsList>
      <TabsContent className='w-100 flex flex-col'value="login"><Login/></TabsContent>
      <TabsContent value="signup"><Signup/></TabsContent>
    </Tabs>
  </div>
        </div>
  )
}

export default Auth