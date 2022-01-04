// Use send() to send a story to elected representatives by email.
// By default, emails are only sent in production.
// To send emails in non-prod environments, you must set the MPP_EMAILS environment variable.
// Its value is a comma-separated list of addresses to receive emails for testing purposes.

import mail from '@sendgrid/mail'
import sanitize from 'sanitize-html'
import { AdminStory, storyProvince } from './model/story'

mail.setApiKey(process.env.SENDGRID_API_KEY)

const FROM_EMAIL = 'MyCovidStory.ca <info@mycovidstory.ca>'

// In production, BCC ourselves using the Gmail plus trick for filtering.
const BCC_EMAIL =
  process.env.VERCEL_ENV === 'production'
    ? 'info+mpp@mycovidstory.ca'
    : undefined

// The default addresses to receive stories from Ontario.
// If we are emailing the MPP for a specific riding, these addresses will be cc'ed.
const ONTARIO_EMAILS = [
  'premier@ontario.ca',
  'doug.fordco@pc.ola.org',
  'christine.elliott@pc.ola.org',
  'sylvia.jones@pc.ola.org',
  'horwatha-qp@ndp.on.ca',
  'justin.trudeau@parl.gc.ca',
]

const ONTARIO_ADDRESSEE =
  'Premier Ford, Minister Elliott, Minister Jones, MPP Horwath, and Prime Minster Trudeau'

// The default addresses to receive stories from outside of Ontario.
const CANADA_EMAILS = [
  'justin.trudeau@parl.gc.ca',
  'chrystia.freeland@parl.gc.ca',
  'patty.hajdu@parl.gc.ca',
]

const CANADA_ADDRESSEE =
  'Prime Minster Trudeau, Minister Freeland, and Minister Hajdu'

// Parse comma-separated list of email adress from MPP_EMAILS environment variable.
// If specified, custom emails are always used as-is, never modified based on riding.
const CUSTOM_EMAILS = (() => {
  if (process.env.MPP_EMAILS) {
    return process.env.MPP_EMAILS.split(',')
      .map((r) => r.trim())
      .filter((r) => r)
  }
  return false
})()

// We must not send emails to actual politicians' addresses except in production.
// But we also need to be able to test using other addresses in non-prod environments.
// Be very careful with this!
const ENABLED = (() => {
  if (CUSTOM_EMAILS) {
    console.log('Emailer enabled with custom addresses:', CUSTOM_EMAILS)
    return true
  }
  const env = process.env.VERCEL_ENV
  if (env === 'production') {
    console.log('Emailer enabled in production')
    return true
  }
  console.log(`Emailer disabled in ${env} environment`)
  return false
})()

// Sends an email for the specified story if emailing is enabled.
// Does not check if an email has already been sent for the story. The caller must do that.
// If an email is sent successfully, returns the message ID or '-' if none can be determined.
// Returns null if emailing is disabled or sending an email fails.
export async function send(story: AdminStory): Promise<string | null> {
  if (ENABLED) {
    console.log(`Sending email for story ${story.id}`)
    const message = createMessage(story)
    try {
      const result = await mail.send(message)
      const messageId = result?.[0]?.headers?.['x-message-id'] || '-'
      console.log(`Sent email with message ID ${messageId}`)
      return messageId
    } catch (err) {
      console.error('Failed to send email:', err, err.response?.body?.errors)
    }
  }
  return null
}

function createMessage(story: AdminStory) {
  const {
    fields: { to, cc, ...fields },
    params,
  } = computeDetails(story)

  // If custom emails are specified, they always override the recipients, and there is no cc.
  return {
    to: CUSTOM_EMAILS || to,
    cc: CUSTOM_EMAILS ? undefined : cc,
    ...fields,
    text: generateText(params),
    html: generateHtml(params),
  }
}

function computeDetails(story: AdminStory) {
  const from = FROM_EMAIL
  const bcc = BCC_EMAIL
  const ontario = storyProvince(story) === 'ON'
  const emails = ontario ? ONTARIO_EMAILS : CANADA_EMAILS
  const subject = 'A COVID-19 story'

  const { id, title, content, postal, postalCode } = story
  const url = `${process.env.BASE_URL}/story/${id}`
  const params = { url, title, content }
  const riding = postalCode?.ridings?.[0]?.riding

  if (riding) {
    const { name: ridingName, mppEmail, mppDesignation, mppLastName } = riding
    return {
      fields: {
        from,
        to: mppEmail,
        cc: emails,
        bcc,
        subject: `${subject} from ${ridingName}`,
      },
      params: {
        addressee: `${mppDesignation} ${mppLastName}`,
        source: 'by one of your constituents',
        location: 'in your very own riding',
        ...params,
      },
    }
  }

  if (ontario) {
    return {
      fields: { from, to: emails, bcc, subject: `${subject} from Ontario` },
      params: {
        addressee: ONTARIO_ADDRESSEE,
        source: `from ${
          postalCode ? postalCode.name : `postal code ${postal}`
        }`,
        location: 'in Ontario, right now',
        ...params,
      },
    }
  }

  const source = postalCode
    ? `from ${postalCode.name}, ${postalCode.province}`
    : `from postal code ${postal}`

  return {
    fields: { from, to: emails, bcc, subject },
    params: {
      addressee: CANADA_ADDRESSEE,
      source,
      location: 'in Canada, right now',
      ...params,
    },
  }
}

interface BodyParams {
  addressee: string
  source: string
  location: string
  url: string
  title: string
  content: string
}

function generateText({
  addressee,
  source,
  location,
  url,
  title,
  content,
}: BodyParams) {
  return `Hello ${addressee},

MyCovidStory.ca is a volunteer-led effort to collect and amplify the stories of those impacted by COVID-19. We believe in the power of storytelling and that because the government has refused to listen to the numbers, we must make them face the stories of the people they were elected to represent.

The following story was submitted ${source}:

"${title}"

${content}

${url}

Every number has a story, and this is a story happening ${location}.

We encourage you to visit www.mycovidstory.ca to read more of these stories and to use your power to advance effective government policy that will actually save lives.

Thank you,

The MyCovidStory.ca Team

---
Website: https://www.mycovidstory.ca
Twitter: https://twitter.com/MyCOVIDStory_CA
Facebook: https://www.facebook.com/MyCovidStoryCA
Instagram: https://www.instagram.com/mycovidstory_ca/
`
}

const SANITIZE_OPTIONS = { allowedTags: [], allowedAttributes: {} }

function generateHtml({
  addressee,
  source,
  location,
  url,
  title,
  content,
}: BodyParams) {
  title = sanitize(title, SANITIZE_OPTIONS)
  content = sanitize(content, SANITIZE_OPTIONS)

  return `<p>Hello ${addressee},</p>
<p>MyCovidStory.ca is a volunteer-led effort to collect and amplify the stories of those impacted by COVID-19. We believe in the power of storytelling and that because the government has refused to listen to the numbers, we must make them face the stories of the people they were elected to represent.</p>
<p>The following story was submitted ${source}:</p>
<div style="background: #f9f9f9; border-left: 0.5em solid #ccc; margin: 2em 0; padding: 1px 1em;">
<p><a href="${url}" style="color: inherit; text-decoration: none;"><strong>“${title}”</strong></a></p>
${content
  .split('\n')
  .map((p) => p.trim())
  .filter((p) => p)
  .map(
    (p) =>
      `<p><a href="${url}" style="color: inherit; text-decoration: none;">${p}</a></p>`
  )
  .join('\n')}
</div>
<p>Every number has a story, and <strong>this is a story happening ${location}.</strong></p>
<p>We encourage you to visit <a href="https://www.mycovidstory.ca">www.mycovidstory.ca</a> to read more of these stories and to use your power to advance effective government policy that will actually save lives.</p>
<p>Thank you,</p>
<p>The MyCovidStory.ca Team</p>

<p>---<br>
Website: <a href="https://www.mycovidstory.ca">www.mycovidstory.ca</a><br>
Twitter: <a href="https://twitter.com/MyCOVIDStory_CA">@MyCOVIDStory_CA</a><br>
Facebook: <a href="https://www.facebook.com/MyCovidStoryCA">@MyCovidStoryCA</a><br>
Instagram: <a href="https://www.instagram.com/mycovidstory_ca/">@mycovidstory_ca</a></p>
`
}
