import JobApplicationForm from '../../components/JobApplicationForm/JobApplicationForm'
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const JobApplication = () => {
  const [isApplied, setIsApplied] = useState(false);
  return (
    <VStack color={'black'}  backgroundColor={'whiteAlpha.500'} my={5} borderRadius={15} py={5} minH={'100vh'}>
        {/* <Heading as={'h1'}>FreelanceHub</Heading> */}
        <Container w={'1/2'} >
            <JobApplicationForm setIsApplied={setIsApplied}/>
        </Container>
    </VStack>
  )
}

export default JobApplication