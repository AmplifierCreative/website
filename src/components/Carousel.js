import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {Keyframes, delay, config} from 'react-spring/renderprops'


import danielWhiteShow from '../img/clients/The_Daniel_White_Show_new.png'
import freePizza from '../img/clients/FPP_podStack_color.png'
import audpop from '../img/clients/AA_AudPop_Stacked_Color.png'
import cardinal from '../img/clients/cardinal_joinery.png'

const logoImage = {
  verticalAlign: 'middle',
  position: 'relative',
  zIndex: '1',
}

const Container =  Keyframes.Spring(async next =>
  { while (true) {
      await next({
        from: { opacity: 0, left: '219px' },
        left: '0px',
        position: 'relative',
        opacity: 1,
        config: config.molasses 
      })
  }})

const CarouselItem1 =  Keyframes.Spring(async next =>
  { while (true) {
      await next({
        from: { opacity: 1, left: '0px'},
        left: '-229px',
        position: 'relative',
        opacity: 0,
        delay: 3000,
        config: config.slow
      })
      await next({
        from: { opacity: 0, left: '916px'},
        left: '687px',
        position: 'relative',
        opacity: 1,
        config: config.molasses
      })
      await next({
        from: {left: '687px'},
        left: '458px',
        position: 'relative',
        config: config.molasses
      })
      await next({
        from: {left: '458px'},
        left: '229px',
        position: 'relative',
        config: config.molasses
      })
      await next({
        from: {left: '229px'},
        left: '0px',
        position: 'relative',
        config: config.molasses
      })
  }})

  const CarouselItem2 =  Keyframes.Spring(async next =>
    { while (true) {
        await next({
          from: { left: '0px'},
          left: '-229px',
          position: 'relative',
          delay: 3000,
          config: config.molasses 
        })
        await next({
          from: { left: '-229px', opacity: 1,},
          left: '-458px',
          opacity: 0,
          position: 'relative',
          config: config.slow 
        })
    }})

  const CarouselItem3 =  Keyframes.Spring(async next =>
    { while (true) {
      await next({
        from: { left: '0px'},
        left: '-229px',
        position: 'relative',
        delay: 3000,
        config: config.molasses 
      })
      await next({
        from: { left: '-229px'},
        left: '-458px',
        position: 'relative',
        config: config.molasses 
      })
      await next({
        from: { left: '-458px', opacity: 1,},
        left: '-687px',
        opacity: 0,
        position: 'relative',
        config: config.slow
      })
    }})

    const CarouselItem4 =  Keyframes.Spring(async next =>
      { while (true) {
        await next({
          from: { left: '0px'},
          left: '-229px',
          position: 'relative',
          delay: 3000,
          config: config.molasses 
        })
        await next({
          from: { left: '-229px'},
          left: '-458px',
          position: 'relative',
          config: config.molasses 
        })
        await next({
          from: { left: '-458px',},
          left: '-687px',
          position: 'relative',
          config: config.molasses 
        })
        await next({
          from: { left: '-687px', opacity: 1,},
          left: '-916px',
          opacity: 0,
          position: 'relative',
          config: config.slow,
        })
      }})


class Carousel extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Container>{ styles =>
      <div className="carousel" style={styles}>
            {/* posts &&
            posts.map(({ node: post }) => (
                <div className="column" key={post.id}>
                    <Link to={post.fields.slug}>
                        <div>
                            {post.frontmatter.featuredimage ? (
                            <div className="featured-thumbnail">
                                <PreviewCompatibleImage
                                imageInfo={{
                                    image: post.frontmatter.featuredimage,
                                    alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                                }}
                                />
                            </div>
                            ) : null}
                        </div>
                    </Link>
                </div>
            )) */}
            <CarouselItem1>{styles => 
              <div className="carousel-item-container is-active" style={styles}>
                <a title="Free Pizza Podcast" href="#">
                  <img src={freePizza} alt="Free Pizza Podcast" style={logoImage}/>
                </a>
              </div>}
            </CarouselItem1>
            <CarouselItem2>{styles => 
              <div className="carousel-item-container is-active" style={styles}>
                <a title="Daniel White Show" href="#">
                  <img src={danielWhiteShow} alt="Daniel White Show" style={logoImage}/>
                </a>
              </div>}
            </CarouselItem2>
            <CarouselItem3>{styles => 
              <div className="carousel-item-container is-active" style={styles}>
                <a title="Audpop" href="#">
                    <img src={audpop} alt="Audpop" style={logoImage}/>
                </a>
              </div>}
            </CarouselItem3>
            <CarouselItem4>{styles => 
            <div className="carousel-item-container is-active" style={styles}>
              <a title="Caridnal Joinery" href="#">
                  <img src={cardinal} alt="Cardinal Joinery Logo" style={logoImage} />
              </a>
            </div>}
            </CarouselItem4>
        </div>}
        </Container>   
    )
  }
} 

Carousel.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query CarouselQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "project-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                tags
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 650, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Carousel data={data} count={count} />}
  />
)
