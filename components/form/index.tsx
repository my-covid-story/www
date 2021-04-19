import {
  // Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Select,
  // Checkbox,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { Formik, Field, Form } from 'formik'
import * as yup from 'yup'
import Router from 'next/router'

const schema = yup.object().shape({
  title: yup.string().required(), // TODO: length validation
  content: yup.string().required(),
  postal: yup.string().required(), // TODO: need to do postal FSA validation
  category: yup.string(), // TODO: Figure out enum validation for list options
  anonymous: yup.bool().required(),
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
  category?: string
  anonymous: boolean
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
  anonymous: 'true',
  // contact: '',
  // name: '',
  // email: '',
  // phone: '',
  // twitter: '',
}
export default function StoryForm() {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
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
              <FormControl p="4" isRequired isInvalid={form.errors.title && form.touched.title}>
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
              <FormControl p="4" isRequired isInvalid={form.errors.content && form.touched.content}>
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
              <FormControl p="4" isRequired isInvalid={form.errors.postal && form.touched.postal}>
                <FormLabel htmlFor="postal">Your story postal</FormLabel>
                <Input {...field} id="postal" placeholder="P6A" />
                <FormErrorMessage>{form.errors.postal}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          {/* Category */}
          <Field name="category">
            {({ field, form }) => (
              <FormControl
                p="4"
                isRequired
                isInvalid={form.errors.category && form.touched.category}
              >
                <FormLabel htmlFor="category">I am a:</FormLabel>
                <Select {...field} name="category" id="category">
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
            {({ field, form }) => (
              <FormControl p="4" isInvalid={form.errors.anonymous && form.touched.anonymous}>
                <FormLabel htmlFor="anonymous">I am a:</FormLabel>
                <RadioGroup {...field} name="anonymous" id="anonymous">
                  <Radio {...field} value="true">
                    Anonymously (e.g. Worker from LP6)
                  </Radio>
                  <Radio {...field} value="false">
                    With my name below
                  </Radio>
                </RadioGroup>
                <FormErrorMessage>{form.errors.anonymous}</FormErrorMessage>
                <FormHelperText>Choose the one that best describes you</FormHelperText>
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

function Logger(props) {
  console.log(props)
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}
