import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { theme, media } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled.div`
  position: fixed;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media.desktop`left: 20px;`};
  ${media.tablet`display: none;`};

  &:after {
    content: '';
    display: block;
    width: 1px;
    height: 60px;
    margin: 20px auto 0;
    background-color: ${colors.lightSlate};
    opacity: 0.3;
  }
`;

const StyledBlogLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${colors.lightSlate};
  transition: ${theme.transition};
  padding: 14px 10px;
  border-radius: 8px;
  background-color: rgba(100, 255, 218, 0.04);
  border: 1px solid rgba(100, 255, 218, 0.1);

  &:hover,
  &:focus {
    color: ${colors.green};
    background-color: rgba(100, 255, 218, 0.08);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 0 20px rgba(100, 255, 218, 0.15);
    transform: translateY(-3px);
  }

  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 8px;
    fill: currentColor;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: rotate(-15deg);
  }

  span {
    writing-mode: vertical-rl;
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.xs};
    letter-spacing: 0.1em;
  }
`;

const BlogsSidebar = () => (
  <StyledContainer>
    <StyledBlogLink to="/blogs" aria-label="Blogs">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 2h9l5 5v13a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm8 1v5h5M8 13h8M8 17h5"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>Blogs</span>
    </StyledBlogLink>
  </StyledContainer>
);

export default BlogsSidebar;
