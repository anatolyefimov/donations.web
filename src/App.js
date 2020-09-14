import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import View from '@vkontakte/vkui/dist/components/View/View';
import '@vkontakte/vkui/dist/vkui.css';

import Donations from 'panels/Donations';
import CollectingType from 'panels/CollectingType';
import CollectingForm from 'panels/CollectingForm';
import ExtraSettings from 'panels/ExtraSettings';
import Result from 'panels/Result'

const App = () => {
	const [activePanel, setActivePanel] = useState('donations');
	const [fetchedUser, setUser] = useState(null);
	const [snippets, setSnippets] = useState([]);
	const [currentSettings, setCurrentSettings] = useState({
		type: null
	})

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
		}
		fetchData();
	}, []);

	const go = e => {
		setActivePanel(e.currentTarget.dataset.to);
	};

	return (
		<View activePanel={activePanel}>
			<Donations 
				id='donations' 
				go={go}
				snippets={snippets}
			/>
			<CollectingType 
				id='collecting-type' 
				go={go}
				setCurrentSettings={setCurrentSettings}
			/>
			<CollectingForm 
				id='collecting-form' 
				go={go} 
				type={currentSettings.type}
				currentSettings={currentSettings}
				setCurrentSettings={setCurrentSettings}
				setSnippets={setSnippets}
			/>
			<ExtraSettings 
				id='extra-settings' 
				go={go} 
				currentSettings={currentSettings}
				setCurrentSettings={setCurrentSettings}
				setSnippets={setSnippets}
			/>
			<Result 
				id='result' 
				snippet={snippets[snippets.length - 1]}
				go={go}
			/>
		</View> 
	);
}

export default App;

