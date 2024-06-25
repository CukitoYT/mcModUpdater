import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

async function getModFiles(
	modID,
	mcVersion,
	modVersion,
	loader = 'Fabric' || 'Forge' || 'Quilt',
	loaderPlace = 'Client' || 'Server'
) {
	const options = {
		method: 'GET',
		url: `https://api.curseforge.com/v1/mods/${modID}/files`,
		headers: {
			Accept: 'application/json',
			'x-api-key':
				'$2a$10$vZraELhJUVjlB.f16ndNAujFMUPtAmNuQlSNDI14Ilbk5EANECG3e',
		},
	};

	try {
		const response = await axios.request(options);
		const files = response.data.data; // Asegúrate de que esto es un array
		const file = files.find(
			(item) =>
				item.gameVersions.includes(mcVersion) &&
				item.gameVersions.includes(loader) &&
				item.gameVersions.includes(loaderPlace)
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
		getModFiles(303119, '1.20.4', '1.0.0', 'Fabric', 'Client').then(
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
