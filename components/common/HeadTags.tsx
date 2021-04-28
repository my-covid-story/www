import Head from 'next/head'

const defaultTitle = 'The Stories of COVID-19 in Ontario'
const defaultDescription =
  "Ontario is in a humanitarian crisis. If our leaders won't listen to the numbers, they must face our stories."
const defaultPreviewImage = `img/landingpage-v2.jpg`

interface HeadTagsProps {
  title?: string
  description?: string
  previewImage?: string
  children?: React.ReactNode
}

const TITLE_SUFFIX = 'MyCOVIDStory.ca'
const DESCRIPTION_LENGTH = 170

export default function HeadTags({
  children,
  title = defaultTitle,
  description = defaultDescription,
  previewImage = defaultPreviewImage,
}: HeadTagsProps) {
  const generatedTitle = generateTitle(title, TITLE_SUFFIX)
  const generatedDescription = generateDescription(description, DESCRIPTION_LENGTH)
  const generatedPreviewImage = generatePreviewImageUrl(previewImage)

  return (
    <Head>
      <title key="title">{generatedTitle}</title>
      <meta key="description" name="description" content={generatedDescription} />

      <meta key="og:title" property="og:title" content={generatedTitle} />
      <meta key="og:description" property="og:description" content={generatedDescription} />
      <meta key="og:image" property="og:image" content={generatedPreviewImage} />

      <meta key="twitter:title" name="twitter:title" content={generatedTitle} />
      <meta key="twitter:description" name="twitter:description" content={generatedDescription} />
      <meta key="twitter:image" name="twitter:image" content={generatedPreviewImage} />
      {children}
    </Head>
  )
}

// Limits the title string and appends our default suffix.
function generateTitle(title: string, suffix: string): string {
  if (title.length > 50) {
    return `${title.slice(0, 50)} | ${suffix}`
  } else {
    return `${title} | ${suffix}`
  }
}

// Limits description text to maxLength
function generateDescription(description: string, maxLength: number): string {
  return description.slice(0, maxLength)
}

function generatePreviewImageUrl(path: string): string {
  // strip leading slash
  const cleanPath = path.replace(/^\/+/, '')
  return `${process.env.BASE_URL}/${cleanPath}`
}
