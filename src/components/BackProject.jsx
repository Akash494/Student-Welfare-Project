import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { backProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const BackProject = ({ project }) => {
  const [backModal] = useGlobalState('backModal')
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
//   const [date, setDate] = useState('')
//   const [imageURL, setImageURL] = useState('')

//   const toTimestamp = (dateStr) => {
//     const dateObj = Date.parse(dateStr)
//     return dateObj / 1000
//   }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!cost) return

    await backProject(project?.id, cost)
    toast.success('Project Backed successfully, will reflect in 30sec.')
    setGlobalState('backModal', 'scale-0')
  }

//   const onClose = () => {
//     setGlobalState('createModal', 'scale-0')
//     reset()
//   }

//   const reset = () => {
//     setTitle('')
//     setCost('')
//     setDescription('')
//     setImageURL('')
//     setDate('')
//   }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${backModal}`}
    >
      <div
        className="bg-white shadow-xl shadow-black
        rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{project?.title}</p>
            <button
            //   onClick={onClose}
              onClick={() => setGlobalState('backModal', 'scale-0')}
              type="button"
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden h-20 w-20">
              <img
                src={
                  project.imageURL ||
                  'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'
                }
                alt={project?.title}
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>


          <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="Amount (ETH)"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
            />
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-green-700 mt-5"
          >
            Back Project
          </button>
        </form>
      </div>
    </div>
  )
}

export default BackProject