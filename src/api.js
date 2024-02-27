import axios from "axios";

export const getPeople = async (page) => {
	try {
		const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
		return response.data;
	} catch (e) {
		throw e;
	}
}

export const getInfo = async (url) => {
	try {
		const response = await axios.get(url);
		return response.data;
	} catch (e) {
		throw e;
	}
}
