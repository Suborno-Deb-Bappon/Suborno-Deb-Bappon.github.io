import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, media, Section, Heading } from '@styles';
const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 700px;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 30px;
  ${media.tablet`grid-template-columns: 1fr;`};
  ${media.phone`gap: 12px;`};
`;

const StyledCard = styled.div`
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  padding: 22px 24px;
  transition: ${theme.transition};
  border: 1px solid transparent;

  &:hover {
    transform: translateY(-5px);
    background-color: ${colors.lightestNavy};
    border-color: rgba(100, 255, 218, 0.15);
    box-shadow: 0 10px 30px -15px rgba(2, 12, 27, 0.7);
  }
`;

const StyledCategoryName = styled.h4`
  color: ${colors.green};
  font-size: ${fontSizes.lg};
  font-family: ${fonts.SFMono};
  font-weight: 500;
  margin: 0 0 14px;
  line-height: 1.3;
  ${media.phablet`font-size: ${fontSizes.md};`};
`;

const StyledPillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const StyledPill = styled.span`
  display: inline-block;
  color: ${colors.lightSlate};
  background-color: rgba(100, 255, 218, 0.04);
  border: 1px solid rgba(100, 255, 218, 0.15);
  border-radius: 4px;
  padding: 4px 10px;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  line-height: 1.4;
  transition: ${theme.transition};

  ${StyledCard}:hover & {
    color: ${colors.green};
    border-color: rgba(100, 255, 218, 0.35);
    background-color: rgba(100, 255, 218, 0.07);
  }
`;

const Skills = ({ data }) => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

  const skillGroups = data[0]?.node.frontmatter.items || [];

  return (
    <StyledContainer id="skills" ref={revealContainer}>
      <Heading>Skills</Heading>
      <StyledGrid>
        {skillGroups.map(({ name, description }, i) => {
          let skillsArray = [];
          try {
            skillsArray = description ? JSON.parse(description) : [];
            if (!Array.isArray(skillsArray)) {
              skillsArray = [description];
            }
          } catch (e) {
            skillsArray = [description];
          }

          return (
            <StyledCard key={i}>
              <StyledCategoryName>{name}</StyledCategoryName>
              <StyledPillsWrapper>
                {skillsArray.map((item, j) => (
                  <StyledPill key={j}>{item}</StyledPill>
                ))}
              </StyledPillsWrapper>
            </StyledCard>
          );
        })}
      </StyledGrid>
    </StyledContainer>
  );
};

Skills.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Skills;
