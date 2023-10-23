import {BlockEvent, Finding, HandleBlock, HandleTransaction, TransactionEvent} from "forta-agent";
import axios from 'axios';
import {getSecrets} from './storage';

const initialize = async () => {
		// do some initialization on startup e.g. fetch data
		const secrets = await getSecrets();
		const jsonRPCURL = secrets.jsonRPCURL;

		// Make an Ethereum JSON-RPC call to get the chain ID
		try {
				const response = await axios.post(jsonRPCURL, {
						jsonrpc: '2.0',
						method: 'eth_chainId',
						params: [],
						id: 1,
				});

				if (response.data && response.data.result) {
						console.log('successfully initialized bot')
						return {};
				} else {
						console.log('Unable to retrieve chain ID.');
				}
		} catch (error: any) {
				throw new Error('Error making JSON-RPC call: ' + error.message);
		}
}

const handleBlock: HandleBlock = async (blockEvent: BlockEvent) => {
		const findings: Finding[] = [];
		// detect some block condition
		return findings;
}
const handleTransaction: HandleTransaction = async (
	txEvent: TransactionEvent
) => {
		const findings: Finding[] = [];
		return findings
}
// const handleAlert: HandleAlert = async (alertEvent: AlertEvent) => {
//   const findings: Finding[] = [];
//   // detect some alert condition
//   return findings;
// }

// const healthCheck: HealthCheck = async () => {
//   const errors: string[] = [];
// detect some health check condition
// errors.push("not healthy due to some condition")
// return errors;
// }

export default {
		initialize,
		handleTransaction,
		// healthCheck,
		handleBlock,
		// handleAlert
};
