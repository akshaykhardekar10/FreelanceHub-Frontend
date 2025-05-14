// Profile.jsx

import { Avatar, AvatarGroup, Box, Button, Flex, Grid, RatingGroup, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Skills from './Skills';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';

const Profile = ({ details }) => {
    console.log(details);
    const [updated, setUpdated] = useState(false);
    const token = localStorage.getItem('token');
    
    return (
        <>

        <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: 'column', sm: "row" }} color={'black'} w={'3/4'}>
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
                        <Avatar.Image 
                            name="this is alita" 
                            src={details.profileImageUrl} 
                            alt="this is alita" 
                        />
                    </Avatar.Root>
                </AvatarGroup>

                <Box>
                    <RatingGroup.Root 
                        count={5} 
                        defaultValue={Math.floor(details.userRatings)} 
                        size="lg" 
                        colorPalette={'yellow'} 
                        readOnly
                    >
                        <RatingGroup.HiddenInput />
                        <RatingGroup.Control />
                    </RatingGroup.Root>
                </Box>
            </VStack>
    
            <VStack alignItems={'start'} gap={2} mx={'auto'} flex={1}>
                <Flex 
                    direction={{ base: "column", sm: 'row' }}
                    justifyContent={{ base: "center", sm: "flex-start" }}
                    alignItems={'center'}
                    w={'full'}
                >
                    <Text 
                        fontSize={{ base: 'sm', md: 'lg' }} 
                        color={'gray.200'}  // Light gray for the username
                    >
                        {details.username}
                    </Text>
                    <Flex gap={4} alignItems={'center'} justifyContent={'center'} ml={{ base: 2, sm: 4 }}>
                        <EditProfile details={details} />
                    </Flex>
                </Flex>
                
                <Text 
                    fontSize={"sm"} 
                    color={'gray.300'}  // Lighter gray for bio text
                >
                    {details.bio}
                </Text>
                
                <Flex gap={2}>
                    <Text 
                        fontSize={"sm"} 
                        fontStyle={'lg'} 
                        fontWeight={'medium'} 
                        color={'gray.200'}  // Slightly darker gray for labels
                    >
                        Domain of work:
                    </Text>
                    <Text 
                        fontSize={"sm"} 
                        color={'gray.300'}  // Lighter gray for domain text
                    >
                        {details.domain}
                    </Text>
                </Flex>
                
                <Text 
                    fontSize={"sm"} 
                    color={'gray.300'}  // Lighter gray for experience text
                >
                    {details.experience}
                </Text>

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
                        href={details.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        >{details.githubLink}</a>
                    </Text>
                </Flex>

                <VStack>
                    <Box w={'full'}>
                        <Text 
                            fontStyle={'lg'} 
                            fontWeight={'medium'} 
                            color={'gray.200'}  // Light gray for tech-stack heading
                        >
                            Tech-Stack
                        </Text>
                    </Box>
                    <Grid
                        templateColumns={{
                            base: 'repeat(1, 1fr)',
                            md: 'repeat(4, 1fr)',
                        }}
                        gap={1}
                        columnGap={1}
                        w={'full'}
                    >
                        {details.skills.map((e, idx) => {
                            return (<Skills skill={e} key={idx} />);
                        })}
                    </Grid>
                </VStack>

            </VStack>
        </Flex>
        </>
    );
}

export default Profile;
