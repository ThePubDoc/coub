import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledOverlay = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #7f7f7f79;
    text-align: center;
    top: 0;
    left: 0;
`

export const StyledClose = styled.div`
    width: 100%;
    height: 100%;
    opacity: 0;
`

export const StyledForm = styled.form`
    position: absolute;
    top: 30%;
    left: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    margin: auto;
    justify-content: center;
    background-color: white;
    padding: 2rem;
    border-radius: 10px;

    h1 {
        margin: 1rem 0;
    }
`

export const StyledInput = styled.input`
    margin: .5rem 0;
    padding: .5rem;
`

export const StyledButton = styled.button`
    border: none;
    background-color: blue;
    border-radius: 5px;
    color: white;
    padding: .5rem 1rem;
    margin: .5rem;
`