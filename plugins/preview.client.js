export default function ({ query, enablePreview }) {
  if (query.preview) {
    // register global variable
    enablePreview({
      isPreview: true
    })
  }
}