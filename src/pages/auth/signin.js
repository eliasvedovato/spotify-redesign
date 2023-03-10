import Head from 'next/head'
import Image from 'next/image'
import { getProviders, signIn, useSession } from 'next-auth/react'
import { useEffect } from "react";
import { useRouter } from "next/router";
import Loader from '../../../components/Loader'

function Signin({ providers }) {
	const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // if there is a session return the home page
      router.push("/");
    }
  }, [session]);

  if (session) return <Loader />

	return (
		<div className="flex flex-col items-center gap-10">
			<Head>
				<title>Login - Spotify</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Image
				src='https://rb.gy/y9mwtb'
				height={250}
				width={600}
				className='animate-pulse'
			/>

			{Object.values(providers).map(provider => (
				<div key={provider.name}>
					<button
						className='text-white py-4 px-6 rounded-full bg-[#1db954] transition 
            duration-300 ease-out border border-transparent uppercase font-bold 
            text-xs md:text-base tracking-wider hover:scale-105 hover:bg-[#0c903a]'
						onClick={() => signIn(provider.id)}
					>
						Sign in with {provider.name}
					</button>
				</div>
			))}
		</div>
	)
}

export default Signin;

export async function getServerSideProps() {
	const providers = await getProviders()
	return {
		props: { providers },
	}
}
