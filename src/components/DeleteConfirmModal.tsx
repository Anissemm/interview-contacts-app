import { useState } from 'react'
import styled from 'styled-components'
import Modal from './Modal'
import 'yup-phone'
import { useDeleteContactMutation } from '../store'
import Icon from './Utility/Icon'
import SrOnly from './Utility/SrOnly'

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
    margin-right: 5px;
  }

  &:hover, &:focus {
    background-color: ${props => props.hoverBgColor};  
  }
`

const ButtonsWrapper = styled.div`
display: flex;
width: calc(100% - 40px);
position: absolute;
bottom: 20px;
padding: 20px;
justify-content: flex-end;
`
const Text = styled.p`
    color: #65718A;
    padding: 0 20px;
    font-size: 19px;
`

const DeleteConfirmModal: React.FC<{ fullname: string, contactId: number }> = ({ fullname, contactId }) => {
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
    const [deleteContact] = useDeleteContactMutation()

    return (<>
        <Button
            title='Delete Contact'
            color="#ce5d5d"
            hoverBgColor={'rgba(206, 93, 93, 0.3)'}
            onClick={async () => setShowDeleteConfirmModal(true)}
        >
            <SrOnly>Delete Contact</SrOnly>
            <Icon name='delete' />
        </Button>
        <Modal title='Delete Contact' setShow={setShowDeleteConfirmModal} show={showDeleteConfirmModal} width={450} height={350}>
            <Text>Are you sure that you want to delete the contact "<b>{fullname}</b>" permanently?</Text>
            <ButtonsWrapper>
                <Button
                    color='#7aa64e'
                    hoverBgColor='rgba(108, 140, 76, 0.2)'
                    onClick={async () => {
                        await deleteContact(contactId)
                        setShowDeleteConfirmModal(false)
                    }}>
                    Yes, I'm sure</Button>
                <Button
                    color='#ce5d5d'
                    hoverBgColor='rgba(206, 93, 93, 0.3)'
                    onClick={() =>
                        setShowDeleteConfirmModal(false)}
                >
                    No, cancel
                </Button>
            </ButtonsWrapper>
        </Modal>
    </>
    )
}

export default DeleteConfirmModal