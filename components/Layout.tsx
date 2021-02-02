import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";

export default function Layout({title = "Welcome", header=true, footer=true, children}){
	return (
		<>
			<Head>
				<title>{title} | Bay in Balance</title>
			</Head>
			
			<Header visible={header} />
			<div className="container" >
				{children}
			</div>

			<Footer visible={footer} />
		</>
	)
}