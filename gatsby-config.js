module.exports = {
  siteMetadata: {
    title: 'amplifier creative',
    titleTemplate: '%s | amplifier creative',
    description:
      'amplifier creative is a modernized creative agency catered toward up-and-coming businesses, driven entrepreneurs, and committed creative endeavors of all kinds.',
    url: 'https://amplifier-dev.netlify.app/',
    image: 'img/amplifierSH.png',
    twitterUsername: '@amplifiercreative',
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
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
              // linkImagesToOriginal: false,
              // backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              maxWidth: 800,
              ratio: 1.77,
              height: 400,
              related: false,
              noIframerder: true,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1em',
            },
          },

          {
            resolve: 'gatsby-remark-image-attributes',
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
              dataAttributes: true,
            },
          },
          {
            resolve: 'gatsby-remark-images-medium-zoom',
            // options: { background: '#000' },
            excludeSelector: 'data-external-link',
          },
          'gatsby-remark-reading-time',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms-paths',
      options: {
        cmsConfig: '/static/admin/config.yml',
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
          'gatsby-resp-image-image',
        ],
        purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
        printRejected: true,
      },
    }, // must be after other CSS plugins
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint:
          'https://amplifiercreative.us2.list-manage.com/subscribe/post?u=e07e8e01225fa7bdd539e21ae&amp;id=71d00af653',
        timeout: 3500,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
