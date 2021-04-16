<template>
  <div class="crystallize-components-images">
    <template v-for="image in data">
      <div
        class="crystallize-components-images__image-wrapper"
        :class="getImageWrapperDynamicClasses(image)"
      >
        <CrystallizeImage
          :key="image.url"
          :image="image"
          class="crystallize-components-images__image"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getImageWrapperDynamicClasses: function (image) {
      const isPortrait = this.isPortraitImage(image);
      /* The is-portait modifier will make the portait images to be displayd in 2 columns.
       * The images that are not portrait, will occupy the whole row when not having an element in the same row
       */
      return isPortrait
        ? "crystallize-components-images__image-wrapper--is-portrait"
        : "";
    },
    isPortraitImage: function (image) {
      const { variants = [] } = image;
      const height = (variants && variants[0]?.height) || undefined;
      const width = (variants && variants[0]?.width) || undefined;

      return height >= width;
    },
  },
};
</script>

<style scoped src='./images.css'></style>
