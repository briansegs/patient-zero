import clsx from 'clsx'
import React from 'react'

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Patient Zero Logo"
      width={250}
      height={50}
      loading={'eager'}
      fetchPriority={'high'}
      decoding="async"
      className={clsx('h-[50px] w-full max-w-[20rem]')}
      src="/Patient-Zero_Logo_dark.svg"
    />
  )
}
