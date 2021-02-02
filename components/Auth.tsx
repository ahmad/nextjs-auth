
import { clearAuthToken } from '@utils/Helpers';
import { useRouter } from 'next/dist/client/router';
import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext({});

/**
 * This keeps track of the user and their auth state.
 * @param authToken The user auth token if available
 */
export const AuthProvider = ({authToken, children }) => {
    const [user, setUser] 		= useState(null)
	const [token, setToken] 	= useState(authToken)
    const [loading, setLoading] = useState(true)

	useEffect(() => {
		(async () => {
			if (token) {

				// @TODO: Update the API route to fetch account information
				// const res = await fetch("/api/account", {
				// 	method: "GET",
				// 	cache: "no-cache",
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 		'Authorizations': `Bearer ${token}`
				// 	}
				// });

				// if (res.status === 1200){
				// 	const json = await res.json();
				// 	setUser(json);
				// }

				setUser({
					firstName: "John",
					lastName: "Doe",
					email: "john@doe.com"
				})
			}
			
			setLoading(false)
		})()
	}, [token])

    return (
        <AuthContext.Provider value={{
			isAuthenticated: !!user,
			isLoading: loading,
			user: user,
			token: token,
			
			logout: () => {
				clearAuthToken();

				setLoading(true);
				setUser(null);
				setToken(null);
			},

			login: ( user ) => {
				setUser(user);
			}
		}}>
            {children}
        </AuthContext.Provider>
    )
}


/**
 * All Routes/Components will be wrapped by this component.
 * It checks to see if the user is authenticated and descides
 * what component to render.
 */
export const ProtectRoute = ({ children }) => {
	const router 	= useRouter();
	const { isAuthenticated, isLoading } = useAuth() as any

	if (isLoading){
		return <LoadingScreen />
	} else {

		// If the user is not authenticated and they are not currently on
		// the /login page, it redirects them there.
		if (!isAuthenticated){
			if (router.pathname !== "/login"){
				router.push("/login")

				/**
				 * We need to return a component here that is not the {children}.
				 * If we don't return anything, for the split second before it 
				 * redirects to the /login route it will attempt to render the {children}
				 * which could results in errors if those {children} assumes you are authenticated
				 */
				return <LoadingScreen />
			}
		}

		return ( <>{children}</> )
	}

};

// This is shown while the user inforamtion is being loaded from the server
export const LoadingScreen = ({}) => {
	return (
		<div id="loading" >
			<div id="loading-display" >
				<img src="/loading.svg" />
			</div>
		</div>
	)
}


export const useAuth = () => useContext(AuthContext);