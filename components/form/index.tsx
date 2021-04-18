import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  TextArea,
  Checkbox,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

type LoginFormInputs = {
  email: string
  password: string
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const onSubmit = (values: LoginFormInputs) => console.log(values)

  return (
    <form style={{ width: 350 }}>
      <FormControl
        isInvalid={!!errors?.email?.message}
        errortext={errors?.email?.message}
        p="4"
        isRequired
      >
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" placeholder="Email" {...register('email')} />
        <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
        <FormHelperText>We are obviously giving this straight to Facebook.</FormHelperText>
      </FormControl>
      <FormControl
        isInvalid={!!errors?.password?.message}
        errortext={errors?.password?.message}
        px="4"
        pb="4"
        isRequired
      >
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder="Password" name="password" {...register('password')} />
        <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        onClick={handleSubmit(onSubmit)}
        p="4"
        mx="4"
        mt="6"
        w="90%"
        colorScheme="blue"
        variant="solid"
        disabled={!!errors.email || !!errors.password}
      >
        Login
      </Button>
    </form>
  )
}
