import Cookies from "js-cookies"

let authToken = null;

export const getAuthToken = (request :any) => {
	if (request && request?.cookies) {
		const { AUTH_TOKEN } = request.cookies;
		authToken = AUTH_TOKEN;
		return authToken;
	}

	authToken = Cookies.getItem("AUTH_TOKEN");
	return authToken;
}

export const clearAuthToken = () => {
	if (Cookies.hasItem("AUTH_TOKEN")){
		Cookies.removeItem("AUTH_TOKEN");
	}
}