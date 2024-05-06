import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import BackProject from '../components/BackProject'
import DeleteProject from '../components/DeleteProject'
import ProjectBackers from '../components/ProjectBackers'
import ProjectDetails from '../components/ProjectDetails'
import UpdateProject from '../components/UpdateProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useGlobalState } from '../store'

const Project = () => {
    const { id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [backers] = useGlobalState('backers')
    const [project] = useGlobalState('project')

    useEffect(async () => {
            await loadProject(id)
            await getBackers(id)
            setLoaded(true)
          }, [])

    return loaded ? (
        <>
            <ProjectDetails project={project} />
            <ProjectBackers backers={backers} />
            <UpdateProject project={project} />
            <DeleteProject project={project} />
            <BackProject project={project} />
        </>
        
    ) : null
    
}

export default Project