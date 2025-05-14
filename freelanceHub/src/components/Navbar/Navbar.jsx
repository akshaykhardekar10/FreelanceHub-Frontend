import React from 'react';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/authSlice';
import { useAuth } from '../../context/AuthContext'; // Use context
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Navbar = ({ isAuth }) => {
  const user = localStorage.getItem('user');
  const { logout: logoutContext } = useAuth(); // Use context logout
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout in Redux
    // logoutContext();    // Clear token from context
    navigate('/login');
    window.location.reload();
  };

  return (
    <Container h="10vh" w="full" py={4} px={0}>
      <Flex w="full" justifyContent={{ base: 'center', sm: 'space-between' }} alignItems="center">
        <Box fontWeight="bold" color="whiteAlpha.800" fontSize="2xl">
          FreelanceHub
        </Box>

        <Flex gap={4} alignItems="center">
          <Link to="/">
            <MotionButton
              variant="outline"
              size="sm"
              whileHover={{ scale: 1.05, boxShadow: 'lg' }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              colorScheme="cyan"
              borderColor="cyan.400"
              _hover={{
                bg: 'cyan.400',
                color: '#0A0E1A',
                borderColor: 'cyan.500',
                boxShadow: '0 0 8px rgba(0, 255, 255, 0.5)',
              }}
            >
              Home
            </MotionButton>
          </Link>

          {!user ? (
            <>
              <Link to="/login">
                <MotionButton
                  // bg="blue.400"
                  variant={'outline'}
                  size="sm"
                  whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  colorScheme="blue"
                  borderColor="blue.500"
                  _hover={{
                    bg: 'blue.500',
                    color: '#0A0E1A',
                    borderColor: 'blue.600',
                    boxShadow: '0 0 8px rgba(0, 0, 255, 0.5)',
                  }}
                >
                  Login
                </MotionButton>
              </Link>
              <Link to="/signup">
                <MotionButton
                  variant="outline"
                  size="sm"
                  whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  colorScheme="purple"
                  borderColor="purple.500"
                  _hover={{
                    bg: 'purple.500',
                    color: '#0A0E1A',
                    borderColor: 'purple.600',
                    boxShadow: '0 0 8px rgba(128, 0, 128, 0.5)',
                  }}
                >
                  Signup
                </MotionButton>
              </Link>
            </>
          ) : (
            <>
              <Link to="/get-job">
                <MotionButton
                  variant="outline"
                  size="sm"
                  whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  colorScheme="teal"
                  borderColor="teal.500"
                  _hover={{
                    bg: 'teal.500',
                    color: '#0A0E1A',
                    borderColor: 'teal.600',
                    boxShadow: '0 0 8px rgba(0, 128, 128, 0.5)',
                  }}
                >
                  Get Job
                </MotionButton>
              </Link>
              <Link to="/hire-job">
                <MotionButton
                  variant="outline"
                  size="sm"
                  whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  colorScheme="purple"
                  borderColor="purple.500"
                  _hover={{
                    bg: 'purple.500',
                    color: '#0A0E1A',
                    borderColor: 'purple.600',
                    boxShadow: '0 0 8px rgba(128, 0, 128, 0.5)',
                  }}
                >
                  Hire Job
                </MotionButton>
              </Link>
              <MotionButton
                variant="outline"
                size="sm"
                onClick={handleLogout}
                whileHover={{ scale: 1.05, boxShadow: 'lg' }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                colorScheme="red"
                borderColor="red.500"
                _hover={{
                  bg: 'red.500',
                  color: '#0A0E1A',
                  borderColor: 'red.600',
                  boxShadow: '0 0 8px rgba(255, 0, 0, 0.5)',
                }}
              >
                Logout
              </MotionButton>
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Navbar;
