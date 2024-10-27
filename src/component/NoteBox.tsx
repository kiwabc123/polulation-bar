import { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./NoteBox.css"
const NoteBox = () => {
    useEffect(() => {
        toast.info(
          'Welcome! Click items to move them between lists. After 5 seconds, they will return to the main list.',
          {
            position:"bottom-right",
            autoClose: 5000, // Auto-close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      }, []);
    
  return (
    <ToastContainer />
  )
}

export default NoteBox