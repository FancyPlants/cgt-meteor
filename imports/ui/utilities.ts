import nanoid from 'nanoid'
import swal from 'sweetalert2'

// specifies a wrapper type over string just for cleanliness
export type MongoID = string
export const generateID = () => nanoid(26) as MongoID

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
