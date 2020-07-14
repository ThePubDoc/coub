import React from 'react'

import { StyledForm, StyledLabel, StyledInput, StyledFormItem } from './AccountEdit.style';

const AccountEdit = () => {
    return (
        <StyledForm>

            <StyledFormItem>
                <StyledLabel>
                    Email
                </StyledLabel>

                <StyledInput type = "email" placeholder = "email"/>
            </StyledFormItem>
            
        </StyledForm>
    )
}

export default AccountEdit
