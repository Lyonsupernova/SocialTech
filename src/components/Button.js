import React from 'react';
import PropTypes from 'prop-types';
import appTheme from '../theme/appThemeMui';
import Button from '@mui/material/Button';
import { ThemeProvider, styled } from '@mui/material/styles';

const CustomButtonElement = styled(Button)(({appTheme}) => ({
    color: appTheme.palette.secondary
}))

const CustomButton = ({ text }) => {
    return (
        <ThemeProvider theme={appTheme}>
            <CustomButtonElement>{text}</CustomButtonElement>
        </ThemeProvider>
    );
};

CustomButton.propTypes = {
    text: PropTypes.string
};

export default CustomButton;