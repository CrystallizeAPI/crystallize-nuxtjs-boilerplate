export function toText(model) {
  function getTextFromNode(node) {
    if (!node) {
      return '';
    }

    let childrenText = '';
    if (node.children) {
      childrenText = node.children.reduce(
        (acc, n) => acc + getTextFromNode(n),
        ''
      );
    }

    let content = '';

    content += node.textContent || childrenText || '';

    if (node.kind === 'block') {
      content = `\n${content}\n`;
    }

    return content;
  }

  if (Array.isArray(model)) {
    return model.map(getTextFromNode).join('');
  }

  return getTextFromNode(model);
}
