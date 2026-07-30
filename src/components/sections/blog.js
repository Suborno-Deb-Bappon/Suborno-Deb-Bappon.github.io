import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { FormattedIcon } from '@components/icons';
import styled from 'styled-components';
import { theme, mixins, media, Section, Heading } from '@styles';
import moment from 'moment';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
`;

const StyledProject = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  margin-bottom: 100px;
  ${media.thone`
    margin-bottom: 70px;
  `};
  &:last-of-type {
    margin-bottom: 0;
  }
  &:nth-of-type(odd) {
    ${StyledContent} {
      grid-column: 7 / -1;
      text-align: left;
      ${media.thone`
        grid-column: 1 / -1;
        padding: 40px 40px 30px;
      `};
      ${media.phablet`padding: 30px 25px 20px;`};
    }
    ${StyledTechList} {
      justify-content: flex-end;
      li {
        margin-left: ${theme.margin};
        margin-right: 0;
      }
    }
    ${StyledLinkWrapper} {
      justify-content: flex-end;
      margin-left: 0;
      margin-right: -10px;
    }
  }
`;

const StyledContent = styled.div`
  position: relative;
  grid-column: 1 / 7;
  grid-row: 1 / -1;
  ${media.thone`
    grid-column: 1 / -1;
    padding: 40px 40px 30px;
    z-index: 5;
  `};
  ${media.phablet`padding: 30px 25px 20px;`};
`;

const StyledLabel = styled.h4`
  font-size: ${fontSizes.smish};
  font-weight: normal;
  color: ${colors.green};
  font-family: ${fonts.SFMono};
  margin-top: 10px;
  padding-top: 0;
`;

const StyledProjectName = styled.h5`
  font-size: 28px;
  margin: 0 0 20px;
  color: ${colors.lightestSlate};
  ${media.tablet`font-size: 24px;`};
  ${media.thone`color: ${colors.white};`};
  a {
    ${media.tablet`display: block;`};
  }
`;

const StyledDescription = styled.div`
  ${mixins.boxShadow};
  position: relative;
  z-index: 2;
  padding: 25px;
  background-color: ${colors.lightNavy};
  color: ${colors.lightSlate};
  font-size: ${fontSizes.lg};
  border-radius: ${theme.borderRadius};
  ${media.thone`
    background-color: transparent;
    padding: 20px 0;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  `};
  p {
    margin: 0;
  }
  a {
    ${mixins.inlineLink};
  }
`;

const StyledTechList = styled.ul`
  position: relative;
  z-index: 2;
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  margin: 25px 0 10px;
  list-style: none;

  li {
    font-family: ${fonts.SFMono};
    font-size: ${fontSizes.smish};
    color: ${colors.green};
    margin-right: ${theme.margin};
    margin-bottom: 7px;
    white-space: nowrap;
    &:last-of-type {
      margin-right: 0;
    }
    ${media.thone`
      color: ${colors.green};
      margin-right: 10px;
    `};
  }
`;

const StyledLinkWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-top: 10px;
  margin-left: -10px;
  color: ${colors.lightestSlate};
  a {
    padding: 10px;
    svg {
      width: 22px;
      height: 22px;
    }
  }
`;

const Blog = ({ data }) => {
  const blogPosts = data.filter(({ node }) => node && !node.frontmatter.draft).slice(0, 3);

  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  useEffect(() => {
    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledContainer id="blog">
      <Heading ref={revealTitle}>
        Blog
        <a href="/blog" style={{ marginLeft: '1rem', fontSize: '0.8em', fontWeight: 'normal', color: colors.green }}>
          View all posts →
        </a>
      </Heading>

      <div>
        {blogPosts &&
          blogPosts.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { title, description, date, slug, tags } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <StyledContent>
                  <StyledLabel>
                    {moment(date).format('MMMM Do, YYYY')}
                  </StyledLabel>
                  <StyledProjectName>
                    <Link to={slug} aria-label={`Read ${title}`}>
                      {title}
                    </Link>
                  </StyledProjectName>
                  <StyledDescription dangerouslySetInnerHTML={{ __html: description || html.substring(0, 300) }} />
                  {tags && (
                    <StyledTechList>
                      {tags.map((tag, i) => (
                        <li key={i}>{tag}</li>
                      ))}
                    </StyledTechList>
                  )}
                  <StyledLinkWrapper>
                    <Link to={slug} aria-label={`Read ${title}`}>
                      <FormattedIcon name="ArrowRight" />
                    </Link>
                  </StyledLinkWrapper>
                </StyledContent>
              </StyledProject>
            );
          })}
      </div>
    </StyledContainer>
  );
};

Blog.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Blog;