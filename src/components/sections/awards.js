import React from 'react';
import styled from 'styled-components';
import sr from '../../utils/sr';
import { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const AwardsContainer = styled.section`
  max-width: 700px;
  margin: 0 auto 100px;
`;

const AwardList = styled.ul`
  list-style: disc;
  padding-left: 20px;
`;

const Awards = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current), []);

  const data = useStaticQuery(graphql`
    {
      mdx(frontmatter: { title: { eq: "Awards & Achievements" } }) {
        frontmatter {
          awards {
            title
          }
        }
      }
    }
  `);

  const awards = data.mdx.frontmatter.awards;

  return (
    <AwardsContainer ref={revealContainer}>
      <h2 className="numbered-heading">Awards & Achievements</h2>
      <AwardList>
        {awards.map((award, i) => (
          <li key={i}>{award.title}</li>
        ))}
      </AwardList>
    </AwardsContainer>
  );
};

export default Awards;
