import { useSignInMutation } from '../store/slices/userSlice'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Input from './Input'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object({
    email: yup.string().email('Please, provide a valid email address').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 character long').required('password is required')
})

const SignInForm = () => {
    const [signIn] = useSignInMutation()
    const navigate = useNavigate()

    const signinForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true)
                await signIn(values).unwrap()
                navigate('/contacts')
            } catch (err: any) {
            } finally {
                setSubmitting(false)
            }
        }
    })

    return (
        <form onSubmit={signinForm.handleSubmit}>
            <Input
                className={`Hello`}
                id='signin-mail'
                label='Email'
                type='email'
                name='email'
                value={signinForm.values.email}
                onChange={signinForm.handleChange}
                onBlur={signinForm.handleBlur}
                error={signinForm.touched.email && signinForm.errors.email}
            />
            <Input
                id='signin-password'
                label='Password'
                name='password'
                type='password'
                value={signinForm.values.password}
                onChange={signinForm.handleChange}
                onBlur={signinForm.handleBlur}
                error={signinForm.touched.password && signinForm.errors.password}
            />
            <Button type='submit' isLoading={signinForm.isSubmitting}>Sign In</Button>
        </form >
    )
}

export default SignInForm