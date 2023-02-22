import Image from 'next/image'
import {
	ChartBarIcon,
	ClockIcon,
	DotsHorizontalIcon,
	HomeIcon,
} from '@heroicons/react/solid'
import { FaMicrophoneAlt } from 'react-icons/fa'
import { RiCompassFill } from 'react-icons/ri'

function Sidebar() {
	return (
		<section
			className='p-4 hidden sm:block
			w-[90px] space-y-8 bg-gray-900 h-auto'
		>
			<Image src='https://rb.gy/xkacau' width={56} height={56} />
			<div className='flex flex-col space-y-8 items-center'>
				<HomeIcon className='sidebarIcon text-white opacity-[0.85]' />
				<RiCompassFill className='sidebarIcon text-2xl' />
				<FaMicrophoneAlt className='sidebarIcon' />
				<ChartBarIcon className='sidebarIcon' />
				<ClockIcon className='sidebarIcon' />
				<DotsHorizontalIcon className='sidebarIcon' />
			</div>
		</section>
	)
}

export default Sidebar
