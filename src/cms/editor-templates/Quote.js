const Quote = {
  // Internal id of the component
  id: 'quote',
  // Visible label
  label: 'quote',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      label: 'RightAlignCopy',
      name: 'rightAlignCopy',
      widget: 'boolean',
      default: false,
    },
    {
      label: 'QuoteText',
      name: 'quoteText',
      widget: 'string',
    },
    {
      label: 'QuoteAuthor',
      name: 'quoteAuthor',
      widget: 'string',
    },
    {
      label: 'QuoteAuthorTitle',
      name: 'quoteAuthorTitle',
      widget: 'string',
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^< Quote rightAlignCopy=(.*) quoteText=(.*) quoteAuthor=(.*) quoteAuthorTitle=(.*) >$/,
  // Function to extract data elements from the regexp match
  fromBlock: (match) =>
    match && {
      rightAlignCopy: match[1],
      quote: match[2],
      quoteAuthor: match[3],
      quoteAuthorTitle: match[4],
    },
  // Function to create a text block from an instance of this component markdown page
  toBlock: function (obj) {
    if (obj.rightAlignCopy === 'true') {
      return `<div class="columns quote"><div> <blockquote>${obj.quoteText}</blockquote> <h3 class="has-text-right">-${obj.quoteAuthor}</h3> <h4 class="has-text-right">${obj.quoteAuthorTitle}</h4></div></div>`
    } else {
      return `<div class="columns quote"><div class="has-text-left"> <blockquote>${obj.quoteText}</blockquote> <h3>-${obj.quoteAuthor}</h3> <h4>${obj.quoteAuthorTitle}</h4></div></div>`
    }
  },
  // Preview output for this component. Can either be a string or a React component
  toPreview: function (obj) {
    if (obj.rightAlignCopy === 'false') {
      return `<span style="width:50%; float:left;"> ${obj.quoteText} ${obj.quoteAuthor} ${obj.quoteAuthorTitle}</span>`
    } else {
      return `<span style="width:50%; float:right;"> ${obj.quoteText} ${obj.quoteAuthor} ${obj.quoteAuthorTitle} </span>`
    }
  },
}

export default Quote
