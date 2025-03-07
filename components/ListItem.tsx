import Image from 'next/image'
import { useState } from 'react'

const ListItem = ({ index, src }: { index: number; src: string }) => {
	const [isLoaded, setIsLoaded] = useState(false)

	const handleImageLoad = () => {
		setIsLoaded(true)
	}

	return (
		<Image
			src={src}
			alt={`Item ${index}`}
			onLoad={handleImageLoad}
			className={`transition-opacity ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
			loading='lazy'
			fill
		/>
	)
}

export default ListItem
