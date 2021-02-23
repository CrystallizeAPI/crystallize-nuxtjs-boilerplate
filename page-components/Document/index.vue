<template>
  <div class="document">
    <Outer>
      <FetchLoader :state="$fetchState">
        <h1>{{ document.name }}</h1>
        <CrystallizeItemComponents :components="document.components" />
      </FetchLoader>
    </Outer>
  </div>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { simplyFetchFromGraph } from "../../lib/graph";
import fragments from "../../lib/graph/fragments";

export default {
  data() {
    return {
      document: {},
    };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * Get EVERYTHING for this document
     * You probably want to cherry pick the fields in
     * the query here to improve performance
     */
    const response = await simplyFetchFromGraph({
      query: `
        query DOCUMENT_PAGE($path: String!, $language: String!) {
          document: catalogue (path: $path, language: $language) {
            ...item
            ...product
          }
        }

        ${fragments}
      `,
      variables: {
        path: route.path,
        language: locale.crystallizeCatalogueLanguage,
      },
    });

    const { document } = response.data;

    // Get a description for the document
    const richTextComponent = document?.components?.find(
      (c) => c.type === "richText"
    );
    if (richTextComponent?.content?.json) {
      // Provide a good meta description for this page
      this.metaDescription = toText(richTextComponent.content.json);
    }

    this.document = document;
  },
  head() {
    if (!this.metaDescription && this.document?.name) {
      console.warn(
        "this.metaDescription is missing for document",
        this.document.name
      );
    }

    return {
      title: this.document?.name,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.metaDescription,
        },
      ],
    };
  },
};
</script>

<style scoped src='./index.css'></style>
