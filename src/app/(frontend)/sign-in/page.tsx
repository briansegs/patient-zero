import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import PageClient from './page.client'
import React from 'react'

const SignIn = async () => {
  return (
    <div className="pb-24 pt-16">
      <PageClient />
      <div className="relative -mt-[10.4rem] flex h-[60vh] items-center justify-center bg-white dark:bg-black">
        <div className="container mt-28 flex h-full flex-col items-center justify-center gap-6">
          <h1 className="text-2xl font-bold">Sign in or sign up to gain access.</h1>
          <div className="flex gap-4">
            <Button size={'lg'} variant={'default'} aria-label="Sign in to your account">
              <SignInButton />
            </Button>

            <Button
              className={'text-black dark:text-white'}
              size={'lg'}
              variant={'outline'}
              aria-label="Create a new account"
            >
              <SignUpButton />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
