<template>
  <picture :class="className">
    <source v-if="srcSetWebp.length > 0" :srcSet="srcSetWebp" type="image/webp" :sizes="sizes" />
    <source
      v-if="srcSet.length > 0"
      :srcSet="srcSetWebp"
      :type="`image/${originalFileExtension}`"
      :sizes="sizes"
    />
    <img :src="src" :alt="altText" :sizes="sizes" :width="width" :height="height" />
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    sizes: {
      type: String,
      default: "100vw",
    },
    width: {
      type: Number,
      default: 100,
    },
    height:{
      type:Number,
      default:100,
  },
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    const image = this.image;

    // Separate the image variants by their respective types
    const vars = image.variants || [];
    const std = vars.filter((v) => v.url && !v.url.endsWith(".webp"));
    const webp = vars.filter((v) => v.url && v.url.endsWith(".webp"));
    const srcSet = std.map(this.getVariantSrc).join(", ");
    const srcSetWebp = webp.map(this.getVariantSrc).join(", ");

    // Determine the file extension for the original image
    let originalFileExtension = "jpeg";
    const srcToGetOriginalFileExtension = image.url || std[0]?.url;
    if (srcToGetOriginalFileExtension) {
      ({
        groups: { name: this.originalFileExtension },
      } = srcToGetOriginalFileExtension.match(/\.(?<name>[^.]+)$/));

      // Provide correct mime type for jpg
      if (originalFileExtension === "jpg") {
        originalFileExtension = "jpeg";
      }
    }

    /**
     * Set the fallback url to be the standard variant
     * if it exists, or the original image url.
     * The fallback will be used if the browser does
     * not support srcset: https://caniuse.com/srcset
     */
    const src = std[0]?.url || image.url;

    // Get the image dimensions
    let biggestImage = vars[0];
    if (vars.length > 0) {
      biggestImage = vars.reduce(function (acc, v) {
        if (!acc.width || v.width > acc.width) {
          return v;
        }
        return acc;
      }, vars[0]);
    }

    return {
      altText: this.alt || this.image.altText,
      originalFileExtension,
      srcSetWebp,
      srcSet,
      src,
      width: biggestImage?.width,
      height: biggestImage?.height,
    };
  },
  methods: {
    getVariantSrc(variant) {
      return `${variant.url} ${variant.width}w`;
    },
  },
};
</script>
