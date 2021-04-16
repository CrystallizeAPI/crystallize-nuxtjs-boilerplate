<template>
  <div class="document">
    <FetchLoader :state="$fetchState">
      <Container>
        <PageHeader :title="title" :description="headerDescription">
          <template v-slot:preHeader>
            <div class="document__header-pretitle">
              <TopicsList v-if="topics" :data="topics" :isUnderlined="true" />
              <time
                v-if="publishedAtHumanReadable"
                :dateTime="publishedAtDateISO"
                class="document__published-at"
              >
                {{ publishedAtHumanReadable }}
              </time>
            </div>
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
      </Container>

      <Container>
        <main class="document__main">
          <div>
            <div v-if="images" class="document__pre-article-images">
              <CrystallizeComponentsImages :data="images.content.images" />
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
            <Aside
              v-if="featuredItems"
              title="Featured"
              :items="featuredItems"
              :isSticky="!relatedItems"
            />
            <Aside
              v-if="relatedItems"
              title="Related"
              :items="relatedItems"
              :isSticky="true"
            />
          </div>
        </main>
      </Container>
    </FetchLoader>
  </div>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getData as getDocumentData } from "./get-data";
import {
  getDocumentTitle,
  getHumanReadableDate,
  getArticlesWithoutRepeatedElements,
} from "./utils";
import Aside from "./Aside/index";

export default {
  components: {
    Aside,
  },
  data: function () {
    return {
      document: {},
      title: null,
      headerDescription: null,
      publishedAtHumanReadable: null,
      publishedAtDateISO: null,
      images: null,
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
    const { data } = await getDocumentData({
      asPath: route.path,
      language: locale.crystallizeCatalogueLanguage,
      preview: this.$route.query.preview,
    });

    const { document } = data;
    if (!document) {
      return;
    }

    const description = document.components?.find((c) => c.name === "Intro");
    const topics = document.topics;
    const body = document.components?.find((c) => c.name === "Body");
    const featured = document.components?.find((c) => c.name === "Featured");
    const publishedAt = new Date(document.publishedAt);

    this.document = document;
    this.title = getDocumentTitle(document);
    this.metaDescription = toText(description.content.json);
    this.headerDescription = description.content.json;
    this.body = body;
    this.images = document.components?.find((c) => c.name === "Image");
    this.featuredItems = featured?.content?.items;
    // @TODO: why topics are not returned? a _normalized error is thrown
    this.topics = topics;

    if (document.publishedAt) {
      this.publishedAtDateISO = this.getDateISO(publishedAt);
      this.publishedAtHumanReadable = getHumanReadableDate(publishedAt);
    }

    // Find all topic maps, as a parent, then filter on "document" type
    // Comment in the first filter line with your topic name to filter on a specific topic
    // Comment in the "document" if to only show articles
    const relatedArticles = topics
      // ?.filter((topic) => topic?.parent?.name === '[YOUR-TOPIC-MAP-NAME]')
      ?.map((topic) => topic?.items?.edges)
      ?.flat()
      ?.filter((node) => node?.node?.path !== route.path);

    this.relatedItems = getArticlesWithoutRepeatedElements(relatedArticles);
  },
  methods: {
    getDateISO: function (date) {
      return date.toISOString();
    },
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
