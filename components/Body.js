import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import Search from './Search'
import Poster from './Poster'
import Track from './Track'

function Body({ spotifyApi, chooseTrack }) {
	const { data: session } = useSession()
	const { accessToken } = session
	const [search, setSearch] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [newReleases, setNewReleases] = useState([])

	useEffect(() => {
		if (!accessToken) return
		spotifyApi.setAccessToken(accessToken)
	}, [accessToken])

	// Searching....
	useEffect(() => {
		if (!search) return setSearchResults([])
		if (!accessToken) return

		let cancel = false;

		spotifyApi.searchTracks(search).then(res => {
			if (cancel) return;
			setSearchResults(
				res.body.tracks.items.map(track => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
						popularity: track.popularity,
					}
				})
			)
		})

		return () => (cancel = true);
	}, [search, accessToken])

	// New releases....
	useEffect(() => {
		if (!accessToken) return

		spotifyApi.getNewReleases().then(res => {
			setNewReleases(
				res.body.albums.items.map(track => {
					return {
						id: track.id,
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.images[0].url,
					}
				})
			)
		})
	}, [accessToken])

	// console.log(newReleases)

	return (
		<section 
			className='h-screen px-[1rem] py-2 space-y-8 
			md:max-w-6xl grow md:mr-2.5 mb-[240px] md:mb-[160px]'>
			<Search search={search} setSearch={setSearch} />

			<div
				className='h-[400px] py-4 grid overflow-y-scroll gap-y-4 p-4
				grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4'
			>
				{searchResults.length === 0
					? newReleases
							.slice(0, 4)
							.map(track => (
								<Poster
									key={track.id}
									track={track}
									chooseTrack={chooseTrack}
								/>
							))
					: searchResults
							.slice(0, 4)
							.map(track => (
								<Poster
									key={track.id}
									track={track}
									chooseTrack={chooseTrack}
								/>
							))}
			</div>

			<div className='flex gap-x-8 min-w-full px-4'>
				<div className='hidden xl:inline max-w-[270px]'>
					<h2 className='font-bold mb-3'>Genres</h2>
					<div className='flex justify-center gap-x-2 gap-y-2.5 flex-wrap mb-3'>
						<div className='tag'>Rap</div>
						<div className='tag'>House</div>
						<div className='tag'>Minimal</div>
						<div className='tag'>Hip-hop</div>
						<div className='tag'>Rock</div>
						<div className='tag'>Tech House</div>
						<div className='tag'>Trap</div>
						<div className='tag'>Reggaeton</div>
						<div className='tag'>Techno</div>
					</div>
					<button className='btn'>All Genres</button>
				</div>

				<div className='w-full flex flex-col justify-center'>
					<h2 className='font-bold mb-3 text-center'>
						{searchResults.length === 0 ? 'New Releases' : 'Tracks'}
					</h2>
					<div 
						className='space-y-3 border-2 border-[#262626] rounded-2xl p-3 
						bg-[#0D0D0D] overflow-y-scroll max-h-96 scrollbar-thin 
						scrollbar-thumb-gray-600 scrollbar-thumb-rounded 
						hover:scrollbar-thumb-gray-500 w-full'>
						{searchResults.length === 0
							? newReleases
									.slice(4, newReleases.length)
									.map(track => (
										<Track
											key={track.id}
											track={track}
											chooseTrack={chooseTrack}
										/>
									))
							: searchResults
									.slice(4, searchResults.length)
									.map(track => (
										<Track
											key={track.id}
											track={track}
											chooseTrack={chooseTrack}
										/>
									))}
					</div>
				</div>
			</div>
		</section>
	)
}

export default Body
