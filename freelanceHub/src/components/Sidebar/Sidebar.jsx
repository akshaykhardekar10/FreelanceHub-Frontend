import { Box, Flex, Button } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '../ui/tooltip';
import SidebarItems from '../SidebarItems/SidebarItems';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/authSlice';

const Sidebar = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    Navigate('/login');
    window.location.reload();
  };

  return (
    <Box
      bg="#0A0E1A"
      color="whiteAlpha.900"
      height="76vh" // Reduced height from 100vh to 95vh to avoid scrollbar
      borderRight="1px solid"
      borderColor="whiteAlpha.200"
      py={2} // Reduced padding to minimize space
      px={{ base: 2, md: 4 }}
      position="sticky"
      top={0}
      left={0}
    >
      <Flex direction="column" gap={10} width="full" height="full">
        {/* Sidebar Items */}
        <Flex direction="column" gap={4} cursor="pointer">
          <SidebarItems />
        </Flex>

        {/* Logout Button with Ringlight (No shadow) */}
        <Tooltip
          showArrow
          content="Logout"
          positioning={{ placement: 'right-center' }}
          openDelay={500}
          closeDelay={100}
          display={{ base: 'block', md: 'none' }}
        >
          <Flex
            alignItems="center"
            gap={4}
            mt="auto"
            p={2}
            borderRadius="md"
            w={{ base: 10, md: 'full' }}
            justifyContent={{ base: 'center', md: 'flex-start' }}
            border="1px solid"
            borderColor="cyan.300"
            _hover={{
              borderColor: 'cyan.400',
              bg: 'whiteAlpha.100',
            }}
            mb={5}  
          >
            <BiLogOut size={22} />
            <Button
              onClick={handleLogout}
              variant="ghost"
              _hover={{ bg: 'transparent' }}
              display={{ base: 'none', md: 'block' }}
              color="whiteAlpha.900"
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
