import CMS from 'netlify-cms-app'

import PrivacyPagePreview from './preview-templates/PrivacyPagePreview'
import TermsPagePreview from './preview-templates/TermsPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ProjectPostPreview from './preview-templates/ProjectPostPreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import ServicesPagePreview from './preview-templates/ServicesPagePreview'
import GlobalPagePreview from './preview-templates/GlobalPagePreview'
import NotFoundPagePreview from './preview-templates/NotFoundPagePreview'

import ImageWithCopy from './editor-templates/ImageWithCopy'
import Quote from './editor-templates/Quote'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('privacy', PrivacyPagePreview)
CMS.registerPreviewTemplate('terms', TermsPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('projects', ProjectPostPreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('services', ServicesPagePreview)
CMS.registerPreviewTemplate('global', GlobalPagePreview)
CMS.registerPreviewTemplate('notFound', NotFoundPagePreview)

CMS.registerEditorComponent(ImageWithCopy)
CMS.registerEditorComponent(Quote)
CMS.registerEditorComponent({
  // Internal id of the component
  id: 'youtube',
  // Visible label
  label: 'Youtube',
  // Fields the user need to fill out when adding an instance of the component
  fields: [{ name: 'id', label: 'Youtube Video ID', widget: 'string' }],
  // Pattern to identify a block as being an instance of this component
  pattern: /^youtube: (\S+)$/,
  // Function to extract data elements from the regexp match
  fromBlock: function (match) {
    return {
      id: match[1],
    }
  },
  // Function to create a text block from an instance of this component
  toBlock: function (obj) {
    return 'youtube: ' + obj.id
  },
  // Preview output for this component. Can either be a string or a React component
  // (component gives better render performance)
  toPreview: function (obj) {
    return (
      '<img src="http://img.youtube.com/vi/' +
      obj.id +
      '/maxresdefault.jpg" alt="Youtube Video"/>'
    )
  },
})
