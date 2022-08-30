import styled from 'styled-components'
import { deleteToken, signOut, useAppDispatch } from '../store'

const Button = styled.button`
  background-color: transparent;
  border: 2px solid #65718A;
  border-radius: 5px;
  color: #65718A;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover, &:focus {
    outline: none;
    background-color: rgba(152, 154, 159, 0.2);
  }
`

const SignOutButton = () => {
  const dispatch = useAppDispatch()

  return (
    <Button
      type='button'
      onClick={() => {
        dispatch(deleteToken())
        dispatch(signOut())
      }}
    >
      Sign Out
    </Button>
  )
}

export default SignOutButton