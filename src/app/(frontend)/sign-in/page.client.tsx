'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useAuth } from '@clerk/nextjs'
import React, { useEffect } from 'react'

const PageClient: React.FC = () => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()
  const { isSignedIn, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      setHeaderTheme('light')
    }
  }, [isSignedIn, setHeaderTheme, isLoaded])
  return <React.Fragment />
}

export default PageClient
