export function getFolderTitle(folder) {
  const title = folder?.components?.find((c) => c.name === 'Title')?.content
    ?.text;

  return title || folder.name;
}

export function getFolderSubFolders(folder) {
  return folder.children?.filter(isFolderType);
}

export function getFolderDescription(folder) {
  return folder.components?.find(isBriefText)
}

export function getFolderBody(folder) {
  return folder.components?.find(isBodyComponent)
}

export function getFolderGrids(folder) {
  return folder.components?.find(isGridRelationType)?.content?.grids?.[0];
}

export function getFolderStackableContent(folder) {
  return folder.components?.find(isStackableComponent)?.content?.items;
}

function isBodyComponent(component) {
  return component.name === "Body"
}

function isStackableComponent(component) {
  return component.name === "Stackable content"
}

function isGridRelationType(component) {
  return component.type === "gridRelations"
}

export function isFolderType(component) {
  return component.type === 'folder'
}

export function isBriefText(component) {
  return component.name === 'Brief'
}

