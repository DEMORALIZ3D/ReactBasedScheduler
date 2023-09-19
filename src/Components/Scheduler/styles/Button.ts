import styled from "@emotion/styled";

export const Button = styled("button", {
  shouldForwardProp: (propName) => propName !== "variant",
})<{ variant?: "primary" | "secondary" }>`
  ${({ variant = "primary" }) => `
    display: inline-block;
    outline: 0;
    border: 0;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    height: 38px;
    padding: 8px 24px;
    border-radius: 50px;
    transition: all .2s ease-out;
    text-transform: capitalize;
            
    ${
      variant === "primary"
        ? `
            color: #fff;
            background-image: linear-gradient(180deg,#7c8aff,#3c4fe0);
            box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%);
            &:hover{
                box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%);
            }
        `
        : `
            color: rgb(72, 76, 122);
            background-image: linear-gradient(180deg,#fff,#f5f5fa);
            box-shadow: 0 4px 11px 0 rgb(37 44 97 / 15%), 0 1px 3px 0 rgb(93 100 148 / 20%);
            &:hover{
                box-shadow: 0 8px 22px 0 rgb(37 44 97 / 15%), 0 4px 6px 0 rgb(93 100 148 / 20%);
            }
        `
    }
`}
`;
