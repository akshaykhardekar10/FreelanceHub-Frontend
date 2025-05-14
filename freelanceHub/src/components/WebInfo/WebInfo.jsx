import { Flex, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const WebInfo = () => {
  return (
    <Box h={'65vh'} position="relative" overflow="hidden" bg="#0A0E1A">
      {/* Brighter, larger ambient blobs */}
      <MotionBox
        position="absolute"
        top="-150px"
        left="-150px"
        width="500px"
        height="500px"
        borderRadius="50%"
        bg="cyan.400"
        filter="blur(150px)"
        opacity={0.5}
        animate={{ x: [0, 100, -100, 0], y: [0, 80, -80, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        zIndex={0}
      />
      <MotionBox
        position="absolute"
        bottom="-160px"
        right="-160px"
        width="450px"
        height="450px"
        borderRadius="50%"
        bg="purple.500"
        filter="blur(150px)"
        opacity={0.5}
        animate={{ x: [0, -100, 100, 0], y: [0, -70, 70, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        zIndex={0}
      />

      {/* More vivid metallic sweep */}
      <MotionBox
        position="absolute"
        top={0}
        left="-200%"
        width="400%"
        height="100%"
        bgGradient="linear(135deg, transparent, rgba(255,255,255,0.15), transparent)"
        animate={{ left: ["-200%", "100%"] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        zIndex={0}
      />

      {/* Main content */}
      <Flex
        color={'white'}
        justifyContent={'space-between'}
        alignItems={'flex-end'}
        h={'full'}
        p={14}
        position="relative"
        zIndex={1}
      >
        <Text fontSize="2xl" fontWeight="medium" maxW="40%">
          A freelancing platform connecting <br />
          professionals with businesses to <br />
          showcase talent, find projects, and <br />
          collaborate.
        </Text>

        <Text fontSize="7xl" fontWeight="extrabold" textAlign={'end'}>
          Where Talent <br />Meets <br />Opportunity
        </Text>
      </Flex>
    </Box>
  );
};

export default WebInfo;
