import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Application = ({ application }) => {
  const token = localStorage.getItem('token')
  const [isToken, setIsToken] = useState(token)
  const [status, setStatus] = useState(application.status)  // <-- Added state for application status

  const applicationId = application.jobApplicationId;

  const updateStatus = async (newStatus) => {
    try {
      // Send the PATCH request to update status
      const response = await fetch(`http://localhost:8080/api/jobApplications/updateStatus/${applicationId}?value=${newStatus}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Parse JSON and handle the response
      const data = await response.json()
      console.log('Status updated:', data.message)

      // Update the local state to reflect the new status
      setStatus(newStatus)  // <-- Update the local status state

    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  return (
    <Box pe={10} py={5} w="3/4">
      <Flex 
      border="1px solid #334155"
      backgroundColor="#0f172a"
      boxShadow="0 0 12px rgba(30, 58, 138, 0.3)" 
      w="full" 
      // shadow="sm" 
      borderRadius={5}>
        <VStack w="full" py={5} px={10}>
          <Flex w="full" justifyContent="space-between">
            <Flex color="white" gap={2} alignItems="baseline" w={'1/2'}>
              <Text fontWeight="bold">Applicant:</Text>
              <Text>{application.applicantUsername}</Text>
            </Flex>
            <Flex color="white" gap={2} alignItems="baseline" w={'1/2'}>
              <Text fontWeight="bold">Domain:</Text>
              <Text>{application.domain}</Text>
            </Flex>
          </Flex>

          <Flex color="white" gap={2} alignItems="baseline" w={'full'}>
            <Text fontWeight="bold">Bid Price:</Text>
            <Text>{application.bidPrice}</Text>
          </Flex>
          <Flex color="white" gap={2} alignItems="baseline" w={'full'}>
            <Text fontWeight="bold">Experience:</Text>
            <Text>{application.experience}</Text>
          </Flex>
          <Flex color="white" gap={2} alignItems="baseline" w={'full'}>
            <Text fontWeight="bold">Reference Work:</Text>
            <a href={application.githubLink} target="_blank" rel="noopener noreferrer">{application.githubLink}</a>
          </Flex>
          <Flex color="white" gap={2} alignItems="baseline" w={'full'}>
            <Text fontWeight="bold">Cover Letter:</Text>
            <Text>{application.coverLetter}</Text>
          </Flex>

          {/* Show status */}
          <Flex color="white" gap={2} alignItems="baseline" w={'full'}>
            <Text fontWeight="bold">Current Status:</Text>
            <Text>{status}</Text>  {/* Display the current status */}
          </Flex>

          {/* Show buttons based on status */}
          {status === 'PENDING' && (
            <Flex color="black" gap={5} alignItems="baseline" w={'full'} justifyContent={'center'}>
              <Button backgroundColor={'green.400'} _hover={{ shadow: 'sm' }} onClick={() => updateStatus("ACCEPTED")}>
                Accept
              </Button>
              <Button backgroundColor={'red.400'} _hover={{ shadow: 'sm' }} onClick={() => updateStatus("REJECTED")}>
                Reject
              </Button>
            </Flex>
          )}
        </VStack>
      </Flex>
    </Box>
  )
}

export default Application