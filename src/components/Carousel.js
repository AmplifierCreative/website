import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import {Keyframes, config} from 'react-spring/renderprops'


import danielWhiteShow from '../img/clients/The_Daniel_White_Show_new.png'
import freePizza from '../img/clients/FPP_podStack_color.png'
import audpop from '../img/clients/AA_AudPop_Stacked_Color.png'
import cardinal from '../img/clients/cardinal_joinery.png'

const logoImage = {
  verticalAlign: 'middle',
  position: 'relative',
  zIndex: '1',
}

// You can create keyframes for springs and trails
const Container =  Keyframes.Spring(async next =>
  {while (true)
    await next({ opacity: 1, from: { opacity: 0 }, reset: true, config: config.molasses })}
)

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: true,
      carouselActiveClass: '',
    };
  }

  moveCarousel = () => {
    this.setState(
      {
        active: !this.state.active,
      },
      () => {
        this.state.active
          ? this.setState({
            carouselActiveClass: 'is-active',
            })
          : this.setState({
            carouselActiveClass: '',
            })
      }
    )
  }

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="carousel">
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
                  <Container>{styles => 
                    <div className="carousel-item-container is-active" style={styles}>
                      <a title="Free Pizza Podcast" href="#">
                        <img src={freePizza} alt="Free Pizza Podcast" style={logoImage}/>
                      </a>
                    </div>}
                  </Container>
                  <Container>{styles => 
                    <div className="carousel-item-container is-active" style={styles}>
                    <a title="Daniel White Show" href="#">
                      <img src={danielWhiteShow} alt="Daniel White Show" style={logoImage}/>
                    </a>
                    </div>}
                  </Container>
                  <Container>{styles => 
                    <div className="carousel-item-container is-active" style={styles}>
                    <a title="Audpop" href="#">
                        <img src={audpop} alt="Audpop" style={logoImage}/>
                    </a>
                    </div>}
                  </Container>
                  <Container>{styles => 
                    <div className="carousel-item-container is-active" style={styles}>
                    <a title="Caridnal Joinery" href="#">
                        <img src={cardinal} alt="Cardinal Joinery Logo" style={logoImage} />
                    </a>
                    </div>}
                  </Container>
                      </div>
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
