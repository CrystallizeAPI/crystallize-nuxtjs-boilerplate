<template>
  <div>
    <Folder />
  </div>
</template>

<script>
import Folder from '../page-components/Folder';

export default {
  components: {
    Folder
  },
  //  asyncData({ params, error }) {
  //   return fetch(`https://my-api/posts/osoos`)
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(e => {
  //       error({ statusCode: 404, message: 'Post not found' })
  //     })

  //   fetch(`https://jsonplaceholder.typicode.com/todos/${params.pathMatch}`)
  //   .then(response => response.json())
  //   .then(json =>  json)
  //   .catch(e => {
  //     console.log('there is an error')
  //   })

  //    error({ statusCode: 404, message: 'Post not found' })
  // },
}
</script>

<style scoped>

</style>>