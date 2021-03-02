export function getDocumentTitle(doc) {
  const titleComponent = doc.components?.find((c) => c.name === 'Title');
  const title = titleComponent?.content?.text;

  return title || doc.name;
}

export function getHumanReadableDate(date) {
  return date.toDateString();
}