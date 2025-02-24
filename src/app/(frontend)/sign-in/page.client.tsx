'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()
  const { isSignedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setHeaderTheme('light')

    if (isSignedIn) {
      router.push('/')
    }
  }, [isSignedIn, setHeaderTheme, router])
  return <React.Fragment />
}

export default PageClient
