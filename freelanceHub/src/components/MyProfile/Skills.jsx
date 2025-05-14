import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Skills = ({skill}) => {
  return (
    <>
    <Flex border={'1px solid'}  borderColor={'white'} backgroundColor={'orange.400'} py={2} px={4} borderRadius={3} w={'full'} alignItems={'center'} justifyContent={'center'}>
        {skill}
    </Flex>
    </>
  )
}

export default Skills