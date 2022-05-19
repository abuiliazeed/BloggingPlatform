import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  useForm,
  FormError,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm()

  const [create, { error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message.')
      formMethods.reset()
    },
  })

  const onSubmit = (data) => {
    console.log(data)
    create({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />
      <Toaster />
      <Form className='flex flex-col  items-left' onSubmit={onSubmit} formMethods={formMethods} erroe={error}>
        <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField className='bg-gray-100  rounded-sm'
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField className='bg-gray-100  rounded-sm'
          name="email"
          errorClassName="error"
          validation={{
            required: true,
            pattern: { value: /^[^@]+@[^.]+\..+$/ },
          }}
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField className='bg-gray-100  rounded-sm'
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />

        <Submit className='bg-blue-200 py-2 px-2 rounded-lg m-1'>Send Message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
