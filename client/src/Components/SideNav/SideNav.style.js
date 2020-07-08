import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const StyledSidenav = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 16vw;
    height: 96vh;
    background-color: #f7f7f7;
    text-align: center;
    overflow: scroll;

    h3 {
        margin: 1rem;
        color: #aaaaaa;
        text-align: left;
        font-size: 1.2rem;
    }
`

export const StyledSideNavItems = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem .5rem;

    &:hover {
        cursor: pointer;
        background-color: white;
    }

    p {
        margin: 0 .5rem;
        font-size: 1rem;
        color: black;
        font-weight: 600;
        text-align: left;
    }
`

export const StyledIcons = styled(FontAwesomeIcon)`
    min-width: 10%;
`

export const StyledHeadings = styled.p`
    color: #aaaaaa;
`

export const StyledCommunity = styled(StyledHeadings)`
    font-size: 1rem;
    text-align: left;
    margin : .5rem;
`

export const StyledCommunitiesIcons = styled(StyledSideNavItems)`
    padding : .5rem;
`

export const StyledImages = styled.img.attrs(
        (props) => ({'src' : props.src})
    )`

    border-radius: 5px;
    width: 12%;
`

export const StyledLine = styled.div`
    content: "";
    margin: auto;
    width: 90%;
    height: 1px;
    background-color: #aaaaaa;
`