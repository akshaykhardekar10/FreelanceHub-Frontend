import { Box, VStack, Image, Flex, Text} from '@chakra-ui/react'
import React, { useState } from 'react'
import Signup from './Signup'
// import GoogleAuth from './GoogleAuth'
import { Toaster } from '../ui/toaster'
import useShowToast from '../../Hooks/useShowToast'
import { Link } from 'react-router-dom'


const SignupForm = () => {
//   const [isLogin, setIsLogin] = useState(false)
// const showToast = useShowToast();


 
  return (
    <>
    <Box 
    // borderStyle={'none'}
    border={'2px solid'}
    borderColor="purple.400"
    // outlineColor={'purple.500'}
    p={5} borderRadius={4}>
      <VStack spaceY={4}>
      {/* <Image src='' 
      // h={200} 
      alt='Logo'/> */}
      <>FreelanceHub</>
        {/* <Box><h1>FreelanceHub</h1></Box> */}

        <Signup/>

      </VStack>
    </Box>

    <Box 
    border={'2px solid'}
    borderColor="purple.400"
    p={5} borderRadius={4}>
      <Flex alignItems={'center'} justifyContent={'center'}>
        <Box mx={4} fontSize={14}>
          Already have an account?
        </Box>
        <Box color={'blue.400'} cursor={'pointer'}>
        <Link to={'/login'}>Log in</Link>
        </Box>
      </Flex>
    </Box>
    <Toaster/>
    </>
    
  )
}

export default SignupForm