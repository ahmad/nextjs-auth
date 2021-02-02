import { useAuth } from "./Auth"

const AuthActionButton = () => {
	const { isAuthenticated, logout, login }= useAuth() as any;

	if (isAuthenticated){
		return <button onClick={logout}>Logout</button>
	}

	return <></>
}

export default function Header ({visible = true}) {
	if (visible){
		return (
			<header>
				<AuthActionButton />
			</header>
		);
	}

	return <></> 
}