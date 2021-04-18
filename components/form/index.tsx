import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Textarea,
  Checkbox,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  title: yup.string().required(), // TODO: length validation
  content: yup.string().required(),
  postal: yup.string().required(), // TODO: need to do postal FSA validation
  category: yup.string(), // TODO: Figure out enum validation for list options
  anonymous: yup.bool().required(),
  contact: yup.bool().required(),
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(), // TODO: Phone validation
  twitter: yup.string(),
})

type LoginFormInputs = {
  title: string
  content: string
  postal: string
  category?: string
  anonymous: boolean
  contact: boolean
  name?: string
  email?: string
  phone?: string
  twitter?: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (values: LoginFormInputs) => {
    console.log('submitted')
    console.log(values)
  }

  console.log(watch('postal'))

  return (
    <form style={{ width: 350 }} onSubmit={handleSubmit(onSubmit)}>
      {/* Title field */}
      <FormControl
        isInvalid={!!errors?.title?.message}
        errortext={errors?.title?.message}
        p="4"
        isRequired
      >
        <FormLabel>Enter a title or quote</FormLabel>
        <Textarea name="title" placeholder="Here is a summary of my story" {...register('title')} />
        <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
        <FormHelperText>Maximum ___ characters</FormHelperText>
      </FormControl>

      {/* Content field */}
      <FormControl
        isInvalid={!!errors?.content?.message}
        errortext={errors?.content?.message}
        p="4"
        isRequired
      >
        <FormLabel>Please share your story</FormLabel>
        <Textarea
          name="content"
          placeholder="Here is a summary of my story"
          {...register('content')}
        />
        <FormErrorMessage>{errors?.content?.message}</FormErrorMessage>
        <FormHelperText>Maximum ___ characters</FormHelperText>
      </FormControl>

      {/* Postal field */}
      <FormControl
        isInvalid={!!errors?.postal?.message}
        errortext={errors?.postal?.message}
        p="4"
        isRequired
      >
        <FormLabel>First 3 digits of your postal code</FormLabel>
        <Input type="text" name="postal" {...register('postal')} />
        <FormErrorMessage>{errors?.postal?.message}</FormErrorMessage>
      </FormControl>

      <Button
        type="submit"
        p="4"
        mx="4"
        mt="6"
        w="90%"
        colorScheme="blue"
        variant="solid"
        disabled={!!errors.title || !!errors.content}
      >
        Submit Story
      </Button>
    </form>
  )
}
