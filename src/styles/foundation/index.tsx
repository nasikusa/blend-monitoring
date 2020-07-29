import React from 'react';
import { css, Global } from '@emotion/core';
import reset from './reset';
import base from './base';
import fonts from './fonts';

const foundation = css`
${fonts}
${reset}
${base}
`;

export default () => {
    return(
        <Global styles={foundation} />
    );
}