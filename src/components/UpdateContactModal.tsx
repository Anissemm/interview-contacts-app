import { useFormik } from 'formik'
import { useState } from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import Input from './Input'
import * as yup from 'yup'
import 'yup-phone'
import { Contact, useUpdateContactMutation } from '../store'
import SubmitButton from './Button'
import Icon from './Utility/Icon'
import SrOnly from './Utility/SrOnly'

const FormWrapper = styled.div`
  max-width: 270px;
  margin: auto;
`

const Button = styled.button<{ color: string, hoverBgColor: string }>`
  padding: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.color};
  border: 1.5px solid ${props => props.color};
  background-color: transparent;
  border-radius: 7px;
  
  &:first-child {
      margin-bottom: 5px;
    }
    
    &:hover, &:focus {
        background-color: ${props => props.hoverBgColor};  
    }
    `

const validationSchema = yup.object({
    name: yup.string().min(1).required('Name is required'),
    lastname: yup.string().min(1).optional(),
    email: yup.string().email('Please, enter a valid email address').optional(),
    phoneNumber: yup.string().phone(undefined, undefined, 'Please, enter a valid phone number').required('Phone number is required')
})

const UpdateContactModal: React.FC<Omit<Contact, 'userId'>> = ({ name, lastname, phoneNumber, email, id }) => {
    const [showUpdateContactModal, setShowUpdateContactModal] = useState(false)
    const [updateContact] = useUpdateContactMutation()

    const updateContactForm = useFormik({
        initialValues: {
            name,
            lastname,
            phoneNumber,
            email
        },
        validateOnBlur: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                setSubmitting(true)
                const data = await updateContact({ id, updatedData: values }).unwrap()
                resetForm({ values: { name: data.name, lastname: data.lastname, email: data.email, phoneNumber: data.phoneNumber } })
            } catch (err) {
            } finally {
                setShowUpdateContactModal(false)
                setSubmitting(false)
            }
        }
    })

    return (<>
        <Button
            title='Update Contact Info'
            color="#dda36f"
            hoverBgColor={'rgba(221, 162, 111, 0.3)'}
            onClick={() => setShowUpdateContactModal(true)}
        >
            <SrOnly>
                Update Contact
            </SrOnly>
            <Icon name='update' />
        </Button>
        <Modal title='Update Contact' setShow={setShowUpdateContactModal} show={showUpdateContactModal} width={450}>
            <FormWrapper>
                <form onSubmit={updateContactForm.handleSubmit}>
                    <Input
                        type='text'
                        label='Name'
                        value={updateContactForm.values.name}
                        onChange={updateContactForm.handleChange}
                        onBlur={updateContactForm.handleBlur}
                        id='update-contact-name-input'
                        name='name'
                        error={updateContactForm.touched.name && updateContactForm.errors.name}
                    />
                    <Input
                        type='text'
                        label='lastname'
                        value={updateContactForm.values.lastname}
                        onChange={updateContactForm.handleChange}
                        onBlur={updateContactForm.handleBlur}
                        id='update-contact-lastname-input'
                        name='lastname'
                        error={updateContactForm.touched.lastname && updateContactForm.errors.lastname}
                    />
                    <Input
                        type='tel'
                        label='Phone Number'
                        value={updateContactForm.values.phoneNumber}
                        onChange={updateContactForm.handleChange}
                        onBlur={updateContactForm.handleBlur}
                        id='update-contact-phone-number-input'
                        name='phoneNumber'
                        error={updateContactForm.touched.phoneNumber && updateContactForm.errors.phoneNumber}
                    />
                    <Input
                        type='email'
                        label='Email'
                        value={updateContactForm.values.email}
                        onChange={updateContactForm.handleChange}
                        onBlur={updateContactForm.handleBlur}
                        id='update-contact-email-input'
                        name='email'
                        error={updateContactForm.touched.email && updateContactForm.errors.email}
                    />
                    <SubmitButton type='submit' isLoading={updateContactForm.isSubmitting}>
                        Update
                    </SubmitButton>
                </form>
            </FormWrapper>
        </Modal>
    </>
    )
}

export default UpdateContactModal