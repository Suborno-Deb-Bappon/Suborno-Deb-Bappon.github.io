import React from 'react';
import styled from 'styled-components';
import sr from '../../utils/sr';
import { useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

const PublicationsContainer = styled.section`
  max-width: 700px;
  margin: 0 auto 100px;
`;

const Publication = styled.div`
  margin-bottom: 30px;
`;

const Publications = () => {
  const revealContainer = useRef(null);
  useEffect(() => sr.reveal(revealContainer.current), []);

  const data = useStaticQuery(graphql`
    {
      mdx(frontmatter: { title: { eq: "Publications" } }) {
        frontmatter {
          publications {
            title
            journal
            link
            year
          }
        }
      }
    }
  `);

  const publications = data.mdx.frontmatter.publications;

  return (
    <PublicationsContainer ref={revealContainer}>
      <h2 className="numbered-heading">Publications</h2>
      {publications.map((pub, i) => (
        <Publication key={i}>
          <h3>{pub.title}</h3>
          <p><em>{pub.journal}</em> • {pub.year}</p>
          {pub.link && (
            <a href={pub.link} target="_blank" rel="noopener noreferrer">
              Read Publication
            </a>
          )}
        </Publication>
      ))}
    </PublicationsContainer>
  );
};

export default Publications;
