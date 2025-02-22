import React from 'react'

import RichText from '@/components/RichText'
import { ImageTextCardBlock as ImageTextCard } from '@/payload-types'
import { Media as MediaComponent } from '@/components/Media'

export const ImageTextCardBlock: React.FC<ImageTextCard> = ({ richText, media }) => {
  return (
    <div className="container">
      <div className="flex flex-col gap-8 rounded border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex max-w-[48rem] items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div>{media && <MediaComponent resource={media} size="33vw" />}</div>
      </div>
    </div>
  )
}
