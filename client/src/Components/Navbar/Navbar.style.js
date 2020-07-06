import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

export const StyledNav =  styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 2.5rem;
    padding: 1rem;
    border-bottom: 1px solid #f7f7f7;
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 100;
`;

export const StyledNavbarElementsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 2.5rem;

    a {
        height: 2.5rem;
    }

    p {
        margin: 0 .5rem;
    }
`;

export const StyledImg = styled.img.attrs(
        props => ({'src' : props.src})
    )`

    height: 100%;
    margin: 0 1rem;
    position: relative;
`;

export const StyledSearchBar = styled.div`
    position: relative;
    margin: 0 .5rem;
`;

export const StyledSearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    top: .6rem;
    left: .5rem;
    font-size: small;
`;

export const StyledInput = styled.input.attrs(
        props => ({ 
            type : props.type,
            placeholder : props.placeholder
        })
    )`
    border: 2px solid #eaeaea;
    background-color: #eaeaea;
    padding: .5rem;
    width: 20rem;
    padding-left: 2.5rem;
    border-radius: 6px;

    &:hover {
        border: 2px solid blue;
    }

    &:focus {
        background-color: white;
        border: 2px solid blue;
    }
`;

export const StyledSubMenu = styled.div`
    position: absolute;
    top: 2rem;
    display: none;
    background-color: white;
    z-index: 1;
    width: 10rem;
    
    li {
        width: 100%;

        &:hover {
            background-color: #eaeaea;
        } 
    }

    p {
        cursor: pointer;
        margin: 1rem;
        padding: .5rem 0;
    }
`

export const StyledDropdown = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    &:hover ${StyledSubMenu} {
        display: block;
        box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
        border-radius: 5px;
    }
`

export const StyledPlusIcon = styled(FontAwesomeIcon)`
    border: 1px solid black;
    padding: .5rem;
    border-radius: 40%;
`

export const StyledUserIcons = styled(FontAwesomeIcon)`
    margin: 0 1rem;
    font-size: 1.5rem;
`

export const StyledUserDropdown = styled.div`
    position: absolute;
    top: 2.5rem;
    right: 1rem;
    z-index: 1;
    display: none;
    box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.75);
    border-radius: 5px;
    width: 15rem;
    background-color: white;

    ul li {
        margin: 1rem 0;

        &:hover {
            background-color: #eaeaea;
        }

        a {
            height: auto;
        }

        p {
            cursor: pointer;
        }
    }

`

export const StyledUser = styled.div`
    position: relative;
    
    &:hover ${StyledUserDropdown} {
        display: block;
    }
`

export const StyledUserDp = styled.img.attrs(
        props => ({
            src : props.src
        })
    )`
    border-radius: 50%;
    height: -webkit-fill-available;
`

export const StyledLogout = styled.div`
    padding: .5rem 0;
    margin: 0 .5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const StyledLogoutIcon = styled(FontAwesomeIcon)`
    margin: 0 1rem;
    font-size: 1.5rem;
`

export const StyledUsername = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0.5rem 0;
`

export const StyledDropdownDp = styled.img.attrs(
        (props => ({'src' : props.src}))
    ) `
    height: 2rem;
    border-radius: 50%;
    margin : 0 1rem;
`