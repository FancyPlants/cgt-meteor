import nanoid from 'nanoid'
import swal from 'sweetalert2'

// long string for ID
export const generateID = () => nanoid(26)

export const errorAlert = (title: string, text = ' ') => {
  swal({
    title,
    text,
    type: 'error',
  })
}

export const successAlert = (title: string, text = '') => {
  swal({
    title,
    text,
    type: 'success',
  })
}
