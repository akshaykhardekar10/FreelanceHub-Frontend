import Profile from '../../components/MyProfile/Profile'
import { Box, Flex, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Skeleton, SkeletonCircle, SkeletonText } from '../../components/ui/skeleton';
import { motion } from 'framer-motion';

const MotionVStack = motion(VStack);
const MotionFlex = motion(Flex);

const MyProfile = () => {
  const currentUser = JSON.parse(localStorage.getItem('user'))

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [])

  return (
    <>
      <MotionVStack
        background="linear-gradient(135deg, #243B55, #141E30)"
        border="2px solid rgba(100, 170, 240, 0.9)"
        my={5}
        borderRadius={15}
        py={5}
        minH={'82vh'}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {isLoading && [0].map((_, idx) => (
          <MotionFlex
            gap={{ base: 4, sm: 10 }}
            py={10}
            direction={{ base: 'column', sm: "row" }}
            color={'whiteAlpha.900'}
            w={'3/4'}
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <VStack>
              <SkeletonCircle size={'32'} />
              <Skeleton height={'25px'}>
                <Box>Loading...</Box>
              </Skeleton>
            </VStack>

            <VStack w={'1/2'}>
              <Flex w={'full'} gap={5} alignItems={'center'} pb={3}>
                <Skeleton height={'20px'}>
                  <Box>Loading name...</Box>
                </Skeleton>
                <Skeleton height={'50px'}>
                  <Box>Loading profile...</Box>
                </Skeleton>
              </Flex>
              <SkeletonText noOfLines={4} gap="4" w={'full'} />

              <Flex gap={2} w={'full'}>
                <Skeleton height={'45px'}>
                  <Box>Loading skill 1...</Box>
                </Skeleton>
                <Skeleton height={'45px'}>
                  <Box>Loading skill 2...</Box>
                </Skeleton>
                <Skeleton height={'45px'}>
                  <Box>Loading skill 3...</Box>
                </Skeleton>
              </Flex>
            </VStack>
          </MotionFlex>
        ))}

        {!isLoading && (
          <Profile details={currentUser} />
        )}
      </MotionVStack>
    </>
  )
}

export default MyProfile;
