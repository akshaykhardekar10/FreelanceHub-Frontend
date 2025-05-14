import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Box, Flex, Image, Link, Text, VStack } from '@chakra-ui/react';

const Reviews = () => {
  return (
    <Flex w="full" p={5} >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[1, 2, 3].map((_, i) => (
          <SwiperSlide key={i}>
            <Flex
              gap={10}
              px={20}
              py={8}
              backgroundColor="#1A1D29"
              border="1px solid"
              borderColor="whiteAlpha.200"
              borderRadius="xl"
              color="whiteAlpha.900"
              alignItems="center"
            >
              <Image
                src="./public/reviewImg.avif"
                h={300}
                border="1px solid"
                borderColor="whiteAlpha.300"
                borderRadius="lg"
                boxShadow="0 0 15px rgba(255,255,255,0.1)"
              />

              <VStack alignItems="flex-start" gap={4} maxW="70%">
                <Text fontSize="md" fontWeight="light" opacity={0.9}>
                  I recently started using this freelancing platform, and my experience has been excellent so far.
                  The website's clean and professional interface makes it easy to navigate through different sections
                  like finding projects, managing proposals, and tracking payments. It offers seamless communication
                  with clients through integrated messaging, and the secure payment system ensures timely transactions.
                  While the service fees can be slightly high for small projects and some clients lack thorough
                  verification, the platform provides a robust environment for freelancers to connect with clients,
                  deliver quality work, and get paid securely. Overall, it is a reliable and user-friendly platform
                  for freelancers.
                </Text>
                <Link color="whiteAlpha.700" fontWeight="medium" _hover={{ textDecoration: 'underline' }}>
                  @this_is_jaden
                </Link>
              </VStack>
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Flex>
  );
};

export default Reviews;
