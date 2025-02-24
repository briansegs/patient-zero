import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post || !post.id) return <PayloadRedirects url={url} />

  return (
    <article className="pb-16 pt-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText
            className="mx-auto max-w-[48rem]"
            data={
              post.content || {
                root: {
                  type: '',
                  children: [],
                  direction: null,
                  format: '',
                  indent: 0,
                  version: 0,
                },
              }
            }
            enableGutter={false}
          />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="col-span-3 col-start-1 mt-12 max-w-[52rem] grid-rows-[2fr] lg:grid lg:grid-cols-subgrid"
              docs={post.relatedPosts.filter((post) => typeof post === 'object') as Post[]}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = result.docs?.[0] || null

  if (post && post.id) {
    const relatedPosts = post.relatedPosts || []

    const relatedSlugs = relatedPosts?.map((post) => (typeof post === 'string' ? post : post.slug))

    const relatedPages = await payload.find({
      collection: 'posts',
      draft,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          in: relatedSlugs,
        },
      },
    })

    const slugToImageMap = relatedPages.docs.reduce(
      (map, page) => {
        if (page.slug) {
          map[page.slug] = page.heroImage || null
        }
        return map
      },
      {} as Record<string, Post['heroImage']>,
    )

    const updatedRelatedPosts = relatedPosts.map((post) => {
      const postSlug = typeof post === 'string' ? post : post.slug

      if (postSlug && typeof post !== 'string') {
        const newImage = slugToImageMap[postSlug]

        return {
          ...post,
          meta: {
            ...post.meta,
            image: newImage,
          },
        }
      }
      return post
    })

    return { ...post, relatedPosts: updatedRelatedPosts }
  }

  return null
})
