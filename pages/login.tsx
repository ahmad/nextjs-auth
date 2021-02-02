import Layout from "@components/Layout"
import Link from "next/link"

export default function LoginPage() {
	return (
		<Layout title="Login" >
			<h1>Login Page</h1>
			<Link href="/" >Home</Link>

		</Layout>
	)
}