<template>
  <NuxtLink
    :to="path"
    :style="{
      gridColumn: `span ${gridCell.layout.colspan}`,
      gridRow: `span ${gridCell.layout.rowspan}`,
    }"
    :class="`grid-item grid-item--${type} ${cellDynamicClass}`"
  >
    <div v-if="type === 'product'" class="grid-item__inner product">
      <div class="grid-item__info">
        <h3 class="grid-item__title">{{ name }}</h3>
        <GridItemPrice :variant="defaultVariant" />
      </div>

      <div class="grid-item__media">
        <CrystallizeVideo v-if="video" :video="video" />
        <CrystallizeImage
          v-else
          :image="image"
          :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
          :width="1024"
          class="grid-item__image"
        />
      </div>
    </div>

    <div v-if="type === 'document'" class="grid-item__inner">
      <div class="grid-item__info">
        <h3 class="grid-item__title">{{ name }}</h3>
      </div>

      <div class="grid-item__media">
        <CrystallizeVideo v-if="video" :video="video" />
        <CrystallizeImage
          v-else
          :image="image"
          :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
          :width="1024"
          class="grid-item__image"
        />
      </div>
    </div>

    <div v-if="type === 'folder'" class="grid-item__inner">
      <div class="grid-item__info">
        <h3 class="grid-item__title">{{ name }}</h3>
      </div>

      <div class="grid-item__media">
        <CrystallizeVideo v-if="video" :video="video" />
        <CrystallizeImage
          v-else
          :image="image"
          :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
          :width="1024"
          class="grid-item__image"
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
  data: function () {
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
      cellDynamicClass: `cell cell-${this.gridCell?.layout?.rowspan}x${this.gridCell?.layout?.colspan}`,
    };
  },
};
</script>

<style scoped src='./index.css'></style>
