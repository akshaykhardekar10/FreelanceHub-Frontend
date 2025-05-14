import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { CgArrowLongRight } from 'react-icons/cg';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Service = ({ title, description, icon }) => {
  return (
    <MotionBox
      whileHover={{
        scale: 1.03,
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      borderRadius="lg" // minimized radius
      p="2px"
      background="linear-gradient(135deg, rgba(0,255,255,0.8), rgba(255,255,255,0.4), rgba(128,0,128,0.8))"
    >
      <Box
        borderRadius="lg"
        background="linear-gradient(135deg, #1A1D29, #0A0E1A)"
        p={6}
        h={{ base: '60vh', md: '50vh' }}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        textAlign="center"
        color="whiteAlpha.900"
      >
        <Box>{icon}</Box>

        <Text fontWeight="semibold" fontSize="xl" pt={2}>
          {title}
        </Text>

        <Text fontSize="md" fontWeight="light" opacity={0.9}>
          {description}
        </Text>

        <Box mt="auto" w="full" display="flex" justifyContent="center">
          <CgArrowLongRight size={28} />
        </Box>
      </Box>
    </MotionBox>
  );
};

export default Service;
