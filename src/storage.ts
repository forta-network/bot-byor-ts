import axios, { AxiosRequestConfig } from 'axios';

import * as forta_agent from 'forta-agent';

const owner_db = 'https://research.forta.network/database/owner/';

interface Secrets {
		jsonRPCURL: string;
		// Add other properties from your secrets.json if needed
}

async function getToken(): Promise<string> {
		const tk = await forta_agent.fetchJwt({});
		return `Bearer ${tk}`;
}

async function loadSecrets(key: string): Promise<Secrets> {
		try {
				const token = await getToken();
				const headers: AxiosRequestConfig = {
						headers: {
								Authorization: token,
						},
				};

				const response = await axios.get(`${owner_db}${key}`, headers);
				if (response.status === 200) {
						return response.data as Secrets;
				} else {
						throw new Error(`Error loading ${key}`);
				}
		} catch (error: any) {
				throw new Error(`Error loading ${key}: ${error.message}`);
		}
}

export async function getSecrets(): Promise<Secrets> {
		return loadSecrets('secrets.json');
}
