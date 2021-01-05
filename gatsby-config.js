module.exports = {
  siteMetadata: {
    title: 'Amplifier Creative',
    description:
      'This repo contains an example business website that is built with Gatsby, and Netlify CMS.It follows the JAMstack architecture by using Git as a single source of truth, and Netlify for continuous deployment, and CDN distribution.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://amplifiercreative.us2.list-manage.com/subscribe/post?u=e07e8e01225fa7bdd539e21ae&amp;id=71d00af653',
        timeout: 3500,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              maxWidth: 800,
              maxWidth: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframerder: true,
            },
          },

          'gatsby-remark-reading-time',
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1em',
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: `gatsby-transformer-remark`,
            options: {
              plugins: [
                {
                  resolve: `gatsby-remark-image-attributes`,
                  options: {
                    // ?Boolean=true
                    //   If true (the default), all CSS
                    //   property names will be recognized
                    //   as styleAttribute.
                    styleAttributes: true,

                    // ?Boolean=false
                    //   If true, all attributes that
                    //   aren't styleAttributes, will be
                    //   added as data-* attributes to the
                    //   image.
                    dataAttributes: false,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    {
      resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
      options: {
        develop: true, // Activates purging in npm run develop
        whitelist: [
          'strong',
          'slick-track',
          'quote',
          'right-align-true',
          'right-align-false',
        ],
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
        printRejected: true,
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
