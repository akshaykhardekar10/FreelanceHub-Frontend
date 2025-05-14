import { toaster } from '../components/ui/toaster'
import React from 'react'

const useShowToast = () => {
  const showToast = (title, description, type)=>{
    toaster.create({
        title : title,
        description : description,
        type : type,
        duration : 9000,
        isClosable : true
    })
  }

  return showToast
}

export default useShowToast