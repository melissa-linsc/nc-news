import '../styles/NavBar.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTopics } from '../utils/api'
import { capitaliseStr } from '../utils/capitaliseStr'

export function NavBar({setPage}) {

    const [topics, setTopics] = useState([])
    
    useEffect(() => {
        getTopics().then((topicData) => {
            setTopics(topicData)
        })
    }, [])

    function handleClick() {
        setPage(1)
    }

    return (
        <>
            <nav>
                <ul>
                    {topics.map((topic) => {
                        return <NavLink className='nav-link dark:text-[#f8f8f2] dark:hover:text-[#DD3232]' to={`/topics/${topic.slug}`} key={topic.slug} onClick={handleClick}><li>{capitaliseStr(topic.slug)}</li></NavLink>
                    })}
                </ul>
            </nav>
        </>
    )
}