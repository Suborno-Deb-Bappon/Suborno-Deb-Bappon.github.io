import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  max-width: 900px;
`;

const StyledInner = styled.div`
  display: flex;
  flex-direction: row;

  ${media.tablet`
    flex-direction: column;
  `}
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


const StyledTabContent = styled.div`
  position: relative;
  width: 100%;
  padding-left: 30px;
  ${media.tablet`padding-left: 0;`};
`;

const StyledItem = styled.div`
  margin-bottom: 30px;
  padding-left: 25px;
  border-left: 2px solid ${colors.green};
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: -7px;
    top: 6px;
    width: 10px;
    height: 10px;
    background-color: ${colors.green};
    border-radius: 50%;
    z-index: 1;
  }

  h4 {
    margin: 0 0 5px;
    font-size: ${fontSizes.lg};
    font-weight: 600;
    color: ${colors.lightestSlate};

    a {
      color: ${colors.lightestSlate};
      text-decoration: none;
      transition: ${theme.transition};

      &:hover,
      &:focus {
        color: ${colors.green};
        text-decoration: none;
      }
    }

    ${media.phablet`font-size: ${fontSizes.md};`}
  }

  p {
    margin: 0;
    font-size: ${fontSizes.sm};
    color: ${colors.slate};
  }
`;

const Certifications = ({ data }) => {
  const revealContainer = useRef(null);
  const categories = data[0]?.node.frontmatter.items || [];

  const [activeTabId, setActiveTabId] = useState(0);

  useEffect(() => {
    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContainer id="certifications" ref={revealContainer}>
      <Heading>Certifications</Heading>
      <StyledInner>
        <StyledTabList role="tablist">
          {categories.map((item, i) => (
            <li key={i}>
              <StyledTabButton
                isActive={activeTabId === i}
                onClick={() => setActiveTabId(i)}
                id={`tab-${i}`}
                role="tab"
                aria-selected={activeTabId === i ? true : false}
                aria-controls={`panel-${i}`}
                tabIndex={activeTabId === i ? '0' : '-1'}>
                <span>{item.category}</span>
              </StyledTabButton>
            </li>
          ))}
          <StyledHighlight activeTabId={activeTabId} />
        </StyledTabList>
        <StyledTabContent>
          {categories[activeTabId] &&
            categories[activeTabId].certifications.map(({ name, nameUrl, description }, i) => (
              <StyledItem key={i}>
                <h4>
                  {nameUrl ? (
                    <a href={nameUrl} target="_blank" rel="noopener noreferrer">
                      {name}
                    </a>
                  ) : (
                    name
                  )}
                </h4>
                <p>{description}</p>
              </StyledItem>
            ))}
        </StyledTabContent>
      </StyledInner>
    </StyledContainer>
  );
};

Certifications.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Certifications;



// import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import sr from '@utils/sr';
// import { srConfig } from '@config';
// import styled from 'styled-components';
// import { theme, mixins, media, Section, Heading } from '@styles';

// const { colors, fontSizes } = theme;

// const StyledContainer = styled(Section)`
//   position: relative;
//   max-width: 700px;
// `;

// const StyledItem = styled.div`
//   margin-bottom: 30px;
//   padding-left: 25px;
//   border-left: 2px solid ${colors.green};
//   position: relative;

//   &:before {
//     content: '';
//     position: absolute;
//     left: -7px;
//     top: 6px;
//     width: 10px;
//     height: 10px;
//     background-color: ${colors.green};
//     border-radius: 50%;
//     z-index: 1;
//   }

//   h4 {
//     margin: 0 0 5px;
//     font-size: ${fontSizes.lg};
//     font-weight: 600;
//     color: ${colors.lightestSlate};

//     a {
//       color: ${colors.lightestSlate};
//       text-decoration: none;
//       transition: ${theme.transition};
//       cursor: pointer;

//       &:hover,
//       &:focus {
//         color: ${colors.green};
//         text-decoration: none;
//       }
//     }

//     ${media.phablet`
//       font-size: ${fontSizes.md};
//     `}
//   }

//   p {
//     margin: 0;
//     font-size: ${fontSizes.sm};
//     color: ${colors.slate};
//   }
// `;

// const Certifications = ({ data }) => {
//   const revealContainer = useRef(null);

//   useEffect(() => {
//     sr.reveal(revealContainer.current, srConfig());
//   }, []);

//   const certs = data[0]?.node.frontmatter.items || [];

//   return (
//     <StyledContainer id="certifications" ref={revealContainer}>
//       <Heading>Certifications</Heading>
//       <div>
//         {certs.map(({ name, nameUrl, description }, i) => (
//           <StyledItem key={i}>
//             <h4>
//               {nameUrl ? (
//                 <a href={nameUrl} target="_blank" rel="noopener noreferrer">
//                   {name}
//                 </a>
//               ) : (
//                 name
//               )}
//             </h4>
//             <p>{description}</p>
//           </StyledItem>
//         ))}
//       </div>
//     </StyledContainer>
//   );
// };

// Certifications.propTypes = {
//   data: PropTypes.array.isRequired,
// };

// export default Certifications;
