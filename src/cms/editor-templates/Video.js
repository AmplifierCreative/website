import React from 'react'
const Video = {
  // Internal id of the component
  id: 'video',
  // Visible label
  label: 'Video',
  // Fields the user need to fill out when adding an instance of the component
  fields: [
    {
      label: 'Video',
      name: 'url',
      widget: 'file',
      media_library: {
        allow_multiple: false,
      },
    },
    {
      label: 'Controls',
      name: 'control',
      widget: 'boolean',
      default: true,
    },
    {
      label: 'Loop',
      name: 'loop',
      widget: 'boolean',
      default: false,
    },
    {
      label: 'Autoplay',
      name: 'autoplay',
      widget: 'boolean',
      default: false,
    },
    {
      label: 'Mute',
      name: 'muted',
      widget: 'boolean',
      default: true,
    },
    {
      label: 'Poster',
      name: 'poster',
      widget: 'image',
      media_library: {
        allow_multiple: false,
      },
    },
    {
      label: 'Height',
      name: 'height',
      widget: 'number',
      valueType: 'int',
      min: 300,
      default: 200,
    },
    {
      label: 'Width',
      name: 'width',
      widget: 'number',
      valueType: 'int',
      min: 300,
      default: 300,
    },
  ],
  // Pattern to identify a block as being an instance of this component
  pattern: /^{{< Video url=(.*) control=(.*) loop=(.*) autoplay=(.*) muted=(.*) height=(.*) width=(.*) poster=(.*) >}}$/,
  // Function to extract data elements from the regexp match
  fromBlock: (match) =>
    match && {
      url: match[1],
      control: match[2],
      loop: match[3],
      autoplay: match[4],
      muted: match[5],
      height: match[6],
      width: match[7],
      poster: match[8],
    },
  // Function to create a text block from an instance of this component markdown page
  toBlock: function (obj) {
    if (obj && obj.autoplay) obj.muted = true
    return `{{< Video url=${obj.url} control=${obj.control} loop=${obj.loop} autoplay=${obj.autoplay} muted=${obj.muted} height=${obj.height} width=${obj.width} poster=${obj.poster} >}}`
  },
  // Preview output for this component. Can either be a string or a React component
  toPreview: function (obj) {
    return `<video width=${obj.width} height=${obj.height} ${
      obj.control === 'true' && `controls`
    }  ${obj.loop === 'true' && `loop`}  ${obj.muted === 'true' && `muted`} ${
      obj.autoplay === 'true' && `autoplay`
    } poster=${obj.poster}>
       <source src=${obj.url} type="video/webm"/>
       <source src=${obj.url} type="video/webm"/>
       <source src=${obj.url} type="video/mp4">
       </video>`
  },
}

export default Video
