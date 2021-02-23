<template>
  <NuxtLink
    :to="path"
    :style="{
      gridColumn: `span ${gridCell.layout.colspan}`,
      gridRow: `span ${gridCell.layout.rowspan}`,
    }"
    :class="cellSize"
  >
    <div :class="type === 'product' ? 'cell-inner product' : 'cell-inner'">
      <div class="text">
        <h3 class="title">{{ name }}</h3>
        <span v-if="type === 'product'" class="price">
          <Price :variant="defaultVariant" />
        </span>
      </div>

      <div class="media">
        <CrystallizeVideo v-if="video" :video="video" />
        <CrystallizeImage
          v-else
          :image="image"
          :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
          :width="1024"
          class="image"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    gridCell: {
      type: Object,
      required: true,
    },
  },
  data() {
    const { name, path, type, defaultVariant, components } = this.data;

    let image = components?.find((c) => c.type === "images")?.content
      ?.images?.[0];
    if (type === "product") {
      image = defaultVariant.images?.[0];
    }

    const video = components?.find((c) => c.type === "videos")?.content
      ?.videos?.[0];

    return {
      name,
      path,
      type,
      defaultVariant,
      image,
      video,
      imageMdWidth: 100 / (this.gridCell?.layout?.colspan ?? 1),
      cellSize: `cell cell-${this.gridCell?.layout?.rowspan}x${this.gridCell?.layout?.colspan}`,
    };
  },
};
</script>

<style scoped src='./index.css'></style>
