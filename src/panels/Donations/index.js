import React from 'react';
import PropTypes from 'prop-types';

import { 
    Button, 
    Panel, 
    PanelHeader,
    Placeholder
} from '@vkontakte/vkui';

import 'components/Snippet'

import './Donations.css'
import Snippet from 'components/Snippet';
const Donations = ({ id, go, snippets }) => {
    return (
        <Panel id={id} centered={snippets.length === 0 }>
            <PanelHeader>
                Пожертвования
            </PanelHeader>
            
            {
                snippets.length === 0 ? (
                    <Placeholder 
                        action={<Button onClick={go} data-to='collecting-type'> Создать сбор </Button>}
                    >
                        У вас пока нет сборов. <br /> Начните доброе дело.
                    </Placeholder>
                ) : (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '800px',
                        margin: '0 auto'
                    }}>
                        <Button onClick={go} data-to='collecting-type' style={{margin: 20}}> Создать сбор </Button>
                        {snippets.map(snippet => <Snippet data={snippet} />)}
                    </div>
                )
            }
        </Panel>
    )
}

Donations.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default Donations;