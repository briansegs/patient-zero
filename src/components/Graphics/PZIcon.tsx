import clsx from 'clsx'
import React from 'react'

export const Icon = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Patient Zero Icon"
      width={250}
      height={50}
      loading={'eager'}
      fetchPriority={'high'}
      decoding="async"
      className={clsx('h-[34px] w-full max-w-[20rem]')}
      src="/Patient-Zero_Icon.svg"
    />
  )
}
