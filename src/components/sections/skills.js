import React from 'react';
import styled from 'styled-components';
import sr from '../../utils/sr';
import { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const SkillsContainer = styled.section`
  max-width: 700px;
  margin: 0 auto 100px;
`;

const SkillList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(140px, 200px));
  gap: 0.5rem;
  list-style: none;
`;

const Skills = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current), []);

  const data = useStaticQuery(graphql`
    {
      mdx(frontmatter: { title: { eq: "Skills" } }) {
        frontmatter {
          skills {
            name
          }
        }
      }
    }
  `);

  const skills = data.mdx.frontmatter.skills;

  return (
    <SkillsContainer ref={revealContainer}>
      <h2 className="numbered-heading">Skills</h2>
      <SkillList>
        {skills.map((skill, i) => (
          <li key={i}>{skill.name}</li>
        ))}
      </SkillList>
    </SkillsContainer>
  );
};

export default Skills;
