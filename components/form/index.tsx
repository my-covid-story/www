import {
  // Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Textarea,
  // Checkbox,
  // Radio,
  // RadioGroup,
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import Router from 'next/router'

const schema = yup.object().shape({
  title: yup.string().required(), // TODO: length validation
  content: yup.string().required(),
  postal: yup.string().required(), // TODO: need to do postal FSA validation
  // category: yup.string(), // TODO: Figure out enum validation for list options
  // anonymous: yup.bool().required(),
  // contact: yup.bool().required(),
  // name: yup.string(),
  // email: yup.string().email(),
  // phone: yup.string(), // TODO: Phone validation
  // twitter: yup.string(),
})

type LoginFormInputs = {
  title: string
  content: string
  postal: string
  // category?: string
  // anonymous: boolean
  // contact: boolean
  // name?: string
  // email?: string
  // phone?: string
  // twitter?: string
}

const initialValues = {
  title: '',
  content: '',
  postal: '',
  category: '',
  anonymous: '',
  contact: '',
  name: '',
  email: '',
  phone: '',
  twitter: '',
}
export default function StoryForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values: LoginFormInputs, actions) => {
        try {
          actions.setSubmitting(true)
          const result = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/story`, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
              'content-type': 'application/json',
            },
          })
          console.log(result)
          if (result) {
            actions.setSubmitting(false)
            Router.push('/stories/thanks')
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
              <FormControl p="4" isInvalid={form.errors.title && form.touched.title}>
                <FormLabel htmlFor="title">Your story title</FormLabel>
                <Textarea {...field} id="title" placeholder="Enter your story title" />
                <FormHelperText>Maximum ___ characters</FormHelperText>
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Content */}
          <Field name="content">
            {({ field, form }) => (
              <FormControl p="4" isInvalid={form.errors.content && form.touched.content}>
                <FormLabel htmlFor="content">Your story content</FormLabel>
                <Textarea {...field} id="content" placeholder="Enter your story content" />
                <FormHelperText>Maximum ___ characters</FormHelperText>
                <FormErrorMessage>{form.errors.content}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Postal */}
          <Field name="postal">
            {({ field, form }) => (
              <FormControl p="4" isInvalid={form.errors.postal && form.touched.postal}>
                <FormLabel htmlFor="postal">Your story postal</FormLabel>
                <Input {...field} id="postal" placeholder="P6A" />
                <FormErrorMessage>{form.errors.postal}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button mt={4} colorScheme="teal" isLoading={props.isSubmitting} type="submit">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}
