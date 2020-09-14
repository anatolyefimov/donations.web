import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {  
    Panel,
    Div,
    PanelHeader,
    Button
} from '@vkontakte/vkui';

import Snippet from 'components/Snippet'

import './Result.css'

const Result = ({ id, snippet, go }) => {
    return (
        <Panel id={id}>
            <PanelHeader>
                Сниппет
            </PanelHeader>
            <Div className='Result'>
                <Snippet data={snippet} />
                <Button onClick={go} data-to='donations'>
                    Перейти к сборам
                </Button>
            </Div>
            
        </Panel>
    )
}

Result.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default Result;
