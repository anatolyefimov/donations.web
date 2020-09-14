import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {  
    Panel, 
    PanelHeader,
    FormLayout,
    PanelHeaderBack,
    Input, 
    Radio,
    FormLayoutGroup,
    Select, 
    Button
} from '@vkontakte/vkui';

const ExtraSettings = ({ id, go, setSnippets, setCurrentSettings, currentSettings, user }) => {
    let now = new Date()
    now = now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2);
    const [date, setDate] = useState(now);
    const [radio, setRadio] = useState('finite');
    
    const handleCreateSnippet = (event) => {
        go(event);
        setSnippets(prevSnippets => prevSnippets.concat({
            ...currentSettings,
            date: date,
            radio: radio,
            user: user
        }))
        setCurrentSettings({});
    }

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={go} data-to='collecting-form'/>}
            >
                Дополнительно
            </PanelHeader>
            <FormLayout>
                <Select top='Автор'>
                    <option value='user'>{user}</option>
                </Select>
                <FormLayoutGroup top="Сбор завершится">
                    <Radio 
                        name="type"
                        checked={radio === 'infinite'}
                        value='infinite'
                        onChange={e => {setRadio(e.target.value)}}
                    >
                        Когда соберем сумму
                    </Radio>
                    <Radio 
                        name="type" 
                        value='finite' 
                        checked={radio === 'finite'}
                        onChange={e => {setRadio(e.target.value)}}
                    >
                        В опреденную дату
                    </Radio>
                </FormLayoutGroup>
                <Input 
                    top='Дата окончания'
                    placeholder='Выберете дату'
                    type='date'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    disabled={radio === 'infinite'}
                    min={now}
                />
                <Button 
                    size='l'
                    onClick={handleCreateSnippet}
                    data-to='result'
                >
                    Создать сбор
                </Button>
            </FormLayout>
        </Panel>
    );
}

ExtraSettings.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
};

export default ExtraSettings;