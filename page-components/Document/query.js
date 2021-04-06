import fragments from '/lib/graph/fragments';

export const QUERY_DOCUMENT = `
query DOCUMENT_PAGE($path: String!, $language: String!) {
  document: catalogue (path: $path, language: $language) {
    ...item
    ...product
    publishedAt
  }
}

${fragments}
`
/*
 * @TODO: make the same query than nextjs boilerplate work
 */
// export const QUERY_DOCUMENT = `
//   query DOCUMENT_DOCUMENT($language: String!, $path: String, $version: VersionLabel! ) {
//     document: catalogue(language: $language, path: $path, version: $version) {
//       ...item
//       ...product
//       publishedAt
//       topics {
//         id
//         name
//         parent {
//           name
//         }
//         items(first:2){
//           edges{
//             node{
//               ...item
//               ...product
//               id
//               topics {
//                 id
//                 name
//               }
//             }
//           }
//         }
//       }
//      }
//   }

//   ${fragments}
// `;
