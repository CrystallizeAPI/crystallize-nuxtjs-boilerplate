<template>
  <div class="outer">
    <div class="sections">
      <div class="media">
        <div class="media-inner">
          <ImageComponent 
            :image="variant.image"
            sizes="(max-width: 768px) 400px, 60vw"
          />
        </div>
        <div class="info">
          <div class="name">
            <H1>{{ product.name }}</H1>
          </div>
          <div v-if="summary" class="summary">
            <!-- contentransformer -->
            <ContentTransformer v-for="(content, i) in summary.content.json" :key="i" >
              <div v-for="(child, childindex) in content.children" :key="childindex">
                <p>{{ child.textContent }}</p> 
              </div>
            </ContentTransformer>
          </div>
          <!-- variant selector -->
          <Buy :product="product" :selectedVariant="variant" />
        </div>
      </div>
    </div>
    <div class="content">
      <div v-if="description" class="description">
        <Shape :components="[description]" />
      </div>
      <div v-if="specs" class="specs">
        <Shape :components="[specs]" />
      </div>
    </div>
    <Topics 
      v-if="product.topics"
      :topicMaps="product.topics"
    />
    <Shape :components="componentsRest" />
  </div>
</template>

<script>
export default {
  props: ['product', 'preview'],
  data() {
    return {
      summary: this.findComponents(this.product.components, 'name', 'Summary'),
      description: this.findComponents(this.product.components, 'name', 'Description'),
      specs: this.findComponents(this.product.components, 'name', 'Specs'),
      componentsRest: this.product.components?.filter((c) => !['Summary', 'Description', 'Specs'].includes(c.name)),
      variant: this.product.variants.find((v) => v.isDefault === true),
    }
  },
  methods: {
    findComponents(components, property, filter) {
      return components.find((c) => c[property] === filter);
    },
  }
}
</script>

<style scoped>
.outer {
  max-width: 1600px;
  margin: 0 auto;
}

.shape-content {
  max-width: 800px;
  margin: 0 auto;
}

.loader {
  text-align: center;
  margin: 50px;
  font-size: 2rem;
}

.sections {
  display: flex;
  align-items: center;
  background: var(--color-box-background);
  padding: 50px;
  flex-direction: row-reverse;
  justify-content: center;
}

.content {
  display: flex;
  margin-top: 15px;
}

.specs {
  flex: 0 0 500px;
  border-left: 15px solid var(--color-main-background);
  background: var(--color-box-background);
}

.description {
  color: var(--color-text-sub);
  flex: 0 1 100%;
  background: var(--color-box-background);
  padding: 5rem 0;
}

.description h2:empty {
  display: none;
}

.description ul {
  margin: 1rem 0;
  padding-left: 1.2rem;
}

.description li  {
  margin-bottom: 0.5rem;
}

.media {
  flex: 0 0 65%;
  position: relative;
  padding: 3rem;
}

.info {
  flex: 1 1 auto;
  margin: 0 50px 0 50px;
}

.name h1 {
  font-family: 'Roboto', sans-serif;
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
}

.summary {
  color: var(--color-text-sub);
  font-size: 18px;
  line-height: 1.4;
  margin-bottom: 15px;
}

.product-footer {
  display: flex;
  flex-wrap: wrap;
  padding: 45px 0 0;
  justify-content: space-between;
  border-top: 1px solid #cecece;
  align-items: center;
}

.price {
  text-align: center;
  color: var(--color-text-sub);
  font-size: 30px;
  margin: 20px;
  margin-left: 0;
}

.price strong {
  display: inline-block;
  margin-left: 5px;
}

/* responsive.smAndLess */
@media (max-width: 1024px) {
  .sections {
    padding: 20px 0px;
    margin: 0 10px;
    display: block;
  }
}

/* responsive.xs */
@media (max-width: 768px) {
  .content {
    margin: 10px 10px 0;
    display: block;
  }

  .specs {
    border-left: 0;
    display: block;
    margin-top: 15px;
    padding: 20px 0;
  }

  .product-footer button {
    flex-grow: 1;
    margin: 1rem 0;
  }

  .price {
    flex-grow: 1;
  }
}

/* responsive.mdAndLess */
@media (max-width: 1600px) {
  .media {
    display: block;
    padding: 0;
    margin-bottom: 2em;
  }

  .media-inner {
    margin: 2em;
  }

  .media-inner img {
    object-fit: contain;
    max-height: 80vh;
    width: 100%;
    height: 100%;
    max-height: 40vh;
  }

  .info {
    margin: 2em;
  }
}
</style>