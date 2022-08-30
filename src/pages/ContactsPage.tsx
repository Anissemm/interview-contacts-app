import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import AddNewModal from '../components/AddNewModal'
import Contact from '../components/Contact'
import { Contact as ContactType, getUser, useAppSelector, useGetContactsQuery } from '../store'
import Input from '../components/Input'

const Wrapper = styled.section`
    color: #eee;
    width: 100%;
`
const ContactsHeader = styled.header`
  padding: 0 40px;
  font-size: 20px;
  max-width: 1024px;
  margin: auto;

  @media screen and (min-width: 640px){
    font-size: 24px;
  }
`
const ContactHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  max-width: 1024px;
  height: calc(100vh - 290px);
  margin: auto;
  overflow-y: auto;
`
const ContactSearch = styled.div`
  width: 100%;
  max-width: 944px;
  margin: auto;
  margin-bottom: 10px;
`

const ContactsPage = () => {
  const user = useAppSelector(getUser)
  const [searchValue, setSearchValue] = useState('')

  const { data: contacts } = useGetContactsQuery(searchValue)

  return (
    <Wrapper>
      <ContactsHeader>
        <ContactHeaderRow>
          <p>Hello, {user?.name}!</p>
          <AddNewModal />
        </ContactHeaderRow>
        <ContactHeaderRow>
          <ContactSearch>
            <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
              e.preventDefault()

            }}>
              <Input
                label='Search'
                type='search'
                name='search'
                id='search'
                value={searchValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchValue(e.target?.value)}
              />
            </form>
          </ContactSearch>
        </ContactHeaderRow>
      </ContactsHeader>
      <ContactList>
        {contacts?.length ? contacts?.map((contact: ContactType) => {
          return <Contact key={contact.id} data={contact} />
        }) : 'No Data'}
      </ContactList>
    </Wrapper >
  )
}

export default ContactsPage