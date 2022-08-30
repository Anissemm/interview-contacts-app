import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import SignOutButton from '../components/SignOutButton'


const MainWrapper = motion(styled.div<{ isAuthPage: boolean }>`
  background-color: #201a23;
  width: 100vw;
  height: 100vh;
  font-family: 'Quicksand', Arial, sans-serif;
  overflow: hidden;

  ${props => props.isAuthPage ?
    ` display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;`
    : ''}

  --color-1: #173753;
  --color-2: #1B4353;
  --color-3: #1D70A2;
  --color-4: #A4B6D9;
  --color-5: #65718A;
`)

const MainLayoutHeader = styled.header<{ isContactsPage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;

  & > h1 {
    font-size: ${props => props.isContactsPage ? '24px' : '32px'};
  }
`

const H1 = motion(styled.h1`
  font-family: 'Aboreto';
  color: var(--color-5);
  margin: 0;
  text-transform: uppercase;
  color: var(--color-5);
  display: flex;
  align-items: center;
  
  @media screen and (min-width: 640px){
    font-size: '24px';
  }
`)

const PageWrapper = motion(styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`)

const MainLayout = () => {
  const location = useLocation()
  const [isAuthPage, setIsAuthPage] = useState(['/', '/signup'].includes(location.pathname))

  return (
    <MainWrapper
      isAuthPage={isAuthPage}>
      <MainLayoutHeader isContactsPage={!isAuthPage}>
        <H1>Contacts</H1>
        {!isAuthPage && <SignOutButton />}
      </MainLayoutHeader>
      <PageWrapper
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => setIsAuthPage(['/', '/signup'].includes(location.pathname))}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Outlet />
      </PageWrapper>
    </MainWrapper>
  )
}

export default MainLayout