import React, { useContext, useState, useEffect } from 'react';

import { StyledForm, StyledFormItem, StyledLabel, StyledInput,
        StyledTextArea } from './Edit.style';
import UserContext from '../../Context/UserContext';

const Edit = () => {

    const { user } = useContext(UserContext);

    return (
        <StyledForm>
            <StyledFormItem>
                <StyledLabel>Title</StyledLabel>
                <StyledInput type = "text" value = { user.userData.username }/>
            </StyledFormItem>

            <StyledFormItem>
                <StyledLabel>Description</StyledLabel>
                <StyledTextArea/>
            </StyledFormItem>
        </StyledForm>
    )
}

export default Edit
