export function getFolderTitle(folder) {
  const title = folder?.components?.find((c) => c.name === 'Title')?.content
    ?.text;

  return title || folder.name;
}

export function isFolderType(component) {
  return component.type === 'folder'
}
