import clsx from 'clsx'
import React from 'react'

export const Logo = () => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <div className="rounded-lg dark:bg-neutral-100 dark:px-4 dark:py-2">
      <img
        alt="Patient Zero Logo"
        width={250}
        height={50}
        loading={'eager'}
        fetchPriority={'high'}
        decoding="async"
        className={clsx('h-[50px] w-full invert')}
        src="/Patient-Zero_Logo_dark.svg"
      />
    </div>
  )
}
