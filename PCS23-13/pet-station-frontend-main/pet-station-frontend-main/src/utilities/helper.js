// HELPER FUNCTION

// importing libraries
import axios from 'axios';
import { sha256 } from 'crypto-js';

// handle user login
export function handleLogin(payload) {
	const response = axios
		.post(`${process.env.REACT_APP_SERVER}/auth/login`, payload)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// handle user signup
export function handleSignup(payload) {
	const response = axios
		.post(`${process.env.REACT_APP_SERVER}/auth/signup`, payload)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// fetch user data
export async function fetchUserData(token) {
	const options = {
		method: 'GET',
		headers: {
			'x-auth-token': token,
		},
	};

	const response = await fetch(
		`${process.env.REACT_APP_SERVER}/user/get`,
		options
	);

	return response.json();
}

// helper function to make string into title case
export function titleCase(str) {
	const transformedStr = str.toLowerCase().split(' ');
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < transformedStr.length; i++) {
		transformedStr[i] =
			transformedStr[i].charAt(0).toUpperCase() + transformedStr[i].slice(1);
	}
	return transformedStr.join(' ');
}

// function to create new pet
export async function createNewPetHelper(payload, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.post(`${process.env.REACT_APP_SERVER}/pet/create`, payload, config)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to fetch pet
export async function fetchPetsData(token) {
	const options = {
		method: 'GET',
		headers: {
			'x-auth-token': token,
		},
	};

	const response = await fetch(
		`${process.env.REACT_APP_SERVER}/pet/get-all`,
		options
	);

	return response.json();
}

// function to fetch pets available for adoption
export async function fetchPetsForAdoptionData(token) {
	const options = {
		method: 'GET',
		headers: {
			'x-auth-token': token,
		},
	};

	const response = await fetch(
		`${process.env.REACT_APP_SERVER}/adoption/get-all-pets`,
		options
	);
	return response.json();
}

// function to delete pet using pet Id
export async function deletePet(petId, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.delete(`${process.env.REACT_APP_SERVER}/pet/delete/${petId}`, config)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to put pet for adoption
export async function putPetOnAdoption(petId, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.post(
			`${process.env.REACT_APP_SERVER}/adoption/put-pet-on-adoption/${petId}`,
			{},
			config
		)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to remove pet from adoption
export async function removePetFromAdoption(petId, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.delete(`${process.env.REACT_APP_SERVER}/adoption/delete/${petId}`, config)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to fetch adoption history
export async function fetchAdoptionHistory(token) {
	const options = {
		method: 'GET',
		headers: {
			'x-auth-token': token,
		},
	};

	const response = await fetch(
		`${process.env.REACT_APP_SERVER}/adoption/record`,
		options
	);

	return response.json();
}

// function to send adoption request
export async function sendAdoptionRequest(petId, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.post(
			`${process.env.REACT_APP_SERVER}/adoption/request-adoption/${petId}`,
			{},
			config
		)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to cancel adoption request
export async function cancelAdoptionRequest(petId, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.post(
			`${process.env.REACT_APP_SERVER}/adoption/cancel-adoption-request/${petId}`,
			{},
			config
		)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to get all adoption request
export async function getAdoptionRequest(petId, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.get(
			`${process.env.REACT_APP_SERVER}/adoption/get/pet-adoption-request/${petId}`,
			config
		)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to complete adoption
export async function completeAdoption(userId, petId, token) {
	const body = {
		petId,
		userWhoAdoptedPet: userId,
	};

	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.post(
			`${process.env.REACT_APP_SERVER}/adoption/complete-adoption`,
			body,
			config
		)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to get all pets of owner available for adoption
export async function getUserPetsForAdoption(ownerId, token) {
	const options = {
		method: 'GET',
		headers: {
			'x-auth-token': token,
		},
	};

	const response = await fetch(
		`${process.env.REACT_APP_SERVER}/adoption/get/allUserPetsForAdoption/${ownerId}`,
		options
	);

	return response.json();
}

// function to update profile picture
export async function updateUserData(payload, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.put(`${process.env.REACT_APP_SERVER}/user/update`, payload, config)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to update password
export async function updatePassword(payload, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.post(
			`${process.env.REACT_APP_SERVER}/auth/password/reset`,
			payload,
			config
		)
		.then((res) => res)
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to generate time
export function getTime(date) {
	// in indian time zone
	const offset = 330; // Time zone offset for India in minutes
	const currentTime = new Date(date.getTime() + offset * 60 * 1000);
	const hours = currentTime.getHours();
	let minutes = currentTime.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${hours}:${minutes}`;
}

// function to add user friend
export function addUserFriend(friendId, token) {
	const config = {
		headers: {
			'x-auth-token': token,
		},
	};

	const response = axios
		.post(
			`${process.env.REACT_APP_SERVER}/user/friend/add/${friendId}`,
			{},
			config
		)
		.then((res) => {
			const { data } = res;
			return data;
		})
		.catch((err) => {
			const { data } = err.response;
			return data;
		});

	return response;
}

// function to get user friend
export async function getUserFriend(token) {
	const options = {
		method: 'GET',
		headers: {
			'x-auth-token': token,
		},
	};

	const response = await fetch(
		`${process.env.REACT_APP_SERVER}/user/friend/get`,
		options
	);

	return response.json();
}

// function to generate unique hash
export function generateUniqueId() {
	// create a unique hash by combining the current time with a random number
	const hashInput = Date.now().toString() + Math.random().toString();
	// generate a SHA-256 hash of the input
	return sha256(hashInput).toString();
}
