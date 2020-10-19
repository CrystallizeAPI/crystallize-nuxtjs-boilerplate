<template>
  <ProductItem
    v-if="item.type === 'product'"
    :data="item"
  />
  <FolderItem
     v-else-if="item.type === 'folder'"
     :data="item"
  />
  <DocumentItem
    v-else
    :data="item"
    :gridCell="['dhhd']"
  />
</template>

<script>
export default {
  props: ['item']
}
</script>