const containers = {
  div: {
    kind: 'block',
    type: 'container'
  },
  main: {
    kind: 'block',
    type: 'container'
  },
  span: {
    kind: 'inline',
    type: 'container'
  }
};

const strongs = {
  strong: {
    kind: 'inline',
    type: 'strong'
  },
  b: {
    kind: 'inline',
    type: 'strong'
  }
};

const emphasizeds = {
  em: {
    kind: 'inline',
    type: 'emphasized'
  },
  i: {
    kind: 'inline',
    type: 'emphasized'
  }
};

const HTMLElementToTypeMap = {
  ...containers,
  ...strongs,
  ...emphasizeds,
  a: {
    kind: 'inline',
    type: 'link'
  },
  abbr: {
    kind: 'inline',
    type: 'abbrevition'
  },
  acronym: {
    kind: 'inline',
    type: 'abbrevition'
  },
  address: {
    kind: 'block',
    type: 'address'
  },
  article: {
    kind: 'block',
    type: 'article'
  },
  aside: {
    kind: 'inline',
    type: 'aside'
  },
  quote: {
    kind: 'block',
    type: 'quote'
  },
  br: {
    kind: 'inline',
    type: 'line-break'
  },
  caption: {
    kind: 'block',
    type: 'table-caption'
  },
  cite: {
    kind: 'block',
    type: 'title-of-a-work'
  },
  code: {
    kind: 'block',
    type: 'code'
  },
  del: {
    kind: 'block',
    type: 'deleted'
  },
  details: {
    kind: 'block',
    type: 'details'
  },
  figcaption: {
    kind: 'block',
    type: 'figcaption'
  },
  figure: {
    kind: 'block',
    type: 'figure'
  },
  h1: {
    kind: 'block',
    type: 'heading1'
  },
  h2: {
    kind: 'block',
    type: 'heading2'
  },
  h3: {
    kind: 'block',
    type: 'heading3'
  },
  h4: {
    kind: 'block',
    type: 'heading4'
  },
  h5: {
    kind: 'block',
    type: 'heading5'
  },
  h6: {
    kind: 'block',
    type: 'heading6'
  },
  hr: {
    kind: 'block',
    type: 'horizontal-line'
  },
  img: {
    kind: 'block',
    type: 'image'
  },
  li: {
    kind: 'block',
    type: 'list-item'
  },
  mark: {
    kind: 'inline',
    type: 'highlight'
  },
  ol: {
    kind: 'block',
    type: 'ordered-list'
  },
  p: {
    kind: 'block',
    type: 'paragraph'
  },
  pre: {
    kind: 'block',
    type: 'preformatted'
  },
  picture: {
    kind: 'block',
    type: 'picture'
  },
  section: {
    kind: 'block',
    type: 'section'
  },
  strong: {
    kind: 'inline',
    type: 'strong'
  },
  sub: {
    kind: 'inline',
    type: 'subscripted'
  },
  sup: {
    kind: 'inline',
    type: 'superscripted'
  },
  table: {
    kind: 'block',
    type: 'table'
  },
  tbody: {
    kind: 'block',
    type: 'table-body'
  },
  td: {
    kind: 'block',
    type: 'table-cell'
  },
  tfoot: {
    kind: 'block',
    type: 'table-footer'
  },
  th: {
    kind: 'block',
    type: 'table-head-cell'
  },
  thead: {
    kind: 'block',
    type: 'table-head'
  },
  time: {
    kind: 'inline',
    type: 'time'
  },
  tr: {
    kind: 'block',
    type: 'table-row'
  },
  u: {
    kind: 'inline',
    type: 'underlined'
  },
  ul: {
    kind: 'block',
    type: 'unordered-list'
  }
};

const selfClosingTags = ['br'];

const keys = Object.keys(HTMLElementToTypeMap);

function findHTMLTagByNode({ kind, type, metadata = {} }) {
  for (let x = 0; x < keys.length; x++) {
    const tagName = keys[x];
    const item = HTMLElementToTypeMap[tagName];

    let match = item.kind === kind && item.type === type;

    // Special check if metadata is provided
    if (match && item.metadata && metadata) {
      const targetMetadataMatches = Object.keys(item.metadata).reduce(
        (acc, key) => {
          if (item.metadata[key] !== metadata[key]) {
            return false;
          }
          return acc;
        },
        true
      );
      if (!targetMetadataMatches) {
        match = false;
      }
    }

    if (match) {
      return {
        tagName,
        definition: item
      };
    }
  }
  return null;
}

// The shared valid attributes
const sharedValidAttributes = ['id'];

// The valid attributes for each element
const validAttributesMap = {
  a: [...sharedValidAttributes, 'href', 'target']
};

function getValidAttributes({ tagName }) {
  return validAttributesMap[tagName] || sharedValidAttributes;
}

export const helper = {
  HTMLElementToTypeMap,
  findHTMLTagByNode,
  validAttributesMap,
  getValidAttributes,
  selfClosingTags
};