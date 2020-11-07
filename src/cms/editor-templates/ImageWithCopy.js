const ImageWithCopy = {
  // Internal id of the component
  id: 'imageWithCopy',
  // Visible label
  label: 'imageWithCopy',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      label: 'RightAlignCopy',
      name: 'rightAlignCopy',
      widget: 'boolean',
      default: false,
    },
    {
      label: 'Image',
      name: 'image',
      widget: 'image',
      media_library: {
        allow_multiple: false,
      },
    },
    {
      label: 'Text',
      name: 'text',
      widget: 'markdown',
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^{{< ImageWithCopy rightAlignCopy=(.*) image=(.*) text=(.*) >}}$/,
  // Function to extract data elements from the regexp match
  fromBlock: (match) =>
    match && {
      rightAlignCopy: match[1],
      image: match[2],
      text: match[3],
    },
  // Function to create a text block from an instance of this component markdown page
  toBlock: function (obj) {
    return `{{< ImageWithCopy rightAlignCopy=${obj.rightAlignCopy} image=${obj.image} text=${obj.text} >}}`
  },
  // Preview output for this component. Can either be a string or a React component
  toPreview: function (obj) {
    if (obj.rightAlignCopy === 'false') {
      return `<span style="width:50%; float:left;"> ${obj.text} </span><img style="width:40%" src=${obj.image}></image>`
    } else {
      return `<span style="width:50%; float:right;"> ${obj.text} </span><img style="width:40%" src=${obj.image}></image>`
    }
  },
}

export default ImageWithCopy
