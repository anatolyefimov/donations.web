import React from 'react';
import PropTypes from 'prop-types';

import {  
    Panel, 
    PanelHeader,
    Group,
    Banner,
    PanelHeaderBack,
} from '@vkontakte/vkui';
import Icon28CalendarOutline from '@vkontakte/icons/dist/28/calendar_outline';

import {ReactComponent as Icon24Aim} from 'img/Icon24Aim.svg';

const CollectingType = ({ id, go, setCurrentSettings }) => {
    const iconColor = '#3F8AE0'

    const setType = (event, type) => {
        go(event); 
        setCurrentSettings(prevState => ({...prevState, type: type}))
    }

    return ( 
        <Panel id={id} centered>
            <PanelHeader
                left={<PanelHeaderBack onClick={go} data-to='donations'/>}
            >
                Тип сбора
            </PanelHeader>
            <Group>
                <Banner
                    before={
                        <Icon24Aim
                            width={24} 
                            height={24}
                            style={{
                                color: iconColor
                            }}
                        />
                    }
                    header='Целевой сбор' 
                    subheader='Когда есть определенная цель'
                    asideMode="expand"
                    data-to='collecting-form'
                    onClick={e => setType(e, 'target')}
                />
                <Banner 
                    before={
                        <Icon28CalendarOutline  
                            width={24} 
                            height={24}
                            style={{
                                color: iconColor
                            }}
                        />
                    }
                    header='Регулярный сбор' 
                    subheader='Если помощь нужная ежемесячно'
                    asideMode="expand"
                    data-to='collecting-form'
                    onClick={e => setType(e, 'regular')}
                />
            </Group>
        </Panel>
    )
}

CollectingType.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired
};

export default CollectingType;