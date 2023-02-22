import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs'
import { useRecoilState } from 'recoil'
import { playingTrackState, playState } from '../atoms/playerAtoms'

function Poster({ track, chooseTrack }) {
	const [play, setPlay] = useRecoilState(playState)
	const [playingTrack, setPlayingTrack] = useRecoilState(playingTrackState)

	const handlePlay = () => {
		chooseTrack(track)

		if (track.uri === playingTrack.uri) {
			setPlay(!play)
		}
	}

	return (
		<div
			className='w-[260px] h-[360px] rounded-[50px]
      relative text-white/80 cursor-pointer hover:scale-105 mx-auto
      hover:text-white/100 transition duration-200 ease-out group'
			onClick={handlePlay}
		>
			<img
				src={track.albumUrl}
				className='h-full inset-0 object-cover rounded-[50px] opacity-80
        group-hover:opacity-100'
			/>

			<div
				className='absolute bottom-10 inset-x-0 flex items-center 
        justify-center space-x-3.5'
			>
				<div
					className='h-10 w-10 bg-[#15883e] rounded-full flex items-center 
          justify-center group-hover:bg-[#1db954] flex-shrink-0'
				>
					{track.uri === playingTrack.uri && play ? (
						<BsFillPauseFill className='text-xl' />
					) : (
						<BsFillPlayFill className='text-xl' />
					)}
				</div>

				<div
					className='text-[15px] text-black bg-zinc-600 
          rounded-full p-2 glassmorphism'
				>
					<h4 className='font-extrabold truncate w-44'>
						{track.title}
					</h4>
					<h6>{track.artist}</h6>
				</div>
			</div>
		</div>
	)
}

export default Poster
