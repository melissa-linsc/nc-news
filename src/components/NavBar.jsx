import '../styles/NavBar.css'
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getTopics } from '../utils/api'
import { capitaliseStr } from '../utils/capitaliseStr'

export function NavBar() {

    const [topics, setTopics] = useState([])
    
    useEffect(() => {
        getTopics().then((topicData) => {
            setTopics(topicData)
        })
    }, [])

    return (
        <>
            <nav>
                <ul>
                    {topics.map((topic) => {
                        return <NavLink className='nav-link' to={`/topics/${topic.slug}`} key={topic.slug}><li>{capitaliseStr(topic.slug)}</li></NavLink>
                    })}
                </ul>
            </nav>
        </>
    )
}