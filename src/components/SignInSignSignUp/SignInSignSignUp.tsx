import { Button } from '../ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

const SignInSignSignUp = () => {
  return (
    <div className="relative -mt-[10.4rem] flex h-[60vh] items-center justify-center bg-white">
      <div className="container mt-28 flex h-full flex-col items-center justify-center gap-6">
        <p className="text-2xl font-bold">Sign in or sign up to gain access.</p>
        <div className="flex gap-4">
          <Button className={''} size={'lg'} variant={'default'}>
            <SignInButton />
          </Button>

          <Button className={'text-black'} size={'lg'} variant={'outline'}>
            <SignUpButton />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignInSignSignUp
