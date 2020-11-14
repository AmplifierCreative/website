import CMS from 'netlify-cms-app'

import PrivacyPagePreview from './preview-templates/PrivacyPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ProjectPostPreview from './preview-templates/ProjectPostPreview'

import Video from './editor-templates/Video'
import ImageWithCopy from './editor-templates/ImageWithCopy'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('privacy', PrivacyPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('projects', ProjectPostPreview)

CMS.registerEditorComponent(Video)
CMS.registerEditorComponent(ImageWithCopy)
