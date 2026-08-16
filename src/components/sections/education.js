import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 700px;
`;

const StyledTimeline = styled.div`
  position: relative;
  padding-left: 120px;
  ${media.tablet`padding-left: 80px;`};
  ${media.phablet`padding-left: 60px;`};
  ${media.phone`padding-left: 45px;`};

  &:before {
    content: '';
    position: absolute;
    left: 100px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(
      180deg,
      transparent,
      rgba(100, 255, 218, 0.2) 5%,
      rgba(100, 255, 218, 0.2) 95%,
      transparent
    );
    ${media.tablet`left: 60px;`};
    ${media.phablet`left: 40px;`};
    ${media.phone`left: 30px;`};
  }
`;

const StyledTimelineItem = styled.div`
  position: relative;
  margin-bottom: 50px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const StyledDot = styled.span`
  position: absolute;
  left: -72px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${colors.green};
  border: 3px solid ${colors.navy};
  box-shadow: 0 0 0 2px ${colors.green};
  z-index: 1;
  ${media.tablet`left: -47px;`};
  ${media.phablet`left: -33px; width: 12px; height: 12px;`};
  ${media.phone`left: -23px; width: 10px; height: 10px;`};
`;

const StyledDate = styled.span`
  position: absolute;
  left: -200px;
  top: 4px;
  width: 110px;
  text-align: right;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.slate};
  line-height: 1.4;
  ${media.tablet`left: -150px; width: 80px; font-size: ${fontSizes.xs};`};
  ${media.phablet`left: -120px; width: 70px; font-size: ${fontSizes.xs};`};
  ${media.phone`display: none;`};
`;

const StyledCard = styled.div`
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 22px 24px;
  transition: ${theme.transition};
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-4px);
    background-color: ${colors.lightestNavy};
    border-color: rgba(100, 255, 218, 0.15);
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  }
`;

const StyledTitle = styled.h4`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
  font-weight: 500;
  margin: 0 0 4px;
  ${media.phablet`font-size: ${fontSizes.xl};`};
`;

const StyledCompany = styled.span`
  color: ${colors.green};
`;

const StyledContent = styled.div`
  ul {
    ${mixins.fancyList};
  }
  a {
    ${mixins.inlineLink};
  }
  a.outline-btn {
    display: inline-block;
    color: ${colors.green};
    background-color: transparent;
    border: 1px solid ${colors.green};
    border-radius: ${theme.borderRadius};
    padding: 0.4rem 0.75rem;
    font-size: ${fontSizes.smish};
    font-family: ${fonts.SFMono};
    line-height: 1;
    text-decoration: none;
    transition: ${theme.transition};
    margin-left: 10px;
    &:after {
      display: none !important;
    }
    &:hover,
    &:focus {
      background-color: ${colors.transGreen};
      text-decoration: none;
      &:after {
        width: 0 !important;
      }
    }
  }
`;

const Education = ({ data, pageContext }) => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const items = pageContext?.node ? [{ node: pageContext.node }] : (data || []).map(edge => edge);

  return (
    <StyledContainer id="education" ref={revealContainer}>
      <Heading>Education</Heading>
      <StyledTimeline>
        {items.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { institution, degree, year, url } = frontmatter;
          return (
            <StyledTimelineItem key={i}>
              <StyledDot />
              <StyledDate>{year}</StyledDate>
              <StyledCard>
                <StyledTitle>
                  {degree}
                  <StyledCompany>
                    <span> @ </span>
                    {url ? (
                      <a href={url} target="_blank" rel="nofollow noopener noreferrer">
                        {institution}
                      </a>
                    ) : (
                      <span>{institution}</span>
                    )}
                  </StyledCompany>
                </StyledTitle>
                {html && <StyledContent dangerouslySetInnerHTML={{ __html: html }} />}
              </StyledCard>
            </StyledTimelineItem>
          );
        })}
      </StyledTimeline>
    </StyledContainer>
  );
};

Education.propTypes = {
  data: PropTypes.array,
  pageContext: PropTypes.object,
};

export default Education;
