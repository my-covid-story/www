// This validation schema is shared between client and server
// Used in: `/components/form`, '/pages/api/stories/index.ts'

import * as yup from 'yup'

const TITLE_CHAR_LIMIT = 75
const STORY_WORD_LIMIT = 1000

const schema = yup.object().shape({
  title: yup
    .string()
    .max(TITLE_CHAR_LIMIT, "Your title can't be more than ${max} characters")
    .required('Title is required'),
  content: yup
    .string()
    .test('word count', `Story can't be more than ${STORY_WORD_LIMIT} words`, (value) =>
      // If no value, we return true since it passes validation, otherwise coerce word length check to boolean
      !value ? true : Boolean(value.trim().split(/\s+/).length <= STORY_WORD_LIMIT)
    )
    .required('A story is required'),
  postal: yup
    .string()
    .matches(/^[A-Za-z]\d[A-Za-z]/, 'Postal code must be letter number letter')
    .required(),
  category: yup.string().required('Please choose a category'),
  anonymous: yup.bool(),
  contact: yup.bool(),
  name: yup.string().when('anonymous', {
    is: false,
    then: yup
      .string()
      .required(
        "You must include your name since you've agreed to be contacted. Choose 'Anonymously' above if you don't want to share your name"
      ),
  }),
  email: yup.string().email('Invalid email address format'),
  phone: yup
    .string()
    .matches(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, 'Phone number must be formatted like 555-555-5555'),
  twitter: yup.string(),
  consent: yup.bool().isTrue('You must provide your consent to continue'),
})

export default schema
