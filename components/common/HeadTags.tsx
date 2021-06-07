import Head from 'next/head'

const defaultTitle = 'Amplifying the stories of the pandemic throughout Canada'
const defaultDescription =
  'MyCOVIDStory.ca is a non-partisan site to read the stories of the COVID-19 pandemic across Canada and share your own in a safe and anonymous manner.'
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
