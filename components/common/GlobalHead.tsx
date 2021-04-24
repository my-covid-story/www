import Head from 'next/head'

const defaultTitle = 'The Stories of COVID-19 in Ontario | MyCovidStory.ca'
const defaultDescription =
  "Ontario is in a humanitarian crisis. If our leaders won't listen to the numbers, they must face our stories."
const defaultPreviewImage = 'https://www.mycovidstory.ca/img/landingpage-v2.jpg'

interface GlobalHeadProps {
  title?: string
  description?: string
  previewImage?: string
}

export default function GlobalHead({
  title = defaultTitle,
  description = defaultDescription,
  previewImage = defaultPreviewImage,
}: GlobalHeadProps): JSX.Element {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />

      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:image" property="og:image" content={previewImage} />

      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={previewImage} />
    </Head>
  )
}
