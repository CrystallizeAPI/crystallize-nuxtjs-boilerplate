<template>
  <figure>
    <picture :class="className">
      <source
        v-if="srcSetWebp.length > 0"
        :srcSet="srcSetWebp"
        type="image/webp"
        :sizes="sizes"
      />
      <source
        v-if="srcSet.length > 0"
        :srcSet="srcSetWebp"
        :type="`image/${originalFileExtension}`"
        :sizes="sizes"
      />
      <img
        :src="src"
        :alt="altText"
        :role="role"
        :sizes="sizes"
        :width="width || bigWidth"
        :height="height || bigHeight"
      />
    </picture>
    <figcaption v-if="captionString" v-html="captionString"></figcaption>
  </figure>
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
    height: {
      type: Number,
      default: 100,
    },
    className: {
      type: String,
      default: "",
    },
    /*
     * Caption as the following shape:
     * {
     *   html?: Array<string>;
     *   json?: Array<any>;
     *   plainText?: Array<string>;
     * }
     * The `html` content has higher priority than `plainText` because it has richer content.
     * In case of getting both, the `html` is the one that will be displayed.
     *
     */
    caption: {
      type: Object,
      required: false,
    },
  },
  data() {
    const {
      altText,
      role,
      originalFileExtension,
      srcSetWebp,
      srcSet,
      src,
      bigWidth,
      bigHeight,
      captionString,
    } = this.getImageData(this.image);

    return {
      altText,
      role,
      originalFileExtension,
      srcSetWebp,
      srcSet,
      src,
      bigWidth,
      bigHeight,
      captionString,
    };
  },
  methods: {
    getVariantSrc(variant) {
      return `${variant.url} ${variant.width}w`;
    },
    getImageData(image) {
      const { variants, caption } = image;
      const vars = Boolean(variants) ? variants : [];
      // Separate the image variants by their respective types
      const std = vars?.filter((v) => v.url && !v.url.endsWith(".webp"));
      const webp = vars?.filter((v) => v.url && v.url.endsWith(".webp"));
      const srcSet = std.map(this.getVariantSrc).join(", ");
      const srcSetWebp = webp.map(this.getVariantSrc).join(", ");
      const captionString = caption?.html?.[0] || caption?.plainText?.[0] || "";

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

      const altText = this.alt || image.altText || "";

      return {
        altText,
        role: Boolean(altText) ? "img" : "presentation",
        originalFileExtension,
        srcSetWebp,
        srcSet,
        src,
        bigWidth: biggestImage?.width,
        bigHeight: biggestImage?.height,
        captionString,
      };
    },
  },
  watch: {
    image(newImage) {
      const {
        altText,
        role,
        originalFileExtension,
        srcSetWebp,
        srcSet,
        src,
        bigWidth,
        bigHeight,
        captionString,
      } = this.getImageData(newImage);

      this.altText = altText;
      this.role = role;
      this.originalFileExtension = originalFileExtension;
      this.srcSetWebp = srcSetWebp;
      this.srcSet = srcSet;
      this.src = src;
      this.bigWidth = bigWidth;
      this.bigHeight = bigHeight;
      this.captionString = captionString;
    },
  },
};
</script>

<style scoped>
img {
  /*
   * Images that don't have an explicit `display: block` have some space
   * after the `<img/>` tag because of the `inline-block` behavior.
   *
   * Adding a `display: block` we make sure that the elements ends
   * where the image finishes, which is the expected behavior.
   */
  display: block;
}

figure,
picture {
  display: block;
  height: 100%;
}

figcaption {
  margin-top: 0.25rem;
  font-size: var(--font-size-xs);
  font-style: italic;
  line-height: 1.35;
}

figcaption >>> p {
  margin-bottom: 0;
}
</style>