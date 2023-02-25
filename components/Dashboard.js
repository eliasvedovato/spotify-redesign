import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'
import SpotifyWebApi from 'spotify-web-api-node'
import { useRecoilState } from 'recoil'
import { playingTrackState } from 'atoms/playerAtoms'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
})

function Dashboard() {
	const { data: session } = useSession()
	const { accessToken } = session

	// acces to this at a global level
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

	const chooseTrack = track => {
		setPlayingTrack(track)
	}
	//so we can actually retrive this in whatever component you want to

	useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

	return (
		<main className='bg-black text-white text-center flex min-h-screen'>
			<Sidebar />
			<Body spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
			<Right spotifyApi={spotifyApi} chooseTrack={chooseTrack} />
		</main>
	)
}

export default Dashboard
