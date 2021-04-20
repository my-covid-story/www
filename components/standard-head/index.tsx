import Head from 'next/head'

interface HeadProps {
  title?: string
  description?: string
  previewImage?: string
}

export default function StandardHead({ title, description, previewImage }: HeadProps) {
  return (
    <Head>
      {title && (
        <>
          <title key="title">{`${title} | My Covid Story`}</title>
          <meta key="og:title" property="og:title" content={title} />
          <meta key="twitter:title" name="twitter:title" content={title} />
        </>
      )}

      {description && (
        <>
          <meta key="description" name="description" content={description} />
          <meta key="og:description" property="og:description" content={description} />
          <meta key="twitter:description" name="twitter:description" content={description} />
        </>
      )}

      {previewImage && (
        <>
          <meta key="og:image" property="og:image" content={previewImage} />
          <meta key="twitter:image" name="twitter:image" content={previewImage} />
        </>
      )}
    </Head>
  )
}
