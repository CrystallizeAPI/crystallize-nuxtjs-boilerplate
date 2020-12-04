<template>
  <NuxtLink
    :to="path"
    :style="{
      gridColumn: `span ${gridCell.layout.colspan}`,
      gridRow: `span ${gridCell.layout.rowspan}`,
    }"
    :class="cellSize"
  >
    <div class="cell-inner">
      <div v-if="type === 'product'" class="text product">
        <span class="price">
          <Price :variant="defaultVariant" />
        </span>
        <h3 class="title">{{ name }}</h3>
        <Button>Buy</Button>
      </div>
      <div v-else class="text">
        <h3 class="title">{{ name }}</h3>
      </div>

      <div class="media">
        <CrystallizeVideo v-if="video" :video="video" />
        <CrystallizeImage
          v-else
          :image="image"
          :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
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
  font-size: 2.5rem;
  text-transform: uppercase;
}

.media >>> img {
  max-height: 50vh;
  object-fit: contain;
}

.title {
  font-size: 1.5rem;
  color: var(--color-text-main);
  font-weight: 900;
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
}

.title {
  margin: 0;
}

.text.product .title {
  margin: 0.5rem 0 1rem 0;
}

.price {
  color: inherit;
  font-size: 1.5rem;
  color: var(--color-price);
  font-weight: bold;
}

.cell-inner {
  background: var(--color-box-background);
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
  margin-bottom: 15px;
}

.cell-inner:hover {
  text-decoration: none;
}

.cell-inner button {
  margin: 0 auto;
  min-width: 200px;
  max-width: 80%;
}

@media (min-width: 1024px) {
  .media >>> img {
    max-height: initial;
  }

  .text {
    flex: 0 0 50%;
    padding: 3em var(--content-padding);
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
    flex-direction: row-reverse;
    justify-content: flex-end;
    padding: 0 50px 0 0;
  }

  .cell-1x2 .image {
    width: 200%;
    transform: translateX(-50%);
  }

  .cell-1x2 button {
    margin: 0 0;
  }

  .cell-1x3 .cell-inner {
    padding-left: 15rem;
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
