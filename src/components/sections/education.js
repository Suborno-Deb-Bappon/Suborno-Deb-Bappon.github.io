import React from 'react';
import styled from 'styled-components';
import sr from '../../utils/sr';
import { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const EducationContainer = styled.section`
  max-width: 700px;
  margin: 0 auto 100px;
`;

const Education = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current), []);

  const data = useStaticQuery(graphql`
    {
      mdx(frontmatter: { title: { eq: "Education" } }) {
        frontmatter {
          education {
            institution
            degree
            year
            description
          }
        }
      }
    }
  `);

  const educationList = data.mdx.frontmatter.education;

  return (
    <EducationContainer ref={revealContainer}>
      <h2 className="numbered-heading">Education</h2>
      {educationList.map((edu, i) => (
        <div key={i}>
          <h3>{edu.institution}</h3>
          <p>{edu.degree} | {edu.year}</p>
          <p>{edu.description}</p>
        </div>
      ))}
    </EducationContainer>
  );
};

export default Education;
