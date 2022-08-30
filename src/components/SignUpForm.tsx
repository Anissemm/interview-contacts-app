import { useSignUpMutation } from '../store'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Input from './Input'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const validationSchema = yup.object({
    email: yup.string().email('Please, provide a valid email address').required('Email is required'),
    name: yup.string().min(3, 'Name must be at least 3 character long').required('Name is required'),
    password: yup.string().min(8, 'Password must be at least 8 character long').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm password is required')
})

const SignUpForm = () => {
    const navigate = useNavigate()
    const [signUp] = useSignUpMutation()

    const signupForm = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setSubmitting(true)
                await signUp(values).unwrap()
                navigate('/contacts', { replace: true })
            } catch (err: any) {
            } finally {
                setSubmitting(false)
            }
        }
    })

    return (
        <motion.form onSubmit={signupForm.handleSubmit}>
            <Input
                id='signup-email'
                label='Email'
                name='email'
                type='email'
                value={signupForm.values.email}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                error={signupForm.touched.email && signupForm.errors.email}
            />
            <Input
                id='signup-name'
                label='Name'
                name='name'
                type='text'
                value={signupForm.values.name}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                error={signupForm.touched.name && signupForm.errors.name}
            />
            <Input
                id='signup-password'
                label='Password'
                name='password'
                type='password'
                value={signupForm.values.password}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                error={signupForm.touched.password && signupForm.errors.password}
            />
            <Input
                id='signin-confirm-password'
                label='Confirm Password'
                name='confirmPassword'
                type='password'
                value={signupForm.values.confirmPassword}
                onChange={signupForm.handleChange}
                onBlur={signupForm.handleBlur}
                error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
            />
            <div>
                <Button type='submit' isLoading={signupForm.isSubmitting}>Sign Up</Button>
            </div>
        </motion.form>
    )
}

export default SignUpForm