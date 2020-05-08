import { graphql } from 'gatsby';
import * as React from 'react';
import { css } from 'emotion';
import Helmet from 'react-helmet';
import MessengerCustomerChat from 'react-messenger-customer-chat';

import Footer from '../components/Footer';
import PostCard from '../components/PostCard';
import Wrapper from '../components/Wrapper';
import Splash from '../components/Splash';
import Faq from '../components/Faq';
import Clients from '../components/Clients';
import Introduce from '../components/Introduce/Introduce';
import IndexLayout from '../layouts';
import config from '../website-config';
import {
  inner,
  outer,
  PostFeed,
  PostFeedRaise,
  SiteDescription,
  SiteHeader,
  SiteHeaderContent,
  SiteMain,
  SiteTitle,
} from '../styles/shared';
import { PageContext } from '../templates/post';
import Testimonial from '../components/Testimonial';
import Arrow from '../components/icons/arrow';

// tslint:disable-next-line:no-import-side-effect
import 'slick-carousel/slick/slick.css';
// tslint:disable-next-line:no-import-side-effect
import 'slick-carousel/slick/slick-theme.css';
import HighlightedProject from '../components/HighlightedProject';
import SiteNav from '../components/header/SiteNav';

const HomePosts = css`
  /* @media (min-width: 795px) {
    .post-card:nth-child(6n + 1):not(.no-image) {
      flex: 1 1 100%;
      flex-direction: row;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-image-link {
      position: relative;
      flex: 1 1 auto;
      border-radius: 5px 0 0 5px;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-image {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-content {
      flex: 0 1 357px;
    }

    .post-card:nth-child(6n + 1):not(.no-image) h2 {
      font-size: 2.6rem;
    }

    .post-card:nth-child(6n + 1):not(.no-image) p {
      font-size: 1.8rem;
      line-height: 1.55em;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-content-link {
      padding: 30px 40px 0;
    }

    .post-card:nth-child(6n + 1):not(.no-image) .post-card-meta {
      padding: 0 40px 30px;
    }
  } */

  .getMore_container {
    max-width: 300px;
    margin-left: 70px;
    max-width: 300px;
    margin-left: 70px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 410px;
  }

  .getMore_title {
    font-family: Saira;
    text-align: right;
    color: black;
  }

  .getMore_link {
    align-self: flex-end;
    font-size: 30px;
    line-height: 44px;
    color: #474747;
    font-weight: bold;
  }

  .arrow {
    display: inline-block;
    margin-left: 30px;
    height: 45px;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  }
`;

export interface IndexProps {
  pageContext: {
    langKey: string;
    slug: string;
  };
  data: {
    logo: {
      childImageSharp: {
        fixed: any;
      };
    };
    header: {
      childImageSharp: {
        fluid: any;
      };
    };
    bg_intro: {
      childImageSharp: {
        fluid: any;
      };
    };
    title_icon: {
      childImageSharp: {
        fluid: any;
      };
    };
    help: {
      childImageSharp: {
        fluid: any;
      };
    };
    projects: {
      edges: {
        node: PageContext;
      }[];
    };
    posts: {
      edges: {
        node: PageContext;
      }[];
    };
  };
}

const IndexPage: React.FunctionComponent<IndexProps> = props => {
  const width = props.data.header.childImageSharp.fluid.sizes.split(', ')[1].split('px')[0];
  const height = String(Number(width) / props.data.header.childImageSharp.fluid.aspectRatio);
  const linkPrefix = props.langKey === 'en' ? '' : props.langKey;
  return (
    <IndexLayout langKey="en" className={`${HomePosts}`}>
      <Helmet>
        <html lang={config.lang} />
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        <meta property="og:site_name" content={config.title} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:url" content={config.siteUrl} />
        <meta
          property="og:image"
          content={config.siteUrl + props.data.header.childImageSharp.fluid.src}
        />
        {config.facebook && <meta property="article:publisher" content={config.facebook} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:url" content={config.siteUrl} />
        <meta
          name="twitter:image"
          content={config.siteUrl + props.data.header.childImageSharp.fluid.src}
        />
        {config.twitter && (
          <meta
            name="twitter:site"
            content={`@${config.twitter.split('https://twitter.com/')[1]}`}
          />
        )}
        <meta property="og:image:width" content={width} />
        <meta property="og:image:height" content={height} />
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
      </Helmet>

      <SiteNav {...props.pageContext} />
      <Wrapper>
        <Splash bg={props.data.bg_intro.childImageSharp.fluid.src} />
        <Clients />
        <Introduce />
        <div style={{ backgroundColor: '#ffffff' }}>
          <HighlightedProject projects={props.data.projects} />
        </div>
        {/* <Faq /> */}
        <div style={{ backgroundColor: '#ffffff' }}>
          <Testimonial />
        </div>
        <main id="site-main" className={`${SiteMain} ${outer}`}>
          <div className={`${inner}`}>
            {/* <div className={`${PostFeed} ${PostFeedRaise}`}>
              {props.data.projects.edges.map(post => {
                return <PostCard key={post.node.fields.slug} post={post.node} />;
              })}
            </div> */}
            <div className={`${PostFeed} ${PostFeedRaise}`}>
              {props.data.posts.edges.map(post => {
                return <PostCard key={post.node.fields.slug} post={post.node} />;
              })}
              <div className="getMore_container">
                <h1 className="getMore_title">Get more out of Xanthous</h1>
                <a href="/blog" className="getMore_link">
                  LEARN MORE
                  <div className="arrow">
                    <Arrow />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </main>
        {props.children}
        <MessengerCustomerChat
          pageId="391138745024240"
          appId="342750623012703"
          htmlRef={typeof window !== 'undefined' && window.location.pathname}
          loggedInGreeting="Hey! If you have any questions, please drop us a note with your contact info!"
          loggedOutGreeting="Hey! If you have any questions, please drop us a note with your contact info!"
        />
      </Wrapper>
      <Footer />
    </IndexLayout>
  );
};

export default IndexPage;

export const pageQuery = graphql`
  query {
    bg_intro: file(relativePath: { eq: "img/bg_intro.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    logo: file(relativePath: { eq: "img/ghost-logo.png" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
    header: file(relativePath: { eq: "img/blog-cover.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    posts: allMdx(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { langKey: { eq: "en" } }
        frontmatter: { layout: { eq: "post" }, draft: { ne: true } }
      }
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            author {
              id
              name
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 100) {
                      src
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
            langKey
          }
        }
      }
    }
    projects: allMdx(
      limit: 4
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fields: { langKey: { eq: "en" } }
        frontmatter: { layout: { eq: "project" }, highlighted: { eq: true }, draft: { ne: true } }
      }
    ) {
      edges {
        node {
          timeToRead
          frontmatter {
            title
            date
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 3720) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            smallImage: image {
              childImageSharp {
                fixed(width: 450, height: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            author {
              id
              name
              bio
              avatar {
                children {
                  ... on ImageSharp {
                    fixed(quality: 100) {
                      src
                    }
                  }
                }
              }
            }
          }
          excerpt
          fields {
            layout
            slug
            langKey
          }
        }
      }
    }
  }
`;
