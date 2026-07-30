import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Certifications from '@components/sections/certifications';
import {
  Layout,
  Hero,
  About,
  Jobs,
  Featured,
  Projects,
  Contact,
  Skills,
  Education,
  Publications,
  Extracurricular,
  Awards,
  Blog,
} from '@components';
import styled from 'styled-components';
import { Main } from '@styles';

const StyledMainContainer = styled(Main)`
  counter-reset: section;
`;

const IndexPage = ({ location, data }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <div id="hero"><Hero data={data.hero.edges} /></div>
      <div id="about"><About data={data.about.edges} /></div>
      <div id="skills"><Skills data={data.skills.edges} /></div>
      <div id="education"><Education data={data.education.edges} /></div>
      <div id="jobs"><Jobs data={data.jobs.edges} /></div>
      <div id="featured"><Featured data={data.featured.edges} /></div>
      <div id="projects"><Projects data={data.projects.edges} /></div>
      <div id="publications"><Publications data={data.publications.edges} /></div>
      <div id="certifications"><Certifications data={data.certifications.edges} /></div>
      <div id="extracurricular"><Extracurricular data={data.extracurricular.edges} /></div>
      <div id="awards"><Awards data={data.awards.edges} /></div>
      <div id="blog"><Blog data={data.blog.edges} /></div>
      <div id="contact"><Contact data={data.contact.edges} /></div>
    </StyledMainContainer>
  </Layout>
);

IndexPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const pageQuery = graphql`
  {
    hero: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/hero/" } }) {
      edges {
        node {
          frontmatter {
            title
            name
            subtitle
            buttonText
          }
          html
        }
      }
    }
    about: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
      edges {
        node {
          frontmatter {
            title
            avatar {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            skills
          }
          html
        }
      }
    }
    skills: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/skills/" } }) {
      edges {
        node {
          frontmatter {
            title
            items {
              name
              description
            }
          }
        }
      }
    }
    education: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/education/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            institution
            degree
            year
            url
          }
          html
        }
      }
    }
    jobs: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/jobs/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            company
            location
            range
            url
          }
          html
        }
      }
    }
    featured: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/featured/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            cover {
              childImageSharp {
                fluid(maxWidth: 700, quality: 90, traceSVG: { color: "#64ffda" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            tech
            github
            external
          }
          html
        }
      }
    }
    projects: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { showInProjects: { ne: false } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tech
            github
            external
          }
          html
        }
      }
    }

    certifications: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/certifications/" } }
    ) {
      edges {
        node {
          frontmatter {
            title
            items {
              category
              certifications {
                name
                nameUrl
                description
              }
            }
          }
        }
      }
    }


    

    extracurricular: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/extracurricular/" } }) {
    edges {
      node {
        frontmatter {
          title
          items {
            institution
            designation
            period
            responsibilities
            url
          }
        }
      }
    }
  }


    awards: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/awards/" } }) {
      edges {
        node {
          frontmatter {
            title
            items {
              name
              nameUrl
              description
              url
            }
          }
        }
      }
    }
    blog: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            date
            slug
            tags
            draft
          }
          html
        }
      }
    }

    publications: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/publications/" } }) {
      edges {
        node {
          frontmatter {
            title
            items {
              name
              journal
              year
              link
              authors
              bibtex
            }
          }
        }
      }
    }
    contact: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/contact/" } }) {
      edges {
        node {
          frontmatter {
            title
            buttonText
          }
          html
        }
      }
    }
  }
`;