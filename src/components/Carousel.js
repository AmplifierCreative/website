import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

class Carousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: '',
    }
    this.updateSize = this.updateSize.bind(this)
  }

  componentDidMount() {
    this.updateSize()
    window.addEventListener('resize', this.updateSize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSize)
  }

  updateSize() {
    this.setState({ isMobile: window.innerWidth < 769 })
  }
  render() {
    const isMobile = this.state.isMobile

    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 2000,
      speed: 500,
      arrows: false,
      lazyLoad: true,
      slidesToShow: 4,
      slidesToScroll: 1,
    }

    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div>
        {isMobile ? (
          <div className='carousel'>
            {posts &&
              posts.slice(0, 4).map(({ node: post }) => (
                <div key={post.id}>
                  <Link to={post.fields.slug}>
                    <div className='carousel-item-container'>
                      {post.frontmatter.clientlogo ? (
                        <div className='featured-thumbnail'>
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.clientlogo,
                              alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        ) : (
          <Slider {...settings}>
            {posts &&
              posts.map(({ node: post }) => (
                <div key={post.id}>
                  <Link to={post.fields.slug}>
                    <div className='carousel-item-container'>
                      {post.frontmatter.clientlogo ? (
                        <div className='featured-thumbnail'>
                          <PreviewCompatibleImage
                            imageInfo={{
                              image: post.frontmatter.clientlogo,
                              alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </div>
              ))}
          </Slider>
        )}
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
          filter: {
            frontmatter: {
              templateKey: { eq: "portfolio-post" }
              featuredpost: { eq: true }
            }
          }
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
                featuredpost
                clientlogo {
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
    render={(data) => <Carousel data={data} />}
  />
)
