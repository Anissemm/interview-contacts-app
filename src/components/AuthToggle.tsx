import React, { MouseEvent, PropsWithChildren } from 'react'
import { useMatch, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { setRequestError, useAppDispatch } from '../store'

const Button = styled.button<{active: boolean}>`
    height: 50%;
    background-color: none;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-weight: bold;
    color: #A4B6D9;
    padding: 0 15px;
    background-color: ${props => props.active ? 'transparent' : 'rgba(101,113,138,0.5)'};
    border-radius: 8px;
    border: 0;
    padding: 14px 18px;

    &:hover {
      background-color: ${props => props.active ? 'transparent' : 'rgba(101,113,138,0.8)'};
    }
    
    &:first-child {
      margin-bottom: 4px;
    }

`

const AuthToggle: React.FC<PropsWithChildren<{ to: string }>> = ({ to, children }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const activePath = useMatch(to)

    const navigateTo = (to: string) => {
        navigate(to)
        dispatch(setRequestError(null))
    }

    return (
        <Button
            active={activePath?.pathname === to}
            disabled={activePath?.pathname === to}
            onClick={(_e: MouseEvent<HTMLButtonElement>) => navigateTo(to)}
        >
            {children}
        </Button>
    )
}

export default AuthToggle