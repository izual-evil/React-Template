import styled from "styled-components";

export const PageMainWrapper = styled.div`
  background-color: ${(props) => (props.theme.isDark ? "#141414" : "#f5f5f5")};
  color: ${(props) => (props.theme.isDark ? "#ffffff" : "#000000")};
`;
