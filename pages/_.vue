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
  mounted() {
    // console.log('MOUNTED', this.$route.params.pathMatch);
  }
}
</script>

<style scoped>

</style>>