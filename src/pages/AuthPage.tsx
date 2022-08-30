import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { getRequestError, useAppSelector } from '../store'
import { Outlet, useLocation } from 'react-router-dom'
import AuthToggle from '../components/AuthToggle'

const Wrapper = styled.div`
  max-width: 420px;
    padding: 0 10px;
    width: 90%;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 95%;
    min-height: 180px;
    position: relative;
    border: 2px solid var(--color-5);
    padding: 10px 4px;
    margin: 0 auto;
    border-radius: 5px;
  }
`

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 95%;

    & > form {
      width: 100%;
    }
`

const Error = motion(styled.p`
  color: #ce5d5d;
  text-transform: capitalize;
  border-radius: 7px;
  border: 1px solid #ce5d5d;
  padding: 8px;
  font-size: 14px;
`)

const LinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: space-between;
  width: 100%;
  padding: 10px 0;
`

const AuthPage = () => {
  const location = useLocation()
  const requestError = useAppSelector(getRequestError)

  return (
    <Wrapper>
      <motion.div>
        <LinksWrapper>
          <AuthToggle to='/' >Sign In</AuthToggle>
          <AuthToggle to='/signup' >Sign Up</AuthToggle>
        </LinksWrapper>
        <FormWrapper>
          <AnimatePresence>
            {requestError &&
              <Error
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {requestError}
              </Error>}
          </AnimatePresence>
          <Outlet />
        </FormWrapper>
    </motion.div>
    </Wrapper >
  )
}

export default AuthPage