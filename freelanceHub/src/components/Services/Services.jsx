import { Box, Flex, Grid, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Service from './Service';
import {
  MdDeveloperMode,
  MdOutlineVideoCameraBack
} from 'react-icons/md';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { TfiWrite } from 'react-icons/tfi';
import { GoGraph } from 'react-icons/go';
import { SlEarphonesAlt } from 'react-icons/sl';
import { FcServices } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCode, FaQuidditch } from 'react-icons/fa';

const MotionFlex = motion(Flex);

const Services = () => {
  const services = [
    {
      title: "Web Development",
      description:
        "Custom websites and web applications tailored to your business needs using modern frameworks and best practices.",
      icon: <FaCode size={50} />
    },
    {
      title: "Graphic Design",
      description:
        "Eye-catching logos, banners, and visual assets that bring your brand to life with a professional touch.",
      icon: <IoColorPaletteSharp size={50} />
    },
    {
      title: "Mobile App Development",
      description:
        "User-friendly mobile apps for iOS and Android, built for performance and seamless user experience.",
      icon: <MdDeveloperMode size={50} />
    },
    {
      title: "Content Writing",
      description:
        "Engaging, SEO-optimized content for blogs, websites, and marketing to boost your online presence.",
      icon: <TfiWrite size={50} />
    },
    {
      title: "Digital Marketing",
      description:
        "Effective strategies for SEO, social media, and paid advertising to drive traffic and grow your business.",
      icon: <GoGraph size={50} />
    },
    {
      title: "UI/UX Design",
      description:
        "Intuitive and modern user interfaces crafted to enhance user experience and improve engagement.",
      icon: <FaQuidditch size={50} />
    },
    {
      title: "Video Editing",
      description:
        "Professional video editing for promotional content, social media, and storytelling that captivates audiences.",
      icon: <MdOutlineVideoCameraBack size={50} />
    },
    {
      title: "Virtual Assistance",
      description:
        "Reliable administrative support for data entry, scheduling, and managing day-to-day business tasks.",
      icon: <SlEarphonesAlt size={50} />
    }
  ];

  return (
    <Box bg="#0A0E1A" minH="100vh" color="whiteAlpha.800">
      <VStack pt={10}>
        <MotionFlex
          textAlign={'start'}
          w={'full'}
          px={5}
          alignItems={'center'}
          gap={3}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Text fontWeight={'semibold'} fontSize={'5xl'} pt={3}>
            Services
          </Text>
          <FcServices size={55} />
        </MotionFlex>

        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={6}
          p={6}
          w="full"
        >
          {services.map((e, key) => (
            <Link to="/hire-job" key={key}>
              <Service title={e.title} description={e.description} icon={e.icon} />
            </Link>
          ))}
        </Grid>
      </VStack>
    </Box>
  );
};

export default Services;
