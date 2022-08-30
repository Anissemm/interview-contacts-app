import { forwardRef, PropsWithChildren, RefAttributes } from 'react'
import styled from 'styled-components'


const StyledButton = styled.button`
    padding: 8px 20px;
    position: relative;
    width: 100%;
    border-radius: 10px;
    font-weight: bold;
    font-size: 20px;
    background-color: rgba(101, 113, 138, 0.5);
    border: 0;
    color: #eee;
    transition: all 100ms ease-in;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: rgba(101, 113, 138, 0.8);
    }
`

const Loader = styled.div<{ visible: boolean }>`
  display: inline-block;
  position: relative;
  width: 20px;
  height: 20px;
  opacity: ${props => props.visible ? 1 : 0};
  right: -15px;
  top: -1px;

    div {
    position: absolute;
    border: 2px solid #fff;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    div:nth-child(2) {
      animation-delay: -0.5s;
    }

@keyframes lds-ripple {
  0% {
    top: 10px;
    left: 10px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  
  4.9% {
    top: 10px;
    left: 10px;
    width: 0;
    height: 0;
    opacity: 0;
  }

  5% {
    top: 10px;
    left: 10px;
    width: 0;
    height: 0;
    opacity: 1;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 20px;
    height: 20px;
    opacity: 0;
  }
}
`
const ChildrenWrapper = styled.span`
    position: relative;
    left: 10px;
`

interface ButtonProps extends PropsWithChildren<RefAttributes<HTMLButtonElement>> {
    [key: string]: any
    type: 'submit' | 'button'
    isLoading?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ type = 'button', children, isLoading = false, ...props }, ref) => {
    return (
        <StyledButton
            ref={ref}
            type={type}
            {...props}
        >
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <Loader visible={isLoading}>
                <div />
                <div />
            </Loader>
        </StyledButton>
    )
})

export default Button