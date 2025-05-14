import React from 'react'
import { Box, Button, CloseButton, Dialog, Flex, Portal, Text } from "@chakra-ui/react"
import { CgArrowLongRight } from 'react-icons/cg'

const JobDescription = () => {
  return (
    <>
    <Box py={2}>
    <Dialog.Root size={'lg'} placement={'center'}>
      <Dialog.Trigger asChild>

        <Flex gap={2} alignItems={'center'} cursor={'pointer'} color={'blue.700'}>
        <Text >Read more</Text>
        <CgArrowLongRight size={20}/>

        </Flex>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Description</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Dialog.Body>
            
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    </Box>
    </>
  )
}

export default JobDescription