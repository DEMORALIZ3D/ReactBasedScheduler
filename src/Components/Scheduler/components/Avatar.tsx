import styled from "@emotion/styled";
import { getColour } from "../utils/colorGen";

const AvatarWrapper = styled("div")<{ hue: number }>`
  border: 1px solid ${({ hue }) => getColour(hue, 35)};
  background: ${({ hue }) => getColour(hue)};
  color: ${({ hue }) => getColour(hue, 35)};
  width: 50px;
  height: 50px;
  border-radius: 100%;
  font-size: 40px;
  overflow: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = ({ name }: { name: string }) => {
  if (!name) return null;
  const nameSplit = name.split(" ");

  const getInitials = [nameSplit[0].split("")[0], nameSplit[1].split("")[0]];
  return (
    <AvatarWrapper hue={Math.floor(Math.random() * 360) + 1}>
      <span>{getInitials[0]}</span>
      <span>{getInitials[1]}</span>
    </AvatarWrapper>
  );
};

export default Avatar;
