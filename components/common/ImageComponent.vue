<template>
  <div>
    <picture>
      <source 
        v-if="srcSetWebp.length > 0" 
        :srcSet="srcSetWebp"
        type="image/webp" 
        sizes="80vw"
      />
      <source 
        v-if="srcSet.length > 0" 
        :srcSet="srcSetWebp"
        :type="`image/${originalFileExtension}`"
        sizes="80vw"
      />
      <img :src="src" :alt="alt" sizes="80vw">
    </picture>
  </div>
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
    // className: {
    //   type: String,
    //    default: null
    // }
  },
  data() {
    return {
      url: this.image.url,
      sizes: this.image.sizes,
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


    console.log('THIS IS MY IMAGE', this.image)

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

</style>