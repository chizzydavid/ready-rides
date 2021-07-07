import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import Navbar from '../../components/Navbar';
import TopSection from './topSection';
import BookCard from '../../components/BookCard';
import BookingSteps from './bookingSteps';
import { MargineWrap } from '../../components/MargineWrap';
import AboutUs from './aboutUs';
import TopCars from './topCars';
import Footer from '../../components/Footer';

const PageContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-full
    items-center
    overflow-x-hidden
  `}
`;

const HomePage = () => {
  return (
    <PageContainer>
      <Navbar />
      <TopSection />
      <MargineWrap direction="vertical" margin="4em" />
      <BookCard />
      <MargineWrap direction="vertical" margin="5em" />
      <BookingSteps />
      <MargineWrap direction="vertical" margin="4em" />
      <AboutUs />
      <MargineWrap direction="vertical" margin="4em" />
      <TopCars />  
      <Footer />    
    </PageContainer>
  )
}

export default HomePage
