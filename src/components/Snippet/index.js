import React, { useState } from 'react';
import PropTypes, { number } from 'prop-types';
import accounting from 'accounting';

import {  
    Div, 
    Button,
    Card,
    Banner,
    Separator,
    InfoRow,
    Progress
} from '@vkontakte/vkui';

import './Snippet.css'

const Snippet = ({ data }) => {
    let rightSubheader = '';
    
    if (data.type === 'target' && data.radio === 'finite' && data.date) {
        let diff = (new Date(data.date)) - (new Date()) 
        let days = Math.max(0, Math.floor(diff / (60*60*24*1000))) + 1
        let suffix;
        if (days % 100 > 10 && days % 100 < 20) {
            suffix = 'дней'
        } else if (days % 10 === 1){
            suffix = 'день'
        } else if (days % 10 >= 2 && days % 10 <= 4) {
            suffix = 'дня'
        } else {
            suffix = 'день'
        }

        suffix = ' ' + suffix
        rightSubheader = ' • Закочится через ' + Math.floor(days) + suffix
    }
    if (data.type === 'regular') {
        rightSubheader = ' • Помощь нужна каждый месяц'
    }

    let currentSum = Math.floor(Math.random()*parseInt(data.sum))
    return (
        <Card className='Snippet' mode='outline'>
            <img 
                src={data.imageSrc} 
                className='Snippet__image'
            />
            <section className='Snippet__info'>
                <h1>
                    {data.name}
                </h1>
                <h2>
                    Матвей Правосудов{rightSubheader}
                </h2>
                <Separator wide/>
                <InfoRow 
                    header={`Собрано ${accounting.formatNumber(parseInt(currentSum), 0, ' ')} ₽ из ${accounting.formatNumber(data.sum, 0, ' ')} ₽`} 
                    className='Snippet__progress'
                >
                    <Progress value={currentSum / parseInt(data.sum)*100} />
                </InfoRow>
            </section>

        </Card>
    )
}

export default Snippet