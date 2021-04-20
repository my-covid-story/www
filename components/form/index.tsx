import {
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Textarea,
  Select,
  Radio,
  RadioGroup,
  Checkbox,
  Text,
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import Router from 'next/router'

import storySchema from '../../lib/storySchema'

type LoginFormInputs = {
  title: string
  content: string
  postal: string
  category: string
  anonymous: string
  contact: boolean
  name?: string
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
  name: '',
  email: '',
  phone: '',
  twitter: '',
  consent: false,
}
export default function StoryForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={storySchema}
      onSubmit={async (values: LoginFormInputs, actions) => {
        try {
          actions.setSubmitting(true)
          const result = await fetch(`/api/stories`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'content-type': 'application/json',
            },
          })
          console.log(result)
          if (result.ok) {
            actions.setSubmitting(false)
            Router.push('/stories/thanks')
          } else {
            console.error('something went wrong')
          }
        } catch (e) {
          console.error(e)
          actions.setSubmitting(false)
        }
      }}
    >
      {(props) => (
        <Form>
          {/* Title */}
          <Field name="title">
            {({ field, form }) => (
              <FormControl
                pt="8"
                pb="8"
                isRequired
                isInvalid={form.errors.title && form.touched.title}
              >
                <FormLabel htmlFor="title">Enter a title or quote</FormLabel>
                <Textarea {...field} id="title" placeholder="Enter your story title" />
                <FormHelperText>Up to 75 characters</FormHelperText>
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Content */}
          <Field name="content">
            {({ field, form }) => (
              <FormControl
                pt="8"
                pb="8"
                isRequired
                isInvalid={form.errors.content && form.touched.content}
              >
                <FormLabel htmlFor="content">Please share your story</FormLabel>
                <Textarea {...field} id="content" placeholder="Enter your story content" />
                <FormHelperText>Up to 1000 words</FormHelperText>
                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Postal */}
          <Field name="postal">
            {({ field, form }) => (
              <FormControl
                pt="8"
                pb="8"
                isRequired
                isInvalid={form.errors.postal && form.touched.postal}
              >
                <FormLabel htmlFor="postal">First 3 characters of your postal code</FormLabel>
                <Input {...field} id="postal" placeholder="P6A" size="lg" />
                <FormErrorMessage>{form.errors.postal}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Category */}
          <Field name="category">
            {({ field, form }) => (
              <FormControl
                pt="8"
                pb="8"
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
                <FormHelperText>Choose the one that best describes you</FormHelperText>
              </FormControl>
            )}
          </Field>

          {/* Anonymous */}
          <Field name="anonymous">
            {({ field, form }) => {
              // This little beauty is a result of radio buttons only providing string values, but we really want a boolean
              // so that we can do some conditional validation (when "Show my name" is selected, we require name)
              // Copy the  original handler
              const fieldOnChange = field.onChange
              // Hijack the value and coerce it to boolean
              field.onChange = (event) => {
                if (event?.target?.value) {
                  const normalizedValue = event.target.value === 'true' ? true : false
                  event.target.value = normalizedValue
                }
                // Call formik's original handler with our replaced event and value
                fieldOnChange(event)
              }
              return (
                <FormControl
                  pt="8"
                  pb="8"
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

          {/* Contact */}
          <Field name="contact">
            {({ field, form }) => (
              <FormControl pt="8" pb="8" isInvalid={form.errors.contact && form.touched.contact}>
                <FormLabel as="legend" htmlFor="contact">
                  Media Contact
                </FormLabel>
                <Checkbox {...field}>Yes, the media can contact me</Checkbox>
                <FormErrorMessage>{form.errors.contact}</FormErrorMessage>
                <FormHelperText>Let us know if the media can contact you.</FormHelperText>
              </FormControl>
            )}
          </Field>

          {/* Contact Info */}
          <Text as="h4">
            <strong>Optional Contact Info</strong>
          </Text>
          {/* Name */}
          <Field name="name">
            {({ field, form }) => (
              <FormControl pt="4" pb="4" isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Name to display</FormLabel>
                <Input {...field} id="name" placeholder="Contact name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          {/* Phone */}
          <Field name="phone">
            {({ field, form }) => (
              <FormControl pt="4" pb="4" isInvalid={form.errors.phone && form.touched.phone}>
                <FormLabel htmlFor="phone">Phone number</FormLabel>
                <Input {...field} id="phone" placeholder="555-555-5555" />
                <FormErrorMessage>{form.errors.phone}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          {/* Email */}
          <Field name="email">
            {({ field, form }) => (
              <FormControl pt="4" pb="4" isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input {...field} id="email" placeholder="name@domain.com" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          {/* Twitter */}
          <Field name="twitter">
            {({ field, form }) => (
              <FormControl pt="4" pb="4" isInvalid={form.errors.twitter && form.touched.twitter}>
                <FormLabel htmlFor="twitter">Twitter</FormLabel>
                <InputGroup>
                  <InputLeftAddon children="@" />
                  <Input {...field} id="twitter" />
                </InputGroup>
                <FormErrorMessage>{form.errors.twitter}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Consent */}
          <Field name="consent">
            {({ field, form }) => (
              <FormControl
                pt="8"
                pb="8"
                isRequired
                isInvalid={form.errors.consent && form.touched.consent}
              >
                <FormLabel as="legend" htmlFor="consent">
                  Declaration and Consent
                </FormLabel>
                <Checkbox {...field} id="consent" name="consent">
                  I confirm this story is true and I have consent to share it and any photo
                  submitted
                </Checkbox>
                <FormErrorMessage>{form.errors.consent}</FormErrorMessage>
                <FormHelperText>Let us know if the media can consent you.</FormHelperText>
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
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

function Logger(props) {
  console.log(props)
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}
