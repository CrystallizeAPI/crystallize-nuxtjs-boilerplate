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

<style scoped>
a {
  text-decoration: none;
  display: block;
}

@media (min-width: 768px) {
  a {
    display: flex;
  }
}

.cell:first-child >>> h3 {
  font-size: 1.2rem;
}

.media >>> img {
  max-height: 50vh;
  object-fit: cover;
}

.title {
  font-size: 1.2rem;
  color: var(--color-text-main);
  margin: 0;
  font-weight: 500;
}

.text {
  text-align: left;
  padding: 20px 0;
}

.price {
  color: inherit;
  font-size: 1.4rem;
  color: var(--color-price);
  font-weight: bold;
  padding: 10px 0;
}

.cell-inner {
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
  margin-bottom: 15px;
}
.cell-inner.product {
  background: var(--color-box-background);
}
.cell-inner.product .text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
}

.cell-inner:hover {
  text-decoration: none;
}

@media (min-width: 1024px) {
  .media {
    flex-grow: 2;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .media >>> video,
  .media >>> img,
  .media >>> .outer {
    display: block;
    /* If you want to contain your images, change object-fit to `contain` */
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .media >>> img {
    max-height: initial;
  }

  .cell-inner {
    flex-direction: row;
    position: relative;
    flex-grow: 1;
    text-align: unset;
    padding: 0;
  }

  .cell-1x1 .cell-inner {
    flex-direction: column-reverse;
    justify-content: flex-end;
    text-align: center;
  }
  .cell-1x2 .cell-inner {
    flex-direction: column-reverse;
  }
  .cell-1x2 .cell-inner.product {
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding: 0 50px 0 0;
  }

  .cell-1x2 .image {
    width: 200%;
    /* transform: translateX(-50%); */
  }

  .cell-1x2 button {
    margin: 0 0;
  }

  .cell-1x3 .cell-inner {
    padding-left: 15rem;
  }
  .cell-1x3 .media {
    max-height: 50vh;
  }
  .cell-1x3 button {
    margin: 0 0;
  }

  .cell-2x2 .cell-inner {
    flex-direction: column-reverse;
    padding-bottom: 50px;
    text-align: center;
  }
}
</style>
