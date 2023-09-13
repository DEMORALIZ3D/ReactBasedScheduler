import styled from "@emotion/styled";

export const ScheduleView = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SheduleRow = styled("div")`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  min-height: 75px;

  &:nth-of-type(even) {
    background-color: #bad1e6;
  }

  & > div:first-of-type {
    width: 100px;
    display: flex;
    min-width: 100px;
    flex-basis: 100px;
  }

  & > div:not(first-of-type) {
    display: flex;
    flex-direction: column;
  }
`;

export const EventTile = styled("div")`
  font-size: 12px;
  line-height: 14px;
  padding: 8px;
  text-align: center;
  flex-grow: 1;
`;


