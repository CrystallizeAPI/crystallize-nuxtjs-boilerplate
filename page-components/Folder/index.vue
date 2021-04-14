<template>
  <FetchLoader :state="$fetchState">
    <Container>
      <PageHeader :title="title" :description="headerDescription">
        <template v-slot:postHeader>
          <div v-if="subFolders" class="folder__subfolder-list">
            <NuxtLink
              v-for="subFolder in subFolders"
              :to="subFolder.path"
              :key="subFolder.name"
              style="display: flex"
            >
              <Tag>{{ subFolder.name }}</Tag>
            </NuxtLink>
          </div>
        </template>
      </PageHeader>
    </Container>
    <Container>
      <CrystallizeComponents :components="[body]" />
      <CrystallizeGrid v-if="grid" :grid="grid" />
      <CrystallizeStackable :stacks="stackableContent" />

      <ul v-if="nonFolderItems" class="folder-page__list">
        <li
          v-for="item in nonFolderItems"
          class="folder-page__list-item"
          :class="`folder-page__list-item--${item.type}`"
        >
          <ListFormat :data="item" />
        </li>
      </ul>

      <!-- <CrystallizeCatalogueItems
        v-if="nonFolderItems"
        :items="nonFolderItems"
      /> -->
    </Container>
  </FetchLoader>
</template>

<script>
import toText from "@crystallize/content-transformer/toText";
import { getData as getFolderData } from "./get-data";
import {
  getFolderTitle,
  getFolderDescription,
  getFolderSubFolders,
  getFolderBody,
  getFolderGrids,
  getFolderStackableContent,
} from "./utils";

export default {
  data() {
    return {
      folder: {},
      title: null,
      headerDescription: null,
      subFolders: null,
      grid: null,
      body: null,
      stackableContent: null,
      nonFolderItems: null,
    };
  },
  async fetch() {
    const { route } = this.$nuxt.context;
    const { locales, locale: code } = this.$i18n;
    const locale = locales.find((l) => l.locale === code) || locales[0];

    /**
     * As default, we get EVERYTHING for this folder
     * You probably want to cherry pick the fields in
     * the query here to improve performance
     */
    const response = await getFolderData({
      asPath: route.path,
      language: locale.crystallizeCatalogueLanguage,
      preview: this.$route.query.preview,
    });

    const { folder } = response.data;
    this.folder = folder;
    const { children, components } = folder;

    this.title = getFolderTitle(folder);
    this.subFolders = getFolderSubFolders(folder) || null;

    if (components && components.length > 0) {
      const richTextComponent = getFolderDescription(folder);
      if (richTextComponent?.content?.json) {
        this.headerDescription = richTextComponent.content.json;
        this.metaDescription = toText(richTextComponent.content.json);
      }

      this.body = getFolderBody(folder) || [];
      this.grid = getFolderGrids(folder);
      this.stackableContent = getFolderStackableContent(folder);
      this.nonFolderItems = children?.filter((c) => c.type !== "folder");
    }
  },
  head() {
    if (!this.metaDescription && this.folder?.name) {
      console.warn(
        "this.metaDescription is missing for folder",
        this.folder.name
      );
    }

    return {
      title: this.folder?.name,
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

<style src='./index.css'></style>
