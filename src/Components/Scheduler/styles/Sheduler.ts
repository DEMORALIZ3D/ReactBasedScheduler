import styled from "@emotion/styled";
import { getColour } from "../utils/colorGen";

export const ScheduleView = styled("div")`
  width: 100%;
`;

export const ScheduleCell = styled("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: #ebedee;
  border: 0.5px solid #497e9c57;
  border-radius: 10px;
  margin-bottom: 5px;
  overflow: none;

  &:nth-of-type(1) {
    border: none;
    background: none;
  }
`;

export const SheduleRow = styled("div")`
  display: grid;

  grid-template-columns: repeat(8, minmax(100px, 100%));
  min-height: 100px;
  column-gap: 5px;
`;

export const EventTile = styled("div")<{ hue: number }>`
  cursor: pointer;
  user-select: none;
  display: flex;
  flex-direction: column;
  width: 100%;

  & > div {
    user-select: none;
    font-size: 12px;
    line-height: 14px;
    text-align: center;
    display: flex;
    flex-direction: column;
    padding: 8px;
    border: 1px solid ${({ hue }) => getColour(hue, 35)};
    background: ${({ hue }) => getColour(hue)};
    border-radius: 8px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  }

  &:not(:first-of-type) {
    margin-top: -20%;
  }

  &:hover {
    z-index: 50;
    transform: scale(1.2);
  }
`;

export const ResourceInfoCell = styled(ScheduleCell)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 4px;

  & > div:first-of-type {
    font-weight: bold;
  }

  & > div:not(:first-of-type) {
    font-size: 12px;
  }
`;

export const ScheduleActionBar = styled("div")`
  padding: 8px;
`;

export const DateSelector = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  & input {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

export const YearBar = styled("div")`
  display: grid;
  grid-template-columns: repeat(8, minmax(100px, 100%));
  gap: 5px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: white;
    border-radius: 8px;
  }

  & > div:nth-of-type(even) {
    background-color: #75aaf0;
  }
  & > div:nth-of-type(odd) {
    background-color: #7775f0;
  }
  & > div:nth-of-type(1) {
    background-color: transparent;
    border-radius: 8px 0 0 8px !important;
  }
`;

export const AddEventForm = styled("form")`
  border-radius: 
`;
