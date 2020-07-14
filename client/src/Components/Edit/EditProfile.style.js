import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { MdSettings, MdKeyboardArrowRight } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

export const StyledGridContainer = styled.div`
    display: grid;
    grid-template-columns: 40% auto;
    width: 50%;
    margin: 3rem auto;
    column-gap: 3rem;
`

export const StyledGridColumn1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content : flex-start;
`

export const StyledColumn1List = styled.div`
    display: flex;
    flex-direction: column;
`

export const StyledColumn1ListItem = styled(Link)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 0;
    align-items: center;

    div {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    p {
        font-size: 1.2rem;
        margin: 0 .5rem;
    }
`

export const StyledLink = styled(Link)`
    
`

export const StyledSettingsIcon = styled(MdSettings)`
    border: 1px solid #cccccc;
    background-color: #cccccc;
    color: white;
    font-size: 30px;
    border-radius : 5px;
` 

export const StyledArrowIcon = styled(MdKeyboardArrowRight)`
    color: #a7a7a7;
    font-size: 30px;
`

export const StyledPlusIcon = styled(FaPlus)`
    border: 1px solid #cccccc;
    background-color: #cccccc;
    color: white;
    font-size: 30px;
    border-radius : 5px;
`

export const StyledUserDp = styled.img.attrs(
        props => ({
            src : props.src
        })
    )`
    border-radius: 50%;
    height: 30px;
`