import PostJobForm from '../../components/PostJobForm/PostJobForm'
import { Box, VStack } from '@chakra-ui/react'
import { Toaster } from '../../components/ui/toaster'
import React from 'react'

const PostJob = () => {
  return (
    <>
    <VStack 
    background="linear-gradient(135deg, #243B55, #141E30)"
    border="2px solid rgba(100, 170, 240, 0.9)"
    borderRadius={15} 
    py={10} 
    my={5} 
    h={'82vh'}>
        <Box color={'white'} fontWeight={'bold'} textStyle={'2xl'}>
            Post a new job
        </Box>
        <PostJobForm/>
    </VStack>
    <Toaster/>
    </>
  )
}

export default PostJob