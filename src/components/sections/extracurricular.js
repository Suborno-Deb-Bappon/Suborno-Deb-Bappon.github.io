import React from 'react';
import styled from 'styled-components';
import sr from '../../utils/sr';
import { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const ExtraContainer = styled.section`
  max-width: 700px;
  margin: 0 auto 100px;
`;

const Activity = styled.div`
  margin-bottom: 20px;
`;

const Extracurricular = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current), []);

  const data = useStaticQuery(graphql`
    {
      mdx(frontmatter: { title: { eq: "Extracurricular" } }) {
        frontmatter {
          activities {
            title
            description
          }
        }
      }
    }
  `);

  const activities = data.mdx.frontmatter.activities;

  return (
    <ExtraContainer ref={revealContainer}>
      <h2 className="numbered-heading">Extracurricular</h2>
      {activities.map((act, i) => (
        <Activity key={i}>
          <h3>{act.title}</h3>
          <p>{act.description}</p>
        </Activity>
      ))}
    </ExtraContainer>
  );
};

export default Extracurricular;
