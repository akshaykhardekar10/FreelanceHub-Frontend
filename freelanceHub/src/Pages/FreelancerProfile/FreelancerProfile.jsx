// FreelancerProfile.jsx

import { Avatar, AvatarGroup, Box, Button, Flex, Grid, RatingGroup, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Skills from '../../components/MyProfile/Skills'
import { Skeleton, SkeletonCircle, SkeletonText } from '../../components/ui/skeleton';

const FreelancerProfile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const freelancer = JSON.parse(localStorage.getItem("freelancerProfile"))
  console.log(freelancer);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [])

  return (
    <>
      <VStack
        background="linear-gradient(135deg, #243B55, #141E30)"
        border="2px solid rgba(100, 170, 240, 0.9)"
        my={5}
        borderRadius={15}
        py={5}
        minH={'82vh'}
        color={'whiteAlpha.900'}
      >
        {isLoading && [0].map((_, idx) => (
          <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: "row" }} color={'whiteAlpha.900'} w={'3/4'} key={idx}>
            <VStack>
              <SkeletonCircle size={'32'} />
              <Skeleton height={'25px'}><Box>Loading...</Box></Skeleton>
            </VStack>

            <VStack w={'1/2'}>
              <Flex w={'full'} gap={5} alignItems={'center'} pb={3}>
                <Skeleton height={'20px'}><Box>Loading name...</Box></Skeleton>
                <Skeleton height={'50px'}><Box>Loading profile...</Box></Skeleton>
              </Flex>
              <SkeletonText noOfLines={4} gap="4" w={'full'} />

              <Flex gap={2} w={'full'}>
                <Skeleton height={'45px'}><Box>Loading skills...</Box></Skeleton>
                <Skeleton height={'45px'}><Box>Loading skills...</Box></Skeleton>
                <Skeleton height={'45px'}><Box>Loading skills...</Box></Skeleton>
              </Flex>
            </VStack>

          </Flex>
        ))}

        {!isLoading && (
          <>
            <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: "row" }} color={'whiteAlpha.900'} w={'3/4'}>
              <VStack>
                <AvatarGroup
                  mx={'auto'}
                  justifySelf={"center"}
                  alignSelf={"flex-start"}
                  h={{ base: '64px', sm: "100px", md: "130px" }}
                  w={{ base: '64px', sm: "100px", md: "130px" }}
                  border={'2px solid gray'}
                  borderRadius={'full'} size={'full'}
                >
                  <Avatar.Root>
                    <Avatar.Image name="Profile Image"
                      src={freelancer.profileImageUrl}
                      alt={freelancer.username} />
                  </Avatar.Root>
                </AvatarGroup>

                <Box>
                  <RatingGroup.Root count={5} defaultValue={Math.floor(freelancer.userRatings)} size="lg" colorPalette={'yellow'} readOnly>
                    <RatingGroup.HiddenInput />
                    <RatingGroup.Control />
                  </RatingGroup.Root>
                </Box>
              </VStack>

              <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
                <Flex direction={{ base: "column", sm: 'row' }} justifyContent={{ base: "center", sm: "flex-start" }} alignItems={'center'} w={'full'}>
                  <Text fontSize={{ base: 'sm', md: 'lg' }} fontWeight={'bold'} color={'whiteAlpha.900'}>{freelancer.username}</Text>
                  <Flex gap={4} alignItems={'center'} justifyContent={'center'} ml={{ base: 2, sm: 4 }} >
                    {/* Edit Button can be re-enabled if needed */}
                  </Flex>
                </Flex>

                <Text fontSize={"sm"} color={"whiteAlpha.800"}>{freelancer.bio}</Text>
                <Flex gap={2} alignItems={'center'}>
                  <Text fontSize={"sm"} fontWeight={'medium'} color={"whiteAlpha.800"}>Domain of work:</Text>
                  <Text fontSize={"sm"} color={"whiteAlpha.800"}>{freelancer.domain}</Text>
                </Flex>
                <Text fontSize={"sm"} color={"whiteAlpha.800"}>{freelancer.experience}</Text>

                <Flex gap={2}>
                    <Text 
                        fontSize={"sm"} 
                        fontStyle={'lg'} 
                        fontWeight={'medium'} 
                        color={'gray.200'}  // Slightly darker gray for labels
                    >
                        My work:
                    </Text>
                    <Text 
                        fontSize={"sm"} 
                        color={'blue.500'}  // Lighter gray for domain text
                    >
                        <a 
                        href={freelancer.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        >{freelancer.githubLink}</a>
                    </Text>
                </Flex>

                <VStack>
                  <Box w={'full'}><Text fontStyle={'lg'} fontWeight={'medium'} color={'whiteAlpha.800'}>Tech-Stack</Text></Box>
                  <Grid
                    templateColumns={{
                      base: 'repeat(1, 1fr)',
                      md: 'repeat(4, 1fr)',
                    }}
                    gap={1}
                    columnGap={1}
                    w={'full'}
                  >
                    {freelancer.skills.map((e, idx) => {
                      return (<Skills skill={e} key={idx} />)
                    })}
                  </Grid>
                </VStack>

              </VStack>
            </Flex>
          </>
        )}
      </VStack>
    </>
  )
}

export default FreelancerProfile;
