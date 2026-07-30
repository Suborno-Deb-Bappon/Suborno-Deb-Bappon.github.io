/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');
const _ = require('lodash');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemarkFrontmatterItems {
      name: String!
      journal: String!
      year: String!
      link: String!
      authors: String
      bibtex: String
    }
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');

  const result = await graphql(`
    {
      postsRemark: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
      tagsGroup: allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      educationRemark: allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/education/" } }) {
        edges {
          node {
            id
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
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create post detail pages
  const posts = result.data.postsRemark.edges;

  posts.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      component: postTemplate,
      context: {},
    });
  });

  // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/blogs/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });

  // Create education pages
  const education = result.data.educationRemark.edges;
  education.forEach(({ node }) => {
    if (node.frontmatter.institution) {
      createPage({
        path: `/education/${_.kebabCase(node.frontmatter.institution)}/`,
        component: path.resolve(`src/components/sections/education.js`),
        context: {
          node: node, // Pass the full node object
        },
      });
    } else {
      reporter.warn(
        `Skipping education page creation for node with missing institution: ${node.id}`,
      );
    }
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type CertItem {
      name: String
      nameUrl: String
      description: String
    }

    type MarkdownRemarkFrontmatterCertificationItem {
      category: String
      certifications: [CertItem]
    }

    type MarkdownRemarkFrontmatterItems {
      name: String
      nameUrl: String
      description: String
      url: String 
      institution: String
      degree: String
      year: String
      journal: String
      link: String
      designation: String
      period: String
      responsibilities: [String]
    }

    type MarkdownRemarkFrontmatter {
      title: String
      items: [MarkdownRemarkFrontmatterItems]
      certifications: [MarkdownRemarkFrontmatterCertificationItem]
      avatar: File @fileByRelativePath
      skills: [String]
      buttonText: String
      company: String
      location: String
      range: String
      url: String
      cover: File @fileByRelativePath
      tech: [String]
      github: String
      external: String
      showInProjects: Boolean
      date: Date @dateformat
      slug: String
      tags: [String]
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `);
};
