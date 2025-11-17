'use client'
import { DiscussionEmbed } from 'disqus-react'

function DisqusComments({article}) {
  const pageUrl = typeof window !== 'undefined'? window.location.href : ""
  const disqusConfig = {
    url: pageUrl,
    identifier: article.slug,
    title: article.title,
    language: "fa"
    }
  return (
    <DiscussionEmbed className="commentscontainer" shortname='meshtah' config={disqusConfig} />
  )
}

export default DisqusComments