import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { Tooltip } from '../ui/tooltip';
import React from 'react';
import { Link } from 'react-router-dom';

const SidebarItems = () => {
  const menuItems = [
    { title: 'Profile', route: '/profile' },
    { title: 'Post Job', route: '/post-job' },
    { title: 'My Posts', route: '/my-posts' },
    // { title: "Notifications", route: "/notifications" }
  ];

  return (
    <VStack spacing={4}>
      {menuItems.map((e, idx) => (
        <Tooltip
          key={idx}
          showArrow
          content={e.title}
          positioning={{ placement: 'right-center' }}
          openDelay={500}
          closeDelay={100}
          display={{ base: 'block', md: 'none' }}
        >
          <Box
            transition="background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{
              transform: 'translateX(5px)',
              boxShadow: '0px 0px 15px 3px rgba(0, 255, 255, 0.8)',  // Metallic glow ring
              border: '1px solid rgba(0, 255, 255, 0.8)',  // Subtle glowing border
            }}
            borderRadius="10px"
            p={3}
            w="full"
            _focus={{ outline: 'none' }}
            border="1px solid transparent"  // Initial border invisible to create the glowing effect
          >
            <Link to={e.route}>
              <Text fontSize="lg" fontWeight="medium" color="whiteAlpha.900">
                {e.title}
              </Text>
            </Link>
          </Box>
        </Tooltip>
      ))}
    </VStack>
  );
};

export default SidebarItems;
