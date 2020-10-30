<template>
  <picture :class="className" >
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
    <img :src="src" :alt="alt" :sizes="sizes">
  </picture>
</template>

<script>
export default {
  props: {
    image: {
      type: Object,
      required: true
    },
    altPassed: {
      type: String,
      default: ''
    },
    sizes: {
      type: String,
       default: '100vw'
    },
    className: {
      type: String,
       default: ''
    },
  },
  data() {
    return {
      url: this.image.url,
      variants: this.image.variants,
      alt: typeof this.altPassed === "string" ? this.altPassed : this.image.altText,
      // className: this.className,
      originalFileExtension: "jpeg",
      srcSetWebp: '',
      srcSet: '',
      src: ''
    }
  },
  mounted() {
    const vars = this.variants || [];
    const hasVariants = vars.length > 0;

    // Determine srcSet
    const std = vars.filter((v) => v.url && !v.url.endsWith(".webp"));
    const webp = vars.filter((v) => v.url && v.url.endsWith(".webp"));
    this.srcSet = std.map(this.getVariantSrc).join(", ");
    this.srcSetWebp = webp.map(this.getVariantSrc).join(", ");

    if (std.length > 0) {
      ({
        groups: { name: this.originalFileExtension },
      } = std[0].url.match(/\.(?<name>[^\.]+)$/));

      // Provide correct mime type for jpg
      if (this.originalFileExtension === "jpg") {
        this.originalFileExtension = "jpeg";
      }

    }

    this.src = this.url || (hasVariants ? std[0].url : '');

  },
  methods: {
    getVariantSrc(variant) {
      return `${variant.url} ${variant.width}w`;
    }
  }
}
</script>

<style scoped>
.img > img {
  display: block;
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>