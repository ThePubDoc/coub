import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

export const StyledCoubHero = styled.div`
    margin: 3rem 0;
`

export const StyledVideo = styled.video`
    width: 100%;
    border-radius: 5px;
`

export const StyledCoubDetailsHero = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
`

export const StyledCreatorDetails = styled.div`
    display: grid;
    grid-template-columns: 3.5rem auto;
    align-items: center;
    column-gap: .5rem;
`

export const StyledDpLink = styled(Link)`
    grid-row-start: 1;
    grid-row-end: 3;
`

export const StyledDp = styled.img.attrs(
        (props => ({'src' : props.src}))
    )`
    width: 100%;
    border-radius: 50%;
`

export const StyledCreator = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    p {
        font-size: 1rem;
        color: #999999;
    }

    h3 {
        font-size: 1rem;
        margin: 0 .5rem;
    }
`

export const StyledStatsHero = styled.div`
    display: flex;
    flex-direction: row;
`

export const StyledStat = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 .5rem;

    p {
        margin: .5rem 0;
    }
`

export const StyledTagsViewsHero = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

export const StyledViews = styled.div`
    margin-left: 2rem;
    
    p {
        color: #999999;
        font-size: 1.2rem;
    }
`

export const StyledTags = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    /* flex-wrap: wrap; */
    overflow: hidden;
`

export const StyledTag = styled.p`
    background-color: #f7f7f7;
    padding: .5rem 1rem;
    color : gray;
    margin: 0 .2rem;
    border-radius: 10px; 
`

