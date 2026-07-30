import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, media, Section, Heading } from '@styles';

const { colors, fontSizes } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 700px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 30px;
  ${media.tablet`grid-template-columns: 1fr;`};
`;

const StyledCard = styled.div`
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 18px 20px;
  transition: ${theme.transition};
  border: 1px solid transparent;
  border-left: 3px solid rgba(100, 255, 218, 0.25);

  &:hover {
    transform: translateY(-4px);
    background-color: ${colors.lightestNavy};
    border-color: rgba(100, 255, 218, 0.15);
    border-left-color: ${colors.green};
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  }

  ${media.phablet`padding: 14px 16px;`};
`;

const StyledName = styled.h4`
  margin: 0 0 6px;
  font-size: ${fontSizes.md};
  font-weight: 600;
  color: ${colors.lightestSlate};
  line-height: 1.4;

  a {
    color: ${colors.lightestSlate};
    text-decoration: none;
    transition: ${theme.transition};

    &:hover {
      color: ${colors.green};
    }
  }

  ${media.phablet`font-size: ${fontSizes.sm};`};
`;

const StyledDesc = styled.p`
  margin: 0;
  font-size: ${fontSizes.smish};
  color: ${colors.slate};
  line-height: 1.4;

  a {
    color: ${colors.slate};
    text-decoration: none;
    transition: ${theme.transition};

    &:hover {
      color: ${colors.green};
    }
  }

  ${media.phablet`font-size: ${fontSizes.xs};`};
`;

const Awards = ({ data }) => {
  const revealContainer = useRef(null);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const awards = data[0]?.node.frontmatter.items || [];

  return (
    <StyledContainer id="awards" ref={revealContainer}>
      <Heading>Awards & Achievements</Heading>
      <StyledGrid>
        {awards.map(({ name, description, nameUrl, url }, i) => (
          <StyledCard key={i}>
            <StyledName>
              {nameUrl ? (
                <a href={nameUrl} target="_blank" rel="noopener noreferrer">
                  {name}
                </a>
              ) : (
                name
              )}
            </StyledName>
            <StyledDesc>
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {description}
                </a>
              ) : (
                description
              )}
            </StyledDesc>
          </StyledCard>
        ))}
      </StyledGrid>
    </StyledContainer>
  );
};

Awards.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Awards;
