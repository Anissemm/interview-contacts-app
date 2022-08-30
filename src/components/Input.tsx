import { AnimatePresence, motion } from 'framer-motion'
import { ChangeEvent, FocusEvent, forwardRef, RefAttributes } from 'react'
import styled from 'styled-components'

interface CustomInput extends RefAttributes<HTMLInputElement> {
    [key: string]: any
    id: string
    label: string
    type: 'text' | 'email' | 'password' | 'tel' | 'search'
    name: string
    value: string
    error?: undefined | null | false | string
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: FocusEvent<HTMLInputElement>) => void
}

const InputField = styled.input`
    padding: 0 8px;
    position: absolute;
    bottom: 8px;
    border: 0;
    background-color: transparent;
    width: calc(100% - 27px);
    color: #A4B6D9;
    transition: all 300ms ease-out;

    &:focus {
        outline: none;
    }
`

const InputWrapper = styled.div`
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    `

const BaseInputField = styled.div<{ error: boolean }>`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    color: #A4B6D9;
    font-size: 14px;
    border: 2px solid #65718A;
    height: 55px;
    box-shadow: ${props => props.error && '0 0 5px #ce5d5d !important'};
    transition: all 300ms ease-out;
    
    &:focus-within {
        border: 2px solid #A4B6D9;
        box-shadow: 0 0 3px #A4B6D9;

        label {
            font-size: 16px;
        }
    }

    border-radius: 8px;
    font-weight: bold;

`
const Label = styled.label`
    position: absolute;
    top: 8px;
    left: 8px;
    transition: all 300ms ease-out;

    &::after, &::before {
      content: '',

    }
`

const Error = motion(styled.p`
    color: #ce5d5d;
    margin: 5px 8px 0;
    text-transform: capitalize;
    font-size: 14px;
`)

const Input = forwardRef<HTMLInputElement, CustomInput>(({
    label,
    id,
    name,
    type = 'text',
    value, onChange,
    onFocus,
    onBlur,
    error,
    ...props
}, ref) => {
    return (
        <InputWrapper>
            <BaseInputField error={!!error}>
                <Label htmlFor={id}>
                    {label}
                </Label>
                <InputField
                    autoComplete='new-password'
                    ref={ref}
                    id={id}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                />
            </BaseInputField>
            <AnimatePresence>
                {error && <Error initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>{error}</Error>}
            </AnimatePresence>
        </InputWrapper>
    )
})

export default Input