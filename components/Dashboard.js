import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import { playingTrackState } from 'atoms/playerAtoms'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
})

function Dashboard() {
	const { data: session } = useSession()
	const { accessToken } = session

	const [showPlayer, setShowPLayer] = useState(false)

	useEffect(() => {
		setShowPLayer(true)
	}, [])

	// acces to this at a global level
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

	const chooseTrack = track => {
		setPlayingTrack(track)
	}
	//so we can actually retrive this in whatever component you want to

	return (
		<main className='bg-black text-white text-center flex min-h-screen'>
			<Sidebar />
			<Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
			<Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />

			{/* {showPlayer && (
				<div className='fixed bottom-0 left-0 right-0 z-1 mt-10'>
					<Player
						accessToken={accessToken}
						trackUri={playingTrack.uri}
					/>
				</div>
			)} */}
		</main>
	)
}

export default Dashboard
