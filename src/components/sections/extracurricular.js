import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 900px;
`;

const StyledFlexContainer = styled.div`
  display: flex;
  align-items: flex-start;

  ${media.tablet`
    display: block;
  `}
`;

const StyledTabList = styled.ul`
  display: block;
  position: relative;
  width: max-content;
  z-index: 3;
  padding: 0;
  margin: 0;
  list-style: none;

  ${media.thone`
    display: flex;
    overflow-x: scroll;
    margin-bottom: 30px;
    width: calc(100% + 100px);
    margin-left: -50px;
  `};
  ${media.phablet`
    width: calc(100% + 50px);
    margin-left: -25px;
  `};

  li {
    &:first-of-type {
      ${media.thone`
        margin-left: 50px;
      `};
      ${media.phablet`
        margin-left: 25px;
      `};
    }
    &:last-of-type {
      ${media.thone`
        padding-right: 50px;
      `};
      ${media.phablet`
        padding-right: 25px;
      `};
    }
  }
`;

const StyledTabButton = styled.button`
  ${mixins.link};
  display: flex;
  align-items: center;
  width: 100%;
  background-color: transparent;
  height: ${theme.tabHeight}px;
  padding: 0 20px 2px;
  transition: ${theme.transition};
  border-left: 2px solid ${colors.lightestNavy};
  text-align: left;
  white-space: nowrap;
  word-break: break-word;
  font-family: ${fonts.SFMono};
  font-size: ${fontSizes.smish};
  color: ${props => (props.isActive ? colors.green : colors.slate)};
  ${media.tablet`padding: 0 15px 2px;`};
  ${media.thone`
    ${mixins.flexCenter};
    padding: 0 15px;
    text-align: center;
    border-left: 0;
    border-bottom: 2px solid ${colors.lightestNavy};
    min-width: 120px;
  `};
  &:hover,
  &:focus {
    background-color: ${colors.lightNavy};
  }
`;

const StyledHighlight = styled.span`
  display: block;
  background: ${colors.green};
  width: 2px;
  height: ${theme.tabHeight}px;
  border-radius: ${theme.borderRadius};
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  transition-delay: 0.1s;
  z-index: 10;
  transform: translateY(
    ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabHeight : 0)}px
  );
  ${media.thone`
    width: 100%;
    max-width: ${theme.tabWidth}px;
    height: 2px;
    top: auto;
    bottom: 0;
    transform: translateX(
      ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabWidth : 0)}px
    );
    margin-left: 50px;
  `};
  ${media.phablet`
    margin-left: 25px;
  `};
`;

const StyledContent = styled.div`
  width: 100%;
  padding-left: 30px;

  ${media.tablet`padding-left: 0;`}
`;

const StyledDetails = styled.div`
  h4 {
    font-size: ${fontSizes.xl};
    color: ${colors.lightestSlate};
    font-weight: 600;
    margin-bottom: 5px;

    span {
      font-weight: normal;
      color: ${colors.green};
    }

    a {
      ${mixins.inlineLink};
    }
  }

  .range {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.slate};
    margin-bottom: 20px;
  }

  ul {
    ${mixins.fancyList};
  }
`;

const Extracurricular = ({ data }) => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);

  useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);
  useEffect(() => {
    if (tabFocus !== null && tabs.current[tabFocus]) tabs.current[tabFocus].focus();
  }, [tabFocus]);

  const activities = data[0].node.frontmatter.items;

  const onKeyPressed = e => {
    if (e.keyCode === 38) setTabFocus(tabFocus - 1);
    if (e.keyCode === 40) setTabFocus(tabFocus + 1);
  };

  return (
    <StyledContainer id="extracurricular" ref={revealContainer}>
      <Heading>Extracurricular</Heading>
      <StyledFlexContainer>
        <StyledTabList role="tablist" aria-label="Extracurricular tabs" onKeyDown={onKeyPressed}>
          {activities.map((item, i) => (
            <li key={i}>
              <StyledTabButton
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                ref={el => (tabs.current[i] = el)}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTabId === i}
                aria-controls={`panel-${i}`}
                tabIndex={activeTabId === i ? '0' : '-1'}>
                {item.institution}
              </StyledTabButton>
            </li>
          ))}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>

        <StyledContent>
          {activities.map((item, i) => (
            <div
              key={i}
              hidden={activeTabId !== i}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              tabIndex="0">
              <StyledDetails>
                <h4>
                  {item.designation}
                  <span style={{ color: colors.green }}> @</span>
                  <br />
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.institution}
                    </a>
                  ) : (
                    item.institution
                  )}
                </h4>


                <p className="range">{item.period}</p>
                {item.responsibilities && (
                  <ul>
                    {item.responsibilities.map((res, j) => (
                      <li key={j}>{res}</li>
                    ))}
                  </ul>
                )}
              </StyledDetails>
            </div>
          ))}
        </StyledContent>
      </StyledFlexContainer>
    </StyledContainer>
  );
};

Extracurricular.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Extracurricular;