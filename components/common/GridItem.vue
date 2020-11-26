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
      <div class="text">
        <span v-if="defaultVariant" class="price"
          >${{ defaultVariant.price }}.00</span
        >
        <h3 class="title">{{ name }}</h3>
        <template v-if="defaultVariant">
          <Button>Buy</Button>
        </template>
      </div>

      <div class="img">
        <CrystallizeImage
          :image="image"
          :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
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
    return {
      name: this.data.name,
      path: this.data.path,
      type: this.data.type,
      variants: this.data.variants,
      defaultVariant: this.data.defaultVariant,
      imageMdWidth: 100 / (this.gridCell?.layout?.colspan ?? 1),
      cellSize: `cell cell-${this.gridCell?.layout?.rowspan}x${this.gridCell?.layout?.colspan}`,
      image: this.data.defaultVariant
        ? this.data.defaultVariant.image
        : this.filterContentImages(this.data.type, this.data.components),
      videos: this.findComponents(this.data.components, "name", "Video"),
    };
  },
  methods: {
    filterContentImages(type, components) {
      if (type === "folder" || type === "document") {
        const images = components.find((c) => c.type === "images");
        return images?.content?.images?.[0];
      }
    },
    findComponents(components, property, filter) {
      return components.find((c) => c[property] === filter);
    },
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

.img img {
  display: block;
  width: 100%;
}

.title {
  font-size: 1.5rem;
  text-transform: uppercase;
  color: var(--color-text-main);
  font-weight: 900;
  font-family: "Roboto", sans-serif;
  text-decoration: none !important;
}

.text {
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1em;
}

.price {
  color: inherit;
  font-size: 1.5rem;
  color: var(--color-price);
  font-weight: bold;
}

.cell-inner {
  position: relative;
  background: var(--color-box-background);
  display: flex;
  padding: 0 50px;
}

.cell-inner:hover {
  text-decoration: none;
}

.cell-inner button {
  margin: 0 auto;
  min-width: 200px;
  max-width: 80%;
}

@media (max-width: 767px) {
  .cell-inner {
    flex-direction: column-reverse;
    text-align: center;
    margin-bottom: 15px;
    padding: 50px;
  }
}

@media (min-width: 1024px) {
  .cell-inner {
    flex-grow: 1;
  }

  .cell-1x1 .cell-inner {
    flex-direction: column-reverse;
    justify-content: center;
    padding-bottom: 50px;
    text-align: center;
  }

  .cell-1x2 .cell-inner {
    flex-direction: row-reverse;
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
