import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { FcConferenceCall } from 'react-icons/fc';
import Reviews from './Reviews';

const ClientReviews = () => {
  return (
    <Box pt={10} minH={'80vh'} backgroundColor="#0A0E1A">
      <VStack color="white" spacing={6}>
        <Flex
          textAlign="start"
          w="full"
          px={5}
          gap={2}
          alignItems="center"
        >
          <Text
            fontWeight="medium"
            fontSize="5xl"
            pt={3}
            color="whiteAlpha.900"
          >
            Client Reviews
          </Text>
          <FcConferenceCall size={60} />
        </Flex>

        <Reviews />
      </VStack>
    </Box>
  );
};

export default ClientReviews;
