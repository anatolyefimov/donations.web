import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {  
    Panel, 
    PanelHeader,
    FormLayout,
    PanelHeaderBack,
    Div,
    Input, 
    File,
    Select, 
    Button,
    FormStatus
} from '@vkontakte/vkui';
import Icon56GalleryOutline from '@vkontakte/icons/dist/56/gallery_outline';
import Icon24DismissOverlay from '@vkontakte/icons/dist/24/dismiss_overlay';

import './CollectingForm.css'

const CollectingForm = ({id, go, type, currentSettings, setCurrentSettings, setSnippets, user}) => {
    const [imageSrc, setImageSrc] = useState(currentSettings.imageSrc);
    const [name, setName] = useState(currentSettings.name);
    const [sum, setSum] = useState(currentSettings.sum);
    const [inputStatus, setInputStatus] = useState({});
    const [formStatus, setFormStatus] = useState('default')
    
    const handleImageChange = event => {
        var reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result);
        reader.readAsDataURL(event.target.files[0]);
    }

    const handleImageDelete = () => {
        setImageSrc(null)
    }

    const saveSettings = () => {
        setCurrentSettings(prevState => ({
            ...prevState,
            name: name,
            sum: sum,
            imageSrc: imageSrc
        }))
    }

    const handleGo = event => {
        setInputStatus({
            sum: !sum ? 'error' : 'default',
            name: !name ? 'error' : 'default',
            image: !imageSrc ? 'error' : 'default'
        })

        if (!sum || !name || !imageSrc) {
            setFormStatus('error');
            return;
        }
        go(event);
        saveSettings();
        if (currentSettings.type === 'regular') {
            setSnippets(prevSnippets => prevSnippets.concat({
                ...currentSettings,
                name: name,
                sum: sum,
                imageSrc: imageSrc,
                user: user
            }))
            setCurrentSettings({})
        }
    }

    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack onClick={go} data-to='collecting-type'/>}
            >
                {type === 'target' ? 'Целевой сбор' : 'Регулярный сбор'}
            </PanelHeader>
            <FormLayout>
                {
                    imageSrc ? (
                        <Div className='cover-container'>
                            <img 
                                alt='Обложка'
                                src={imageSrc} 
                                className='cover-container__cover'
                            />
                            <button 
                                className='cover-container__delete'
                                onClick={handleImageDelete}
                            >
                                <Icon24DismissOverlay />
                            </button>
                        </Div>
                        
                    ) : (
                        <File 
                            before={
                                <Icon56GalleryOutline 
                                    width={22} 
                                    height={22}
                                    style={{height: 22, marginRight: 10,  color: inputStatus.image === 'error' ? '#e64646' : '#3F8AE0'}}
                                />
                            }
                            mode='overlay_priamry'
                            className={`cover-input ${inputStatus.image === 'error' && 'cover-input_error'}`}
                            accept="image/*"
                            onChange={handleImageChange}
                        >
                            Загрузить обложку
                        </File>
                    )
                }

                <Input 
                    top='Название сбора' 
                    placeholder='Название сбора'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    status={inputStatus.name}
                />
                <Input 
                    top='Сумма, ₽' 
                    placeholder='Сколько нужно собрать?'
                    pattern='\d*'
                    type='number'
                    value={sum}
                    onChange={(e) => setSum(e.target.value)}
                    status={inputStatus.sum}
                />
                <Input 
                    top='Цель' 
                    placeholder='Например, лечение человека'
                />
                <Input 
                    top='Описание' 
                    placeholder='На что пойдут деньги и как они кому-то помогут?'
                />
                <Select top='Куда получать деньги'>
                    <option value='stub'>Счёт VK Pay • 1234</option>
                </Select>
                {
                    type === 'regular' &&
                    <Select top='Автор'>
                        <option value='user'>{user}</option>
                    </Select>
                }
                <FormStatus style={{display: formStatus !== 'error' ? 'none' : 'block' }}mode={formStatus} header='Не все обязательные поля заполнены'>
                </FormStatus>
                
                <Button 
                    size='l'
                    onClick={handleGo}
                    data-to={type === 'target' ? 'extra-settings' : 'result'}
                >
                    {currentSettings.type === 'target' ? 'Далее' : 'Создать сбор'}
                </Button>
            </FormLayout>
        </Panel>
    );
}

CollectingForm.propTypes = {
    id: PropTypes.string.isRequired,
    go: PropTypes.func.isRequired,
    type: PropTypes.oneOf(['target', 'regular'])
};

export default CollectingForm;