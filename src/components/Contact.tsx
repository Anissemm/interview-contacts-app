import React from 'react'
import styled from 'styled-components'
import { Contact as ContactType } from '../store'
import DeleteConfirmModal from './DeleteConfirmModal'
import UpdateContactModal from './UpdateContactModal'
import Icon from './Utility/Icon'

const ContactItem = styled.li`
  width: calc(100% - 120px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1.5px solid var(--color-5);
  margin-bottom: 8px;
  border-radius: 8px;
  padding: 8px 20px;

  a {
    color: #A4B6D9;
  }

  a:hover {
    color: #828faa;
  }
`
const ContactInfo = styled.div`
  flex: 1 0 85%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`
const ContactButtons = styled.div`
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  flex: 0 1 12%;
`

const ContactInfoItem = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 5px;
`

interface ContactProps {
  data: ContactType
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  return (
    <ContactItem key={data.id}>
      <ContactInfo>
        <ContactInfoItem title={`Fullname: ${data.name} ${data.lastname}`}>
          <Icon size={14} gap={5} color='#A4B6D9' name='face' />
          <span>{`${data.name} ${data.lastname}`}</span>
        </ContactInfoItem>
        <ContactInfoItem title={`Phone number: ${data.phoneNumber}`}>
          <Icon size={14} gap={5} color='#A4B6D9' name='phone_iphone' />
          <a href={`tel:${data.phoneNumber}`}>{data.phoneNumber}</a>
        </ContactInfoItem>
        <ContactInfoItem title={`Email: ${data.email}`}>
          <Icon size={14} gap={5} color='#A4B6D9' name='alternate_email' />
          <a href={`mailto:${data.email}`}>{data.email}</a>
        </ContactInfoItem>
      </ContactInfo>
      <ContactButtons>
          <UpdateContactModal {...data} />
          <DeleteConfirmModal fullname={`${data.name} ${data.lastname}`} contactId={data.id}/>
      </ContactButtons>
    </ContactItem>
  )
}

export default Contact