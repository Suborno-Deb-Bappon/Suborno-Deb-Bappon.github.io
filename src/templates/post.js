import React from 'react';
import { graphql, Link } from 'gatsby';
import Helmet from 'react-helmet';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Layout } from '@components';
import getReadingTime from '@utils/readingTime';
import styled from 'styled-components';
import { Main, theme, media } from '@styles';
const { colors } = theme;

const StyledPostContainer = styled(Main)`
  max-width: 1000px;
`;
const StyledPostHeader = styled.header`
  margin-bottom: 50px;
  .tag {
    margin-right: 10px;
  }
`;
const StyledPostContent = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 2em 0 1em;
  }

  p {
    margin: 1em 0;
    line-height: 1.5;
    color: ${colors.lightSlate};
  }
`;

const StyledRelatedSection = styled.div`
  margin: 100px 0;
  padding-top: 50px;
  border-top: 1px solid ${colors.lightestNavy};
`;

const StyledRelatedTitle = styled.h3`
  margin: 0 0 30px;
  color: ${colors.lightestSlate};
`;

const StyledRelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 20px;
  ${media.phablet`grid-template-columns: 1fr;`};
`;

const StyledRelatedCard = styled(Link)`
  padding: 25px;
  background-color: ${colors.lightNavy};
  border-radius: ${theme.borderRadius};
  text-decoration: none;
  transition: ${theme.transition};
  color: ${colors.lightSlate};

  &:hover {
    transform: translateY(-5px);
    background-color: ${colors.lightestNavy};
  }

  h4 {
    margin: 0 0 10px;
    color: ${colors.lightestSlate};
    font-size: 18px;
  }

  span {
    font-size: 14px;
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;
  const allPosts = data.allMarkdownRemark.edges;

  const relatedPosts = allPosts
    .filter(({ node }) => {
      const postTags = node.frontmatter.tags || [];
      return (
        node.frontmatter.slug !== data.markdownRemark.frontmatter.slug &&
        postTags.some(tag => tags.includes(tag))
      );
    })
    .slice(0, 3);

  return (
    <Layout location={location}>
      <Helmet>
        <title>{title} | Suborno Deb Bappon</title>
      </Helmet>

      <StyledPostContainer>
        <span className="breadcrumb">
          <span className="arrow">&larr;</span>
          <Link to="/blogs">All posts</Link>
        </span>

        <StyledPostHeader>
          <h1 className="medium-title">{title}</h1>
          <p className="subtitle">
            <time>
              {new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>&nbsp;·&nbsp;{getReadingTime(html)}</span>
            <span>&nbsp;&mdash;&nbsp;</span>
            {tags &&
              tags.length > 0 &&
              tags.map((tag, i) => (
                <Link key={i} to={`/blogs/tags/${kebabCase(tag)}/`} className="tag">
                  #{tag}
                </Link>
              ))}
          </p>
        </StyledPostHeader>

        <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />

        {relatedPosts.length > 0 && (
          <StyledRelatedSection>
            <StyledRelatedTitle>Related Posts</StyledRelatedTitle>
            <StyledRelatedGrid>
              {relatedPosts.map(({ node }, i) => (
                <StyledRelatedCard key={i} to={node.frontmatter.slug}>
                  <h4>{node.frontmatter.title}</h4>
                  <span>{node.frontmatter.description}</span>
                </StyledRelatedCard>
              ))}
            </StyledRelatedGrid>
          </StyledRelatedSection>
        )}
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 20
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            tags
          }
        }
      }
    }
  }
`;
