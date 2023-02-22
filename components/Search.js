import {MdOutlineShortText} from 'react-icons/md'

function Search({ search, setSearch }) {
	return (
		<div
			className='max-w-auto bg-[#1a1a1a] rounded-full overflow-hidden 
      border-2 border-[#333] p-1.5 px-5 pr-8 flex items-center'
		>
			<div className='h-4 w-4 rounded-full border-2 flex-shrink-0 animate-pulse' />
			<input
				type='text'
				value={search}
				onChange={e => setSearch(e.target.value)}
				className='bg-[#1a1a1a] border-none w-full focus:ring-0 placeholder-[#fafafa]
				text-xs'
				placeholder='Search...'
			/>

			<div className='flex items-center divide-dotted divide-x-2 divide-[#333] gap-2'>
				<div className='hidden lg:flex justify-end space-x-2'>
					<button className='tag'>Minimal</button>
					<button className='tag'>House</button>
					<button className='tag'>Progressive</button>
				</div>

				<div className='hidden sm:flex items-center space-x-1.5 text-[#cecece] pl-2'>
					<MdOutlineShortText className='text-2xl animate-pulse' />
					<span className='font-medium text-sm'>Filters</span>
				</div>
			</div>
		</div>
	)
}

export default Search
