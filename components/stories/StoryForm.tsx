import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import Router from 'next/router'

import storySchema, { STORY_WORD_LIMIT, TITLE_CHAR_LIMIT } from '../../lib/storySchema'

type LoginFormInputs = {
  title: string
  content: string
  postal: string
  category: string
  anonymous: string
  contact: boolean
  contactName?: string
  displayName?: string
  email?: string
  phone?: string
  twitter?: string
  consent: boolean
}

const initialValues = {
  title: '',
  content: '',
  postal: '',
  category: '',
  anonymous: 'true',
  contact: false,
  contactName: '',
  displayName: '',
  email: '',
  phone: '',
  twitter: '',
  consent: false,
}

const FIELD_PADDING = '4'
const OPTIONAL_FIELD_PADDING = '2'

export default function StoryForm() {
  async function handleSubmit(values: LoginFormInputs, actions: FormikHelpers<LoginFormInputs>) {
    // Remove any details the user filled in but then decided not to share.
    if (values.anonymous === 'true') {
      values.displayName = ''
    }
    if (!values.contact) {
      values.contactName = ''
      values.email = ''
      values.phone = ''
      values.twitter = ''
    }

    try {
      actions.setSubmitting(true)
      const result = await fetch(`/api/stories`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json',
        },
      })
      if (result.ok) {
        actions.setSubmitting(false)
        Router.push('/thanks')
      } else {
        console.error('something went wrong')
      }
    } catch (e) {
      console.error(e)
      actions.setSubmitting(false)
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={storySchema} onSubmit={handleSubmit}>
      {(props) => (
        <Form>
          {/* Anonymous */}
          <Field name="anonymous">
            {({ field, form }) => {
              return (
                <FormControl
                  pt={FIELD_PADDING}
                  pb={FIELD_PADDING}
                  isInvalid={form.errors.anonymous && form.touched.anonymous}
                >
                  <FormLabel as="legend" htmlFor="anonymous">
                    I want the story published:
                  </FormLabel>
                  <RadioGroup {...field} name="anonymous" id="anonymous">
                    <Stack direction="column">
                      <Radio {...field} value="true">
                        Anonymously (e.g. Worker from LP6)
                      </Radio>
                      <Radio {...field} value="false">
                        With my name below
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{form.errors.anonymous}</FormErrorMessage>
                </FormControl>
              )
            }}
          </Field>

          {props.values.anonymous === 'false' && (
            <Field name="displayName">
              {/* Display Name */}
              {({ field, form }) => (
                <FormControl
                  pt={FIELD_PADDING}
                  pb={FIELD_PADDING}
                  isRequired
                  isInvalid={form.errors.displayName && form.touched.displayName}
                >
                  <FormLabel htmlFor="displayName">Name to display</FormLabel>
                  <Input {...field} id="displayName" placeholder="Your name" />
                  <FormErrorMessage>{form.errors.displayName}</FormErrorMessage>
                  <FormHelperText>
                    This name <em>will</em> appear on the site.
                  </FormHelperText>
                </FormControl>
              )}
            </Field>
          )}

          {/* Title */}
          <Field name="title">
            {({ field, form }) => (
              <FormControl
                pt={FIELD_PADDING}
                pb={FIELD_PADDING}
                isRequired
                isInvalid={form.errors.title && form.touched.title}
              >
                <FormLabel htmlFor="title">Enter a title or quote</FormLabel>
                <Textarea {...field} id="title" placeholder="Enter your story title" />
                <FormHelperText>{`Up to ${TITLE_CHAR_LIMIT} characters.`}</FormHelperText>
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Content */}
          <Field name="content">
            {({ field, form }) => (
              <FormControl
                pt={FIELD_PADDING}
                pb={FIELD_PADDING}
                isRequired
                isInvalid={form.errors.content && form.touched.content}
              >
                <FormLabel htmlFor="content">Please share your story</FormLabel>
                <Textarea {...field} id="content" placeholder="Enter your story content" />
                <FormHelperText>{`Up to ${STORY_WORD_LIMIT} words.`}</FormHelperText>
                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Postal */}
          <Field name="postal">
            {({ field, form }) => (
              <FormControl
                pt={FIELD_PADDING}
                pb={FIELD_PADDING}
                isRequired
                isInvalid={form.errors.postal && form.touched.postal}
              >
                <FormLabel htmlFor="postal">First 3 characters of your postal code</FormLabel>
                <Input
                  name={field.name}
                  value={field.value.toUpperCase()}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  id="postal"
                  placeholder="P6A"
                  size="lg"
                />
                <FormErrorMessage>{form.errors.postal}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Category */}
          <Field name="category">
            {({ field, form }) => (
              <FormControl
                pt={FIELD_PADDING}
                pb={FIELD_PADDING}
                isRequired
                isInvalid={form.errors.category && form.touched.category}
              >
                <FormLabel htmlFor="category">I am a:</FormLabel>
                <Select {...field} name="category" id="category" placeholder="Choose one">
                  <option value="concerned-citizen">Concerned citizen</option>
                  <option value="essential-worker">Essential worker</option>
                  <option value="healthcare-provider">Healthcare provider</option>
                  <option value="educator">Educator</option>
                  <option value="small-business-owner">Small business owner</option>
                  <option value="patient-family-member">Patient or patient family member</option>
                  <option value="other">Other</option>
                </Select>
                <FormErrorMessage>{form.errors.category}</FormErrorMessage>
                <FormHelperText>Choose the one that best describes you.</FormHelperText>
              </FormControl>
            )}
          </Field>

          {/* Contact */}
          <Field name="contact">
            {({ field, form }) => (
              <FormControl
                pt={FIELD_PADDING}
                pb={FIELD_PADDING}
                isInvalid={form.errors.contact && form.touched.contact}
              >
                <FormLabel as="legend" htmlFor="contact">
                  Contact me for an interview
                </FormLabel>
                <Checkbox {...field}>Yes, a journalist can contact me</Checkbox>
                <FormErrorMessage>{form.errors.contact}</FormErrorMessage>
                <FormHelperText>Let us know if the media can contact you.</FormHelperText>
              </FormControl>
            )}
          </Field>
          {/* Contact Info */}
          {props.values.contact && (
            <>
              <Text as="h4" pt={FIELD_PADDING}>
                <strong>Interview Contact Info</strong>
              </Text>
              {/* Contact Name */}
              <Field name="contactName">
                {({ field, form }) => (
                  <FormControl
                    pt={OPTIONAL_FIELD_PADDING}
                    pb={OPTIONAL_FIELD_PADDING}
                    isInvalid={form.errors.contactName && form.touched.contactName}
                    isRequired
                  >
                    <FormLabel htmlFor="name">Your name</FormLabel>
                    <Input {...field} id="contactName" placeholder="Contact name" />
                    <FormErrorMessage>{form.errors.contactName}</FormErrorMessage>
                    <FormHelperText>
                      This <em>won&apos;t</em> be published.
                    </FormHelperText>
                  </FormControl>
                )}
              </Field>
              {/* Phone */}
              <Field name="phone">
                {({ field, form }) => (
                  <FormControl
                    pt={OPTIONAL_FIELD_PADDING}
                    pb={OPTIONAL_FIELD_PADDING}
                    isInvalid={form.errors.phone && form.touched.phone}
                  >
                    <FormLabel htmlFor="phone">Phone number</FormLabel>
                    <Input {...field} id="phone" placeholder="555-555-5555" />
                    <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Email */}
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    pt={OPTIONAL_FIELD_PADDING}
                    pb={OPTIONAL_FIELD_PADDING}
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="name@domain.com" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              {/* Twitter */}
              <Field name="twitter">
                {({ field, form }) => (
                  <FormControl
                    pt={OPTIONAL_FIELD_PADDING}
                    pb={OPTIONAL_FIELD_PADDING}
                    isInvalid={form.errors.twitter && form.touched.twitter}
                  >
                    <FormLabel htmlFor="twitter">Twitter</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>@</InputLeftAddon>
                      <Input {...field} id="twitter" />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.twitter}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </>
          )}

          {/* Consent */}
          <Field name="consent">
            {({ field, form }) => (
              <FormControl
                pt={FIELD_PADDING + 2}
                pb={FIELD_PADDING}
                isRequired
                isInvalid={form.errors.consent && form.touched.consent}
              >
                <FormLabel as="legend" htmlFor="consent">
                  Declaration and Consent
                </FormLabel>
                <Checkbox {...field} id="consent" name="consent">
                  I confirm this story is true and I have consent to share it and any photo
                  submitted.
                </Checkbox>
                <FormErrorMessage>{form.errors.consent}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            isFullWidth
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit Story
          </Button>
        </Form>
      )}
    </Formik>
  )
}
