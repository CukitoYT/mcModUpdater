import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import JSZip from 'jszip';

async function getModFiles(
	modID,
	mcVersion,
	modVersion,
	loader = 'Fabric' || 'Forge' || 'Quilt'
) {
	const options = {
		method: 'GET',
		url: `https://api.curseforge.com/v1/mods/${modID}/files`,
		headers: {
			Accept: 'application/json',
			'x-api-key': import.meta.env.VITE_X_CURSEFORGE_API_KEY,
		},
	};

	try {
		const response = await axios.request(options);
		const files = response.data.data; // Asegúrate de que esto es un array
		const file = files.find(
			(item) =>
				item.gameVersions.includes(mcVersion) &&
				item.gameVersions.includes(loader)
		);
		return file ? file.downloadUrl : 'No file found';
	} catch (error) {
		console.error(error);
		return 'Error fetching data';
	}
}

function App() {
	const [modFileUrl, setModFileUrl] = useState('');

	useEffect(() => {
		getModFiles(303119, '1.14', '1.0.0', 'Fabric', 'Client').then(
			setModFileUrl
		);
	}, []);

	return (
		<>
			<a
				href={modFileUrl}
				target="_blank"
			>
				<button>Ir al archivo</button>
			</a>
		</>
	);
}

export default App;
