// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { Input, Button, useSelect, Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../Store/authSlice';
import { useAuth } from '../../context/AuthContext'; // Import the context
import { InputGroup } from '../ui/input-group'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const Login = () => {
  const [inputs, setInputs] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth();  // Access login from context
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { loginSuccess } = useSelector((state)=>state.auth);

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs),
      });

      if (res.ok) {
        const data = await res.json();

        // Store user in Redux and token in Context
        dispatch(loginSuccess({ user: JSON.stringify(data), token: data.accessToken}));
        login(data.accessToken); // Store token in context
        navigate('/');
        window.location.reload();
      } else {
        const err = await res.text();
        alert(err || 'Login failed');
      }
    } catch (error) {
      alert('Network error: ' + error.message);
    }
  };

  return (
    <>
      <Input
        type="email"
        fontSize={14}
        placeholder="Email"
        borderStyle={'none'}
        border={'1px solid'}
        borderColor="blue.400"
        outlineColor={'blue.500'}
        size="sm"
        color='white'
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      {/* <Input
        type="password"
        fontSize={14}
        placeholder="Password"
        size="sm"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      /> */}
      <InputGroup
          w={'full'}
          endElement={
              <Box h={'full'} position={'absolute'} left={-3}>
              <Button variant={'ghost'} size={'sm'} onClick={()=>{setShowPassword(!showPassword)}} px={0} 
              >
                  {showPassword ? <IoMdEye/> : <IoMdEyeOff/>}
              </Button>
              </Box>
          }
          >
          <Input type={showPassword ? 'text': 'password'}
          fontSize={14} 
          placeholder='Password'
          value={inputs.password}
          onChange={(e)=>setInputs({...inputs,password:e.target.value})}
          size={'sm'}
          color='white'
          borderStyle={'none'}
        border={'1px solid'}
        borderColor="blue.400"
        outlineColor={'blue.500'}
          />
          </InputGroup>
      <MotionButton 
      variant={'outline'}
      size="sm"
      whileHover={{ scale: 1.05, boxShadow: 'lg' }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      colorScheme="blue"
      borderColor="blue.500"
      backgroundColor={'blue.500'}
      _hover={{
        bg: 'blue.400',
        color: '#0A0E1A',
        borderColor: 'blue.400',
        boxShadow: '0 0 8px rgba(0, 0, 255, 0.5)',
      }} 
      w="full" fontSize="sm" onClick={handleLogin}>
        Log in
      </MotionButton>
    </>
  );
};

export default Login;
