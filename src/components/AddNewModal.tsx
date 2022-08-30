import { useFormik } from 'formik'
import { useState } from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import 'react-phone-input-2/lib/style.css'
import Input from './Input'
import * as yup from 'yup'
import 'yup-phone'
import { getUser, useAddContactMutation, useAppSelector } from '../store'
import Button from './Button'
import Icon from './Utility/Icon'

const AddNewButton = styled.button`
  background-color: transparent;
  border: 2px solid #65718A;
  border-radius: 5px;
  color: #65718A;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover, &:focus {
    outline: none;
    background-color: rgba(152, 154, 159, 0.2);
  }
`

const FormWrapper = styled.div`
  max-width: 270px;
  margin: auto;
`

interface AddNewModal {
  title?: string
  show?: boolean
}

const validationSchema = yup.object({
  name: yup.string().min(1).required('Name is required'),
  lastname: yup.string().min(1).optional(),
  email: yup.string().email('Please, enter a valid email address').optional(),
  phoneNumber: yup.string().phone(undefined, undefined, 'Please, enter a valid phone number').required('Phone number is required')
})

const AddNewModal = () => {
  const [showAddNewModal, setShowAddNewModal] = useState(false)
  const [addContact] = useAddContactMutation()
  const user = useAppSelector(getUser)

  const addNewContactForm = useFormik({
    initialValues: {
      name: '',
      lastname: '',
      phoneNumber: '',
      email: ''
    },
    validateOnBlur: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true)
        await addContact({ userId: user?.id as number, ...values })
        setShowAddNewModal(false)
        resetForm()
      } catch (err) {
      } finally {
        setSubmitting(false)
      }
    }
  })

  return (<>
    <AddNewButton
      onClick={() => setShowAddNewModal(true)}
    >
      Add New
      <Icon name='add' />
    </AddNewButton>
    <Modal title='Add New Contact' setShow={setShowAddNewModal} show={showAddNewModal} width={450}>
      <FormWrapper>
        <form onSubmit={addNewContactForm.handleSubmit}>
          <Input
            type='text'
            label='Name'
            value={addNewContactForm.values.name}
            onChange={addNewContactForm.handleChange}
            onBlur={addNewContactForm.handleBlur}
            id='add-contact-name-input'
            name='name'
            error={addNewContactForm.touched.name && addNewContactForm.errors.name}
          />
          <Input
            type='text'
            label='lastname'
            value={addNewContactForm.values.lastname}
            onChange={addNewContactForm.handleChange}
            onBlur={addNewContactForm.handleBlur}
            id='add-contact-lastname-input'
            name='lastname'
            error={addNewContactForm.touched.lastname && addNewContactForm.errors.lastname}
          />
          <Input
            type='tel'
            label='Phone Number'
            value={addNewContactForm.values.phoneNumber}
            onChange={addNewContactForm.handleChange}
            onBlur={addNewContactForm.handleBlur}
            id='add-contact-phone-number-input'
            name='phoneNumber'
            error={addNewContactForm.touched.phoneNumber && addNewContactForm.errors.phoneNumber}
          />
          <Input
            type='email'
            label='Email'
            value={addNewContactForm.values.email}
            onChange={addNewContactForm.handleChange}
            onBlur={addNewContactForm.handleBlur}
            id='add-contact-email-input'
            name='email'
            error={addNewContactForm.touched.email && addNewContactForm.errors.email}
          />
          <Button type='submit' isLoading={addNewContactForm.isSubmitting} >
            Add
          </Button>
        </form>
      </FormWrapper>
    </Modal>
  </>
  )
}

export default AddNewModal