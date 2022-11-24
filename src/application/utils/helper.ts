export const getSrcByType = (content: Scrap) => {
  switch (content.scrap_type) {
    case 'link':
      return content.url_preview;
    case 'image':
    default:
      return content.file_url;
  }
};