import type { AppProps } from "next/app"
import { AuthProvider, ProtectRoute } from "@components/Auth"
import '../styles/globals.css'
import { getAuthToken } from "@utils/Helpers";

export default function MyApp({Component, pageProps, ...props}: AppProps ){
	const { authToken } = props as any;
	return (
		<AuthProvider authToken={authToken} >
			<ProtectRoute>
				<Component {...pageProps} />
			</ProtectRoute>
		</AuthProvider>
	)
}

MyApp.getInitialProps = ({ctx}) => {
	return { 
		authToken: getAuthToken(ctx.req)
	}
}