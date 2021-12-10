import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Dispatch } from "redux";
import Carousel, { Dots, slidesToShowPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../utils/responsive";
import Car from "../../components/Car";
import carsService from "../../app/carsService";
import { GetCars_cars } from "../../app/carsService/__generated__/GetCars";
import { setTopCars } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { makeSelectTopCars } from "./selectors";
import MoonLoader from "react-spinners/MoonLoader";

const TopCarsContainer = styled.div`
  ${tw`
    max-w-screen-lg
    w-full
    flex
    flex-col
    items-center
    justify-center
    pr-4
    pl-4
    md:pl-0
    md:pr-0
    mb-10
  `};
`;

const Title = styled.h2`
  ${tw`
    text-3xl
    lg:text-5xl
    text-black
    font-extrabold
  `};
`;

const CarsContainer = styled.div`
  ${tw`
    w-full
    flex
    flex-wrap
    justify-center
    mt-7
    md:mt-10
  `};
`;

const EmptyCars = styled.div`
  ${tw`
    w-full
    flex
    justify-center
    items-center
    mt-5
    text-2xl
    text-gray-500
  `};
`;

const LoadingContainer = styled.div`
  ${tw`
    w-full
    mt-9
    flex
    justify-center
    items-center
    text-base
    text-black
  `};
`;

const actionDispatch = (dispatch: Dispatch) => ({
  setTopCars: (cars: GetCars_cars[]) => dispatch(setTopCars(cars))
})

const stateSelector = createSelector(makeSelectTopCars, (topCars) => ({
  topCars
}));

const wait = (timeout: number) => new Promise((rs) => setTimeout(rs, timeout));

const TopCars = () => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  // const topCars = useSelector((state: RootState) => state.homePage.topCars);
  const { topCars } = useSelector(stateSelector);
  const { setTopCars } = actionDispatch(useDispatch())

  const fetchTopCars = async () => {
    setLoading(true);
    const allCars: GetCars_cars[] | void = await carsService.getCars(true).catch((err) => {
      console.log(err);
    });
    await wait(3000);
    if (allCars) setTopCars(allCars);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopCars();
  }, []);

  const handleChange = (val: number) => {
    setCurrent(val);
  }

  return (
    <TopCarsContainer>
      <Title>Explore Our Top Deals</Title>

      { loading && ( 
        <LoadingContainer>
          <MoonLoader loading size={30} />
        </LoadingContainer>
        )
      }

      { !loading && topCars && topCars.length === 0 && ( <EmptyCars> No Cars To Show </EmptyCars> )}
      
      {
        !loading && topCars && topCars.length > 0 && (
          <CarsContainer>
            <Carousel 
              value={current}
              onChange={handleChange} 
              slides={ topCars.map((car) => <Car {...car} />) }
              plugins={[
                "clickToChange",
                {
                  resolve: slidesToShowPlugin,
                  options: {
                    numberOfSlides: 3,
                  }
                }
              ]}
              breakpoints={{
                640: {
                  plugins: [
                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 1
                      }
                    }
                  ]
                },
                900: {
                  plugins: [
                    {
                      resolve: slidesToShowPlugin,
                      options: {
                        numberOfSlides: 2
                      }
                    }
                  ]
                }            
              }}
            />
            <Dots value={current} onChange={handleChange} number={isMobile ? topCars.length : topCars.length / 2} />
          </CarsContainer>
        )
      }

    </TopCarsContainer>
  );
}

export default TopCars;
