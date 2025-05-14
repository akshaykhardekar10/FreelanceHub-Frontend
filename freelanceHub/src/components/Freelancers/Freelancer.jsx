import { Box, Flex, Heading, RatingGroup, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { CgArrowLongRight } from 'react-icons/cg';
import { Avatar } from '../ui/avatar';
import { motion } from 'framer-motion';

// Wrap the Freelancer component in motion for hover animation
const MotionVStack = motion(VStack);

const Freelancer = ({ url, username, domain, description, ratings }) => {
  return (
    <MotionVStack
      cursor={'pointer'}
      _hover={{
        bg: "rgba(255, 255, 255, 0.1)", 
        shadow: "lg", 
        transform: "scale(1.05)",
        border: "2px solid #1abc9c",  // Glowing border on hover
        boxShadow: "0 0 15px #1abc9c",  // Ring light effect with a metallic blue color
      }}
      borderRadius={12}  // Smooth, rounded corners for a polished look
      transition={"background 0.3s ease-in-out, transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"}
      h={'auto'}
      p={6}
      textAlign={'center'}
      color={'white'}
      backgroundColor={"#2C3E50"}  // Deep metallic blue background
      border={'1px solid rgba(255, 255, 255, 0.2)'}  // Subtle border to match the metallic blue tone
      initial={{ opacity: 0.8, scale: 0.98 }}  // Initial subtle scale
      whileHover={{ opacity: 1, scale: 1.05 }}  // Slight zoom-in on hover
    >
      <Box w={48} h={48} borderRadius="full" overflow="hidden" mb={4}>
        <Avatar w="full" h="full" src={url} />
      </Box>

      <Heading as={"h1"} size={'xl'} fontWeight="bold" color={"#ECF0F1"}>  {/* Light grey-blue color for the username */}
        {username}
      </Heading>
      <Heading as={"h2"} size={'md'} fontWeight="light" color={"#95A5A6"} mb={4}>  {/* Muted light blue for domain */}
        {domain}
      </Heading>
      
      <Text fontSize="md" fontWeight="normal" color={"#BDC3C7"} mb={4}>  {/* Soft light grey for description */}
        {description}
      </Text>

      <Box mb={4}>
        <RatingGroup.Root
          count={5}
          defaultValue={Math.floor(ratings)}
          size="lg"
          colorPalette={'yellow'}
          readOnly
        >
          <RatingGroup.HiddenInput />
          <RatingGroup.Control />
        </RatingGroup.Root>
      </Box>

      <Flex mt="auto" w="full" justify="center" align="center">
        <CgArrowLongRight size={30} color="#BDC3C7" />
      </Flex>
    </MotionVStack>
  );
};

export default Freelancer;
