import {
	IDataObject,
	INodeExecutionData,
	ICredentialDataDecryptedObject,
} from "n8n-workflow";

/**
 * Standard way of building the MongoDB connection string, unless overridden with a provided string
 *
 * @param {ICredentialDataDecryptedObject} credentials MongoDB credentials to use, unless conn string is overridden
 */
export function buildParameterizedConnString(
	credentials: ICredentialDataDecryptedObject
): string {
	if (credentials.port) {
		return `mongodb://${credentials.user}:${credentials.password}@${credentials.host}:${credentials.port}`;
	} else {
		return `mongodb+srv://${credentials.user}:${credentials.password}@${credentials.host}`;
	}
}

/**
 * Returns of copy of the items which only contains the json data and
 * of that only the define properties
 *
 * @param {INodeExecutionData[]} items The items to copy
 * @param {string[]} properties The properties it should include
 * @returns
 */
export function getItemCopy(
	items: INodeExecutionData[],
	properties: string[]
): IDataObject[] {
	// Prepare the data to insert and copy it to be returned
	let newItem: IDataObject;
	return items.map((item) => {
		newItem = {};
		for (const property of properties) {
			if (item.json[property] === undefined) {
				newItem[property] = null;
			} else {
				newItem[property] = JSON.parse(JSON.stringify(item.json[property]));
			}
		}
		return newItem;
	});
}
