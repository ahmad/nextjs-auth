import { useAuth } from "@components/Auth";
import Link from "next/link"
import Layout from "../components/Layout";

export default function Home() {
	const { user } = useAuth() as any;

	return (
		<Layout title="Home">
			<h1>Welcome back, {user.firstName}</h1>

			<Link href="/login" >Login</Link>
		</Layout>
	)
}
