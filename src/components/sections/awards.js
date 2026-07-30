// import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import sr from '@utils/sr';
// import { srConfig } from '@config';
// import styled from 'styled-components';
// import { theme, mixins, media, Section, Heading } from '@styles';
// const { colors, fontSizes, fonts } = theme;

// const StyledContainer = styled(Section)`
//   position: relative;
//   max-width: 700px;
// `;
// const StyledTabs = styled.div`
//   display: flex;
//   align-items: flex-start;
//   position: relative;
//   ${media.thone`
//     display: block;
//   `};
// `;
// const StyledTabList = styled.ul`
//   display: block;
//   position: relative;
//   width: max-content;
//   z-index: 3;
//   padding: 0;
//   margin: 0;
//   list-style: none;

//   ${media.thone`
//     display: flex;
//     overflow-x: scroll;
//     margin-bottom: 30px;
//     width: calc(100% + 100px);
//     margin-left: -50px;
//   `};
//   ${media.phablet`
//     width: calc(100% + 50px);
//     margin-left: -25px;
//   `};

//   li {
//     &:first-of-type {
//       ${media.thone`
//         margin-left: 50px;
//       `};
//       ${media.phablet`
//         margin-left: 25px;
//       `};
//     }
//     &:last-of-type {
//       ${media.thone`
//         padding-right: 50px;
//       `};
//       ${media.phablet`
//         padding-right: 25px;
//       `};
//     }
//   }
// `;
// const StyledTabButton = styled.button`
//   ${mixins.link};
//   display: flex;
//   align-items: center;
//   width: 100%;
//   background-color: transparent;
//   height: ${theme.tabHeight}px;
//   padding: 0 20px 2px;
//   transition: ${theme.transition};
//   border-left: 2px solid ${colors.lightestNavy};
//   text-align: left;
//   white-space: nowrap;
//   font-family: ${fonts.SFMono};
//   font-size: ${fontSizes.smish};
//   color: ${props => (props.isActive ? colors.green : colors.slate)};
//   ${media.tablet`padding: 0 15px 2px;`};
//   ${media.thone`
//     ${mixins.flexCenter};
//     padding: 0 15px;
//     text-align: center;
//     border-left: 0;
//     border-bottom: 2px solid ${colors.lightestNavy};
//     min-width: 120px;
//   `};
//   &:hover,
//   &:focus {
//     background-color: ${colors.lightNavy};
//   }
// `;
// const StyledHighlight = styled.span`
//   display: block;
//   background: ${colors.green};
//   width: 2px;
//   height: ${theme.tabHeight}px;
//   border-radius: ${theme.borderRadius};
//   position: absolute;
//   top: 0;
//   left: 0;
//   transition: transform 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
//   transition-delay: 0.1s;
//   z-index: 10;
//   transform: translateY(
//     ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabHeight : 0)}px
//   );
//   ${media.thone`
//     width: 100%;
//     max-width: ${theme.tabWidth}px;
//     height: 2px;
//     top: auto;
//     bottom: 0;
//     transform: translateX(
//       ${props => (props.activeTabId > 0 ? props.activeTabId * theme.tabWidth : 0)}px
//     );
//     margin-left: 50px;
//   `};
//   ${media.phablet`
//     margin-left: 25px;
//   `};
// `;
// const StyledTabContent = styled.div`
//   position: relative;
//   width: 100%;
//   height: auto;
//   padding-top: 12px;
//   padding-left: 30px;
//   ${media.tablet`padding-left: 20px;`};
//   ${media.thone`padding-left: 0;`};

//   ul {
//     ${mixins.fancyList};
//   }
//   a {
//     ${mixins.inlineLink};
//   }
// `;
// const StyledAwardTitle = styled.h4`
//   color: ${colors.lightestSlate};
//   font-size: ${fontSizes.xxl};
//   font-weight: 500;
//   margin-bottom: 5px;
// `;
// const StyledAwardDetails = styled.h5`
//   font-family: ${fonts.SFMono};
//   font-size: ${fontSizes.smish};
//   font-weight: normal;
//   letter-spacing: 0.05em;
//   color: ${colors.lightSlate};
//   margin-bottom: 30px;
// `;

// const Awards = ({ data }) => {
//   const [activeTabId, setActiveTabId] = useState(0);
//   const [tabFocus, setTabFocus] = useState(null);
//   const tabs = useRef([]);

//   const revealContainer = useRef(null);
//   useEffect(() => sr.reveal(revealContainer.current, srConfig()), []);

//   const awards = data[0]?.node.frontmatter.items || [];

//   const focusTab = () => {
//     if (tabs.current[tabFocus]) {
//       tabs.current[tabFocus].focus();
//     } else {
//       if (tabFocus >= tabs.current.length) {
//         setTabFocus(0);
//       }
//       if (tabFocus < 0) {
//         setTabFocus(tabs.current.length - 1);
//       }
//     }
//   };

//   useEffect(() => focusTab(), [tabFocus]);

//   const onKeyPressed = e => {
//     if (e.keyCode === 38 || e.keyCode === 40) {
//       e.preventDefault();
//       if (e.keyCode === 40) {
//         setTabFocus(tabFocus + 1);
//       } else if (e.keyCode === 38) {
//         setTabFocus(tabFocus - 1);
//       }
//     }
//   };

//   return (
//     <StyledContainer id="awards" ref={revealContainer}>
//       <Heading>Awards & Achievements</Heading>
//       <StyledTabs>
//         <StyledTabList role="tablist" aria-label="Awards tabs" onKeyDown={e => onKeyPressed(e)}>
//           {awards.map(({ name }, i) => (
//             <li key={i}>
//               <StyledTabButton
//                 isActive={activeTabId === i}
//                 onClick={() => setActiveTabId(i)}
//                 ref={el => (tabs.current[i] = el)}
//                 id={`tab-${i}`}
//                 role="tab"
//                 aria-selected={activeTabId === i ? true : false}
//                 aria-controls={`panel-${i}`}
//                 tabIndex={activeTabId === i ? '0' : '-1'}>
//                 <span>{name}</span>
//               </StyledTabButton>
//             </li>
//           ))}
//           <StyledHighlight activeTabId={activeTabId} />
//         </StyledTabList>

//         {awards.map(({ name, description }, i) => (
//           <StyledTabContent
//             key={i}
//             isActive={activeTabId === i}
//             id={`panel-${i}`}
//             role="tabpanel"
//             aria-labelledby={`tab-${i}`}
//             tabIndex={activeTabId === i ? '0' : '-1'}
//             hidden={activeTabId !== i}>
//             <StyledAwardTitle>
//               <span>{name}</span>
//             </StyledAwardTitle>
//             <StyledAwardDetails>
//               <span>Award</span>
//             </StyledAwardDetails>
//             <div dangerouslySetInnerHTML={{ __html: description || '' }} />
//           </StyledTabContent>
//         ))}
//       </StyledTabs>
//     </StyledContainer>
//   );
// };

// Awards.propTypes = {
//   data: PropTypes.array.isRequired,
// };

// export default Awards;

// import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import sr from '@utils/sr';
// import { srConfig } from '@config';
// import styled from 'styled-components';
// import { theme, mixins, media, Section, Heading } from '@styles';

// const { colors, fontSizes } = theme;

// const StyledContainer = styled(Section)`
//   position: relative;
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
//       ${mixins.inlineLink};
//       font-size: ${fontSizes.lg};
//       position: relative;
//       z-index: 2;
//     }

//     ${media.phablet`
//       font-size: ${fontSizes.md};
//     `}
//   }

//   p {
//     margin: 0;
//     font-size: ${fontSizes.sm};
//     color: ${colors.slate};

//     a {
//       ${mixins.inlineLink};
//       font-size: ${fontSizes.sm};
//       position: relative;
//       z-index: 2;
//     }
//   }
// `;

// const Awards = ({ data }) => {
//   const revealContainer = useRef(null);

//   useEffect(() => {
//     sr.reveal(revealContainer.current, srConfig());
//   }, []);

//   const awards = data[0]?.node.frontmatter.items || [];

//   return (
//     <StyledContainer id="awards" ref={revealContainer}>
//       <Heading>Awards & Achievements</Heading>
//       <div>
//         {awards.map(({ name, description, nameUrl, url }, i) => (
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
//             <p>
//               {url ? (
//                 <a href={url} target="_blank" rel="noopener noreferrer">
//                   {description}
//                 </a>
//               ) : (
//                 description
//               )}
//             </p>
//           </StyledItem>
//         ))}
//       </div>
//     </StyledContainer>
//   );
// };

// Awards.propTypes = {
//   data: PropTypes.array.isRequired,
// };

// export default Awards;


import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import sr from '@utils/sr';
import { srConfig } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';

const { colors, fontSizes } = theme;

const StyledContainer = styled(Section)`
  position: relative;
  max-width: 700px;
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
    pointer-events: none; /* Important: allows links to be clickable */
  }

  h4 {
    margin: 0 0 5px;
    font-size: ${fontSizes.lg};
    font-weight: 600;
    color: ${colors.lightestSlate};

    // a {
    //   ${mixins.inlineLink};
    //   font-size: ${fontSizes.lg};
    //   text-decoration: underline;
    //   cursor: pointer;
    // }

    a {
      color: ${colors.lightestSlate};         // 🟫 Default muted text
      text-decoration: none;
      transition: ${theme.transition};
      cursor: pointer;

      &:hover,
      &:focus {
        color: ${colors.green};       // 🟩 On hover: change color
        text-decoration: none;   // 🟩 Add underline
      }
    }


    ${media.phablet`
      font-size: ${fontSizes.md};
    `}
  }

  p {
    margin: 0;
    font-size: ${fontSizes.sm};
    color: ${colors.slate};  // same as subtitle in Extracurricular

    a {
      color: ${colors.slate};  // same default as description
      text-decoration: none;
      transition: ${theme.transition};
      cursor: pointer;

      &:hover,
      &:focus {
        color: ${colors.green};
        text-decoration: none;
      }
    }
  }
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
      <div>
        {awards.map(({ name, description, nameUrl, url }, i) => (
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
            <p>
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {description}
                </a>
              ) : (
                description
              )}
            </p>
          </StyledItem>
        ))}
      </div>
    </StyledContainer>
  );
};

Awards.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Awards;

