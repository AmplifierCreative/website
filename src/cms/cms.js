import CMS from 'netlify-cms-app'

import PrivacyPagePreview from './preview-templates/PrivacyPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import ProductPagePreview from './preview-templates/ProductPagePreview'
import IndexPagePreview from './preview-templates/IndexPagePreview'
import ProjectPostPreview from './preview-templates/ProjectPostPreview'
import ContactPagePreview from './preview-templates/ContactPagePreview'
import AboutPagePreview from './preview-templates/AboutPagePreview'
import ServicesPagePreview from './preview-templates/ServicesPagePreview'
import GlobalPagePreview from './preview-templates/GlobalPagePreview'
import NotFoundPagePreview from './preview-templates/NotFoundPagePreview'

import Video from './editor-templates/Video'
import ImageWithCopy from './editor-templates/ImageWithCopy'
import Quote from './editor-templates/Quote'

CMS.registerPreviewTemplate('index', IndexPagePreview)
CMS.registerPreviewTemplate('privacy', PrivacyPagePreview)
CMS.registerPreviewTemplate('products', ProductPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('projects', ProjectPostPreview)
CMS.registerPreviewTemplate('contact', ContactPagePreview)
CMS.registerPreviewTemplate('about', AboutPagePreview)
CMS.registerPreviewTemplate('services', ServicesPagePreview)
CMS.registerPreviewTemplate('global', GlobalPagePreview)
CMS.registerPreviewTemplate('notFound', NotFoundPagePreview)

CMS.registerEditorComponent(Video)
CMS.registerEditorComponent(ImageWithCopy)
CMS.registerEditorComponent(Quote)
