import Cookies from "js-cookie";

export function get_csrf_token () {
	return Cookies.get('csrf_access_token')
}



