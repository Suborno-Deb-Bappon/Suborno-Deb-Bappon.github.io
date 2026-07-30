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
  padding-left: 140px;
  ${media.tablet`padding-left: 100px;`};
  ${media.phablet`padding-left: 70px;`};

  &:before {
    content: '';
    position: absolute;
    left: 120px;
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
    ${media.tablet`left: 80px;`};
    ${media.phablet`left: 50px;`};
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
  left: -88px;
  top: 6px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: ${colors.green};
  border: 3px solid ${colors.navy};
  box-shadow: 0 0 0 2px ${colors.green};
  z-index: 1;
  ${media.tablet`left: -63px;`};
  ${media.phablet`left: -43px; width: 12px; height: 12px;`};
`;

const StyledDate = styled.span`
  position: absolute;
  left: -230px;
  top: 4px;
  width: 120px;
  text-align: right;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.slate};
  line-height: 1.4;
  ${media.tablet`left: -175px; width: 90px; font-size: ${fontSizes.xs};`};
  ${media.phablet`left: -135px; width: 80px; font-size: ${fontSizes.xs};`};
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
`;

const Jobs = ({ data }) => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  return (
    <StyledContainer id="jobs" ref={revealContainer}>
      <Heading>Where I&apos;ve Worked</Heading>
      <StyledTimeline>
        {data &&
          data.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, url, company, range, location } = frontmatter;
            return (
              <StyledTimelineItem key={i}>
                <StyledDot />
                <StyledDate>
                  {range}
                  {location ? `\n${location}` : ''}
                </StyledDate>
                <StyledCard>
                  <StyledTitle>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: title.replace(
                          /\[([^\]]+)\]\(([^)]+)\)/g,
                          '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
                        ),
                      }}
                    />
                    <StyledCompany>
                      <span> @ </span>
                      <a href={url} target="_blank" rel="nofollow noopener noreferrer">
                        {company}
                      </a>
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

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Jobs;
