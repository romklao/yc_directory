import React from 'react'
import SearchForm from '../../components/SearchForm'
import StartupCard, { StartupTypeCard } from '@/components/StartupCard'
import { STARTUPS_QUERY } from '@/sanity/lib/queries'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { auth } from '@/auth'

const Home = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>
}) => {
  const query = (await searchParams).query
  const params = { search: query || null }

  const session = await auth()

  console.log('session', session?.id)

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params })

  return (
    <>
      <section className="pink_container pattern">
        <h1 className="heading font-work-sans">
          Pitch Your Startup, <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  )
}

export default Home
