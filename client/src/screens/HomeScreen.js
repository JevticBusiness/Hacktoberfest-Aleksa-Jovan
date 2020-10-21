import React, { useEffect, useState } from 'react'

import Meme from '../components/Api/Meme'

const HomeScreen = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetchHome();
    }, [])

    const fetchHome = async () => {
        const data = await fetch(`/api/posts`)
        const items = await data.json()
        setItems(items)
    }

    return(
        <div className="feedRoute">
            { items.map(item => (
                <Meme 
                    key={ item._id }
                    title = { item.title }
                    memeImage = { item.memeImage }
                    description = { item.description }
                    date = { item.date }
                />
            ))}
        </div>
    )
}

export default HomeScreen