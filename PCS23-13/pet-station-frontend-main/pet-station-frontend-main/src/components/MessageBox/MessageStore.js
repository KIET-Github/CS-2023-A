// importing helper functions
import { getTime } from '../../utilities/helper';

// message store class
export default class MessageStore {
	constructor(socket) {
		this.messagesMap = new Map();
		this.socket = socket;
	}

	sendMessage(username, message) {
		// save message
		const payload = {
			id: new Date().getTime().toString(),
			message,
			type: 'sent',
			time: getTime(new Date()),
		};
		this.saveMessage(username, payload);

		// now we just need to send message to specified username
		this.socket.emit('message', {
			to: username,
			content: message,
		});
	}

	saveMessage(username, message) {
		// if username is not present in map
		if (this.messagesMap.has(username)) {
			const messages = this.messagesMap.get(username);
			messages.push(message);

			this.messagesMap.set(username, messages);
		} else {
			const messages = [];
			messages.push(message); // add message

			this.messagesMap.set(username, messages); // add data in map
		}
	}

	getMessages(username) {
		// return messages of username
		const messages = this.messagesMap.get(username);
		return messages;
	}
}
