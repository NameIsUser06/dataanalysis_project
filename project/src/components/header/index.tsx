import Link from "next/link";
import styled from "styled-components";

const Header = () => {
  return (
    <Container>
      <StyledLink href={"/"}>CSV to Image</StyledLink>
      <GithubLink href={"https://github.com/NameIsUser06/dataanalysis_project"}>
        Github
      </GithubLink>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  background-color: #eeeeee;
  align-items: center;
  font-size: 1.5rem;
  top: 0;
  left: 0;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 8rem;
  color: black;
`;

const GithubLink = styled(Link)`
  display: flex;
  width: 5rem;
  height: 2rem;
  border-radius: 0.5rem;
  border: 1rem;
  background-color: #636e7b;
  color: white;
  font-size: 1rem;
  text-align: center;
  justify-content: center;
  align-items: center;
  margin-right: 8rem;
  text-decoration: none;
`;

export default Header;
