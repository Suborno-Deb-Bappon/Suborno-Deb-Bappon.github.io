import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, media, Section, Heading } from '@styles';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  max-width: 700px;
`;

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 30px;
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

  ${media.phablet`padding: 18px;`};
`;

const StyledCategoryName = styled.h4`
  color: ${colors.green};
  font-size: ${fontSizes.lg};
  font-family: ${fonts.SFMono};
  font-weight: 500;
  margin: 0 0 16px;
  line-height: 1.3;
  ${media.phablet`font-size: ${fontSizes.md};`};
`;

const StyledMiniGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  ${media.phablet`grid-template-columns: 1fr;`};
`;

const StyledMiniCard = styled.a`
  display: block;
  background-color: rgba(100, 255, 218, 0.04);
  border: 1px solid rgba(100, 255, 218, 0.12);
  border-radius: 4px;
  padding: 12px 14px;
  text-decoration: none;
  transition: ${theme.transition};

  &:hover {
    background-color: rgba(100, 255, 218, 0.08);
    border-color: rgba(100, 255, 218, 0.35);
    transform: translateY(-2px);
  }
`;

const StyledMiniName = styled.div`
  color: ${colors.lightestSlate};
  font-size: ${fontSizes.sm};
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 4px;
  transition: ${theme.transition};

  ${StyledMiniCard}:hover & {
    color: ${colors.green};
  }

  ${media.phablet`font-size: ${fontSizes.smish};`};
`;

const StyledMiniIssuer = styled.div`
  color: ${colors.slate};
  font-size: ${fontSizes.smish};
  line-height: 1.3;
  ${media.phablet`font-size: ${fontSizes.xs};`};
`;

const Certifications = ({ data }) => {
  const revealContainer = useRef(null);
  const categories = data[0]?.node.frontmatter.items || [];

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContainer id="certifications" ref={revealContainer}>
      <Heading>Certifications</Heading>
      <StyledGrid>
        {categories.map((item, i) => (
          <StyledCard key={i}>
            <StyledCategoryName>{item.category}</StyledCategoryName>
            <StyledMiniGrid>
              {item.certifications.map(({ name, nameUrl, description }, j) => {
                const content = (
                  <>
                    <StyledMiniName>{name}</StyledMiniName>
                    <StyledMiniIssuer>{description}</StyledMiniIssuer>
                  </>
                );
                return nameUrl ? (
                  <StyledMiniCard key={j} href={nameUrl} target="_blank" rel="noopener noreferrer">
                    {content}
                  </StyledMiniCard>
                ) : (
                  <StyledMiniCard key={j} as="div">
                    {content}
                  </StyledMiniCard>
                );
              })}
            </StyledMiniGrid>
          </StyledCard>
        ))}
      </StyledGrid>
    </StyledContainer>
  );
};

Certifications.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Certifications;
