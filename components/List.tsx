'use client'

import { useState, useRef, useEffect } from 'react'

import ListItem from './ListItem'

const imageUrls = Array.from({ length: 500 }, (_, i) => `https://picsum.photos/id/${i}/800/500`)

const List = () => {
	const [renderedItems, setRenderedItems] = useState<Set<number>>(new Set())
	const loadersRef = useRef<(HTMLDivElement | null)[]>([])

	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					const index = parseInt((entry.target as HTMLElement).dataset.index || '0', 10)
					setRenderedItems(prev => {
						const newRenderedItems = new Set(prev)
						if (entry.isIntersecting) {
							newRenderedItems.add(index)
						} else {
							newRenderedItems.delete(index)
						}
						return newRenderedItems
					})
				})
			},
			{ threshold: 0.1 }
		)

		const currentLoadersRef = loadersRef.current

		currentLoadersRef.forEach(loader => {
			if (loader) observer.observe(loader)
		})

		return () => {
			currentLoadersRef.forEach(loader => {
				if (loader) observer.unobserve(loader)
			})
		}
	}, [])

	return (
		<div className='flex flex-col gap-1 items-center'>
			{Array.from({ length: 10000 }, (_, index) => (
				<div
					ref={el => {
						loadersRef.current[index] = el
					}}
					key={index}
					data-index={index}
					className='relative w-[800px] h-[500px]'
				>
					{renderedItems.has(index) && <ListItem index={index} src={imageUrls[index % 500]} />}
				</div>
			))}
		</div>
	)
}

export default List
