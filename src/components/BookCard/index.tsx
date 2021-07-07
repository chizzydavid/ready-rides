import React, { useState } from "react";
import styled, { css } from "styled-components";
import tw from "twin.macro";
import {
  faCalendarAlt,
  faCaretDown,
  faCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { MargineWrap } from "../MargineWrap";
import Buttton from "../Button";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"
import { SCREENS } from "../../utils/responsive";

const CardContainer = styled.div`
  min-height: 4.3em;
  box-shadow: 0 1.3px 12px -3px rgba(0, 0, 0, 0.4);
  ${tw`
    flex
    justify-center
    items-center
    rounded-md
    bg-white
    pt-1
    pb-1
    pr-2
    pl-2
    md:pt-2
    md:pb-2
    md:pr-7
    md:pl-7
  `};
`;

const ItemContainer = styled.div`
  position: relative;
  ${`
  flex 
  `};
`;

const Icon = styled.span`
  ${`
    text-red-500
    fill-current
    text-xs
    md:text-base
    mr-1
    md:mr-3
  `};
`;

const SmallIcon = styled.span`
  ${tw`
    text-gray-500
    fill-current
    text-xs
    md:text-base
    ml-1
  `};
`;

const Name = styled.span`
  ${tw`
    text-gray-600
    text-xs
    md:text-sm
    cursor-pointer
    select-none
    ml-2
  `};
`;

const LineSeparator = styled.span`
  width: 2px;
  height: 45%;
  ${tw`
    bg-gray-300
    mr-2
    ml-2
    md:mr-5
    md:ml-5
  `};
`;

const DateCalendar = styled(Calendar)`
  position: absolute;
  max-width: none;
  user-select: none;
  top: 3.5em;
  left: 0;
  
  ${({ offset }: any) =>
    offset &&
    css`
      left: -6em;
    `};
  
  @media (min-width: ${SCREENS.md}) {
      top: 3.5em;
      left: -2em;
    }
 ` as any;


const BookCard = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [isStartCalendarOpen, setStartCalendarOpen] = useState(false);
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [isReturnCalendarOpen, setReturnCalendarOpen] = useState(false);

  const toggleStartDateCalendar = () => {
    setStartCalendarOpen(!isStartCalendarOpen);
    if (isReturnCalendarOpen) setReturnCalendarOpen(false);
  };

  const toggleReturnDateCalendar = () => {
    setReturnCalendarOpen(!isReturnCalendarOpen);
    if (isStartCalendarOpen) setStartCalendarOpen(false);
  };
  
  return (
    <CardContainer>
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Icon>
        <Name onClick={toggleStartDateCalendar}>Pick Up Date</Name>

        <SmallIcon>
          <FontAwesomeIcon
            icon={isStartCalendarOpen ? faCaretUp : faCaretDown}
          />
        </SmallIcon>
        {isStartCalendarOpen && (
          <DateCalendar value={startDate} onChange={setStartDate as any} />
        )}
      </ItemContainer>

      <LineSeparator />
      <ItemContainer>
        <Icon>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </Icon>
        <Name onClick={toggleReturnDateCalendar}>Return Date</Name>
        <SmallIcon>
          <FontAwesomeIcon
            icon={isReturnCalendarOpen ? faCaretUp : faCaretDown}
          />
        </SmallIcon>
        {isReturnCalendarOpen && (
          <DateCalendar
            offset
            value={returnDate}
            onChange={setReturnDate as any}
          />
        )}
      </ItemContainer>
      <MargineWrap direction="horizontal" margin="2em" />
      <Buttton text="Book Your Ride" />
      
    </CardContainer>
  );
}

export default BookCard;
