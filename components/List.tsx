'use client'

import { useState, useEffect } from 'react'
import ListItem from './ListItem'

const TOTAL_ITEMS = 10000
const ITEM_HEIGHT = 500
const BUFFER_SIZE = 5
const VIEWPORT_HEIGHT = typeof window !== 'undefined' ? window.innerHeight : 800

const imageUrls = Array.from({ length: 500 }, (_, i) => `https://picsum.photos/id/${i}/800/500`)

const List = () => {
	const [renderedItems, setRenderedItems] = useState<Set<number>>(new Set())

	useEffect(() => {
		const onScroll = () => {
			const scrollY = window.scrollY
			const startIndex = Math.max(0, Math.floor(scrollY / ITEM_HEIGHT) - BUFFER_SIZE)
			const endIndex = Math.min(TOTAL_ITEMS, startIndex + Math.ceil(VIEWPORT_HEIGHT / ITEM_HEIGHT) + BUFFER_SIZE * 2)

			setRenderedItems(new Set(Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i)))
		}

		window.addEventListener('scroll', onScroll)
		onScroll()
		return () => window.removeEventListener('scroll', onScroll)
	}, [])

	return (
		<div className='flex flex-col items-center relative' style={{ height: TOTAL_ITEMS * ITEM_HEIGHT }}>
			{Array.from(renderedItems).map(index => (
				<div
					key={index}
					className='absolute w-[800px]'
					style={{
						top: index * ITEM_HEIGHT,
						height: ITEM_HEIGHT,
					}}
				>
					<ListItem index={index} src={imageUrls[index % 500]} />
				</div>
			))}
		</div>
	)
}

export default List
