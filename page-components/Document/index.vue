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

        <template v-if="topics" v-slot:postHeader>
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
        <!-- The article component does overwrite styles in order to make the
        document/article look the same after using CrystallizeComponents -->
        <Article>
          <CrystallizeComponents :components="[body]" />
        </Article>

        <!-- @todo: add sidebar -->
        <div>
          <!-- @todo: add featured content -->
          <aside>working</aside>
          <!-- @todo: add related content -->
          <aside>working</aside>
        </div>
      </main>
    </FetchLoader>
  </div>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { simplyFetchFromGraph } from "../../lib/graph";
import fragments from "../../lib/graph/fragments";
import { getDocumentTitle, getHumanReadableDate } from "./utils";

export default {
  data: function () {
    return {
      document: {},
      title: null,
      headerDescription: null,
      publicatedAt: null,
      humanReadableDate: null,
      topics: [],
      body: null,
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

    if (!document) {
      return;
    }
    const description = document.components?.find((c) => c.name === "Intro");
    const publicatedAt = new Date(document.publishedAt);
    // const ISODate = publicatedAt.toISOString();
    const topics = document.topics;
    const body = document?.components?.find((c) => c.name === "Body");

    this.document = document;
    this.title = getDocumentTitle(document);
    this.metaDescription = toText(description.content.json);
    this.headerDescription = description.content.json;
    this.body = body;
    /*
     * @TODO: Get topics from the graphql. Why are they missing??
     */
    const MOCKED_TOPICS = [
      {
        id: "5fcb5b7b877645086d7a4581",
        name: "Organic",
      },
      {
        id: "5fcb5b93af1eeb083df3b227",
        name: "Eco friendly",
      },
      {
        id: "5fcb5bb5af1eebf7f3f3b229",
        name: "Livingroom",
      },
      {
        id: "5ff58cee7af25b44e7fcdf96",
        name: "Outdoor",
      },
      {
        id: "5fcf4b82af1eeb6397f3bb14",
        name: "Campaign",
      },
    ];
    this.topics = MOCKED_TOPICS;
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
