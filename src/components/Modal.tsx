import { AnimatePresence } from 'framer-motion'
import React, { PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import Icon from './Utility/Icon'
import SrOnly from './Utility/SrOnly'

const ModalWrapper = motion(styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`)

const ModalBackground = styled.div`
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    transition: all 300ms ease-out;
    
    @supports (backdrop-filter: blur(1px)) {
        backdrop-filter: blur(5px);      
    }
`

const ModalHeader = styled.header`
    font-family: 'Aboreto';
    color: #65718A;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;

    @media screen and (min-width: 400px){
            font-size: 16px;
        }
`

const CloseButton = styled.button`
    background-color: transparent;
    color: #65718A;
    border: 0;
    & span {
        font-size: 28px;

        @media screen and (min-width: 400px){
            font-size: 38px;
        }
    }
`

const ModalSection = styled.section<{ width: number, height: number }>`
    background-color: #201a23;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: ${props => `${props.width}px`};
    max-height: ${props => `${props.height}px`};
    font-family: 'Quicksand', 'Arial', sans-serif;
`

interface ModalProps extends PropsWithChildren {
    title?: string
    show?: boolean
    width?: number
    height?: number
    setShow: (show: boolean | ((prevShow: boolean) => boolean)) => void
}

const Modal: React.FC<ModalProps> = ({ title, setShow, show, width = 700, height = 500, children }) => {

    return createPortal(
        <AnimatePresence mode='sync'>
            {show ?
                <ModalWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role='dialog'>
                    <ModalBackground onClick={() => setShow(false)} />
                    <ModalSection width={width} height={height}>
                        <ModalHeader>
                            <h2>{title}</h2>
                            <CloseButton onClick={() => setShow(false)}>
                                <SrOnly>Close</SrOnly>
                                <Icon name='close' />
                            </CloseButton>
                        </ModalHeader>
                        <div>
                            {children}
                        </div>
                    </ModalSection>
                </ModalWrapper> : null}
        </AnimatePresence>, document.getElementById('root')!)

}

export default Modal