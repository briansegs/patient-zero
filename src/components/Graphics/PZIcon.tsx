import clsx from 'clsx'
import React from 'react'

export const Icon = () => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt="Patient Zero Icon"
      loading={'eager'}
      fetchPriority={'high'}
      height={32}
      width={32}
      decoding="async"
      className={clsx('size-full rounded-lg dark:bg-neutral-100 dark:pb-[.5px]')}
      src="/Patient-Zero_Icon.svg"
    />
  )
}
