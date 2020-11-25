<template>
  <NuxtLink
    :to="path"
    :style="{
      gridColumn: `span ${gridCell.layout.colspan}`,
      gridRow: `span ${gridCell.layout.rowspan}`,
    }"
  >
    <div class="outer" :class="cellSize">
      <div class="text">
        <span v-if="defaultVariant" class="price"
          >${{ defaultVariant.price }}.00</span
        >
        <h3 class="title">{{ name }}</h3>
        <template v-if="defaultVariant">
          <Button> Buy </Button>
        </template>
      </div>
      <div class="image-wraper">
        <div class="img">
          <ImageComponent
            :image="image"
            :sizes="`(min-width 1024px) ${imageMdWidth}px, 100vw`"
          />
        </div>
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
      cellSize: `cell-${this.gridCell?.layout?.rowspan}x${this.gridCell?.layout?.colspan}`,
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
  display: flex;
}

.image-wraper {
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.img {
  width: 100%;
  height: 100%;
  display: block;
  margin: 0 auto;
}

.img img {
  display: block;
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
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

.outer {
  position: relative;
  background: var(--color-box-background);
  display: flex;
  padding: 0 50px;
}

.outer:hover {
  text-decoration: none;
}

.outer button {
  margin: 0 auto;
  min-width: 200px;
  max-width: 80%;
}

@media (max-width: 768px) {
  .outer {
    flex-direction: column-reverse;
    text-align: center;
    margin-bottom: 15px;
    padding: 50px;
  }
}

@media (min-width: 1024px) {
  .outer.cell-1x1 {
    flex-direction: column-reverse;
    justify-content: center;
    padding-bottom: 50px;
    text-align: center;
  }

  .outer.cell-1x2 {
    flex-direction: row-reverse;
    padding: 0 50px 0 0;
  }

  .outer.cell-1x2 .image {
    width: 200%;
    transform: translateX(-50%);
  }

  .outer.cell-1x2 button {
    margin: 0 0;
  }

  .outer.cell-1x3 {
    padding-left: 15rem;
  }

  .outer.cell-1x3 button {
    margin: 0 0;
  }

  .outer.cell-2x2 {
    flex-direction: column-reverse;
    padding-bottom: 50px;
    text-align: center;
  }
}
</style>
