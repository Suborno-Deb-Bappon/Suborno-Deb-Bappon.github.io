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
  ${media.phone`padding-left: 50px;`};

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
    ${media.phone`left: 35px;`};
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
  ${media.phone`left: -28px; width: 10px; height: 10px;`};
`;

const StyledDate = styled.span`
  position: absolute;
  left: -235px;
  top: 4px;
  width: 125px;
  text-align: right;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${colors.slate};
  line-height: 1.4;
  ${media.tablet`left: -180px; width: 95px; font-size: ${fontSizes.xs};`};
  ${media.phablet`left: -135px; width: 85px; font-size: ${fontSizes.xs};`};
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

const StyledDesignation = styled.h4`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.xxl};
  font-weight: 500;
  margin: 0 0 4px;
  ${media.phablet`font-size: ${fontSizes.xl};`};
`;

const StyledInstitution = styled.span`
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

const Extracurricular = ({ data }) => {
  const revealContainer = useRef(null);

  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const activities = data[0].node.frontmatter.items;

  return (
    <StyledContainer id="extracurricular" ref={revealContainer}>
      <Heading>Extracurricular</Heading>
      <StyledTimeline>
        {activities.map((item, i) => (
          <StyledTimelineItem key={i}>
            <StyledDot />
            <StyledDate>{item.period}</StyledDate>
            <StyledCard>
              <StyledDesignation>{item.designation}</StyledDesignation>
              <p style={{ margin: '0 0 14px', color: colors.slate, fontSize: fontSizes.sm }}>
                <StyledInstitution>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      style={{ color: colors.green, textDecoration: 'none' }}>
                      {item.institution}
                    </a>
                  ) : (
                    <span>{item.institution}</span>
                  )}
                </StyledInstitution>
              </p>
              {item.responsibilities && (
                <StyledContent>
                  <ul>
                    {item.responsibilities.map((res, j) => (
                      <li key={j}>{res}</li>
                    ))}
                  </ul>
                </StyledContent>
              )}
            </StyledCard>
          </StyledTimelineItem>
        ))}
      </StyledTimeline>
    </StyledContainer>
  );
};

Extracurricular.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Extracurricular;
