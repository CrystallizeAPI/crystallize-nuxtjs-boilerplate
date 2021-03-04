<template>
  <div class="document">
    <FetchLoader :state="$fetchState">
      <PageHeader :title="title" :description="headerDescription">
        <template v-if="topics" v-slot:preHeader>
          <ul class="document__topics">
            <li
              v-for="topic in topics"
              :v-key="topic.id"
              class="document__topics-element"
            >
              <Topic :isUnderlined="true" :data="topic" />
            </li>
          </ul>
        </template>

        <template v-slot:postHeader>
          <div class="document__socials">
            <IconButton
              screenReaderText="share on Twitter"
              iconSrc="/icons/twitter.svg"
            />
            <IconButton
              screenReaderText="share on Facebok"
              iconSrc="/icons/facebook.svg"
            />
            <IconButton
              screenReaderText="share on Pinterest"
              iconSrc="/icons/pinterest.svg"
            />
            <IconButton
              screenReaderText="share on Linkedin"
              iconSrc="/icons/linkedin.svg"
            />
          </div>
        </template>
      </PageHeader>

      <main class="document__main">
        <div>
          <div v-if="images" class="document__pre-article-images">
            <CrystallizeComponentsImages :data="images.content" />
          </div>
          <!--
            The article component does overwrite styles in order to
            make the document/article look the same after using
            CrystallizeComponents
            -->
          <Article>
            <CrystallizeComponents :components="[body]" />
          </Article>
        </div>

        <div>
          <aside v-if="featuredItems" class="document__aside">
            <h3 class="document__aside-title">Featured content</h3>
            <ul class="document__aside-list">
              <li
                v-for="item in featuredItems"
                :v-key="item.id"
                class="document__aside-list-element"
              >
                <MicroFormatProduct :data="item" />
              </li>
            </ul>
          </aside>
          <aside v-if="relatedItems" class="document__aside">
            <h3 class="document__aside-title">Related content</h3>
            <ul v-if="relatedItems" class="document__aside-list">
              <li
                class="document__aside-list-element"
                v-for="item in relatedItems"
                :v-key="item.id"
              >
                <MicroFormatProduct :data="item" />
              </li>
            </ul>
          </aside>
        </div>
      </main>
    </FetchLoader>
  </div>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { simplyFetchFromGraph } from "../../lib/graph";
import fragments from "../../lib/graph/fragments";
import {
  getDocumentTitle,
  getHumanReadableDate,
  getArticlesWithoutRepeatedElements,
} from "./utils";

export default {
  data: function () {
    return {
      document: {},
      title: null,
      headerDescription: null,
      publicatedAt: null,
      images: [],
      humanReadableDate: null,
      topics: [],
      body: null,
      featuredItems: [],
      relatedItems: [],
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
    const { data } = await simplyFetchFromGraph({
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

    const { document } = data;
    console.log(document);

    if (!document) {
      return;
    }
    const description = document.components?.find((c) => c.name === "Intro");
    const publicatedAt = new Date(document.publishedAt);
    // const ISODate = publicatedAt.toISOString();
    const topics = document?.topics;
    console.log(topics);
    const body = document.components?.find((c) => c.name === "Body");
    const featured = document?.components?.find((c) => c.name === "Featured");

    this.document = document;
    this.title = getDocumentTitle(document);
    this.metaDescription = toText(description.content.json);
    this.headerDescription = description.content.json;
    this.body = body;
    this.images = document.components?.find((c) => c.name === "Image");
    this.featuredItems = featured?.content?.items;
    this.topics = topics;

    // Find all topic maps, as a parent, then filter on "document" type
    // Comment in the first filter line with your topic name to filter on a specific topic
    // Comment in the "document" if to only show articles
    const relatedArticles = topics
      // ?.filter((topic) => topic?.parent?.name === '[YOUR-TOPIC-MAP-NAME]')
      ?.map((topic) => topic?.items?.edges)
      ?.flat()
      ?.filter((node) => node?.node?.path !== route.path);

    // console.log(relatedArticles);
    this.relatedItems = getArticlesWithoutRepeatedElements(relatedArticles);

    this.publicatedAt = publicatedAt;
    this.humanReadableDate = getHumanReadableDate(publicatedAt);
  },
  head() {
    if (!this.metaDescription) {
      console.warn(
        "this.metaDescription is missing for document",
        this.document.name
      );
    }

    return {
      title: this.title,
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
