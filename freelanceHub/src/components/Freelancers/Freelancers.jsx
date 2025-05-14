import React from 'react';
import { Box, Flex, Grid, Text, VStack } from '@chakra-ui/react';
import Freelancer from './Freelancer';
import { LuSearch } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionGrid = motion(Grid);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);

const Freelancers = ({ selectedDomain, freelancers }) => {
  const setFreelancer = (e) => {
    localStorage.removeItem('freelancerProfile');
    localStorage.setItem('freelancerProfile', JSON.stringify(e));
  };

  return (
    <>
      <VStack pt={10} w={'full'}>
        {/* Header with animation */}
        <MotionFlex
          textAlign={'start'}
          w={'full'}
          px={5}
          gap={2}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <MotionText
            color={'white'}
            fontWeight={'medium'}
            fontSize={'5xl'}
            pt={3}
            w={'full'}
          >
            Our Freelancers
          </MotionText>
        </MotionFlex>

        {/* Grid with animation */}
        <MotionGrid
          templateColumns="repeat(4, 1fr)"
          gap={4}
          p={4}
          w="full"
          backgroundColor={'transparent'}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {selectedDomain
            ? freelancers.map((e, key) => {
                if (
                  JSON.stringify(e.domain)
                    .toLowerCase()
                    .includes(selectedDomain.toLowerCase())
                )
                  return (
                    <Link to={`/:${e.username}`} key={e.id}>
                      <Freelancer
                        username={e.username}
                        domain={e.domain}
                        description={e.bio}
                        url={e.profileImageUrl}
                        ratings={e.userRatings}
                      />
                    </Link>
                  );
              })
            : freelancers.map((e, key) => {
                return (
                  <Link
                    to={`/:${e.username}`}
                    onClick={() => setFreelancer(e)}
                    key={e.id}
                  >
                    <Freelancer
                      username={e.username}
                      domain={e.domain}
                      description={e.bio}
                      url={e.profileImageUrl}
                      ratings={JSON.parse(e.userRatings)}
                    />
                  </Link>
                );
              })}
        </MotionGrid>
      </VStack>
    </>
  );
};

export default Freelancers;
