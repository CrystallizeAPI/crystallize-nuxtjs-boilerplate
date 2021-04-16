<template>
  <div class="catalogue-slider">
    <SliderButton
      direction="previous"
      :isDisplayed="isPreviousButtonDisplayed"
      :label="$t('common.slider.previous')"
      @click="() => moveScroll(-1)"
    >
      &#10142;
    </SliderButton>
    <ul class="catalogue-slider__items" ref="slider">
      <li
        v-for="item in items"
        :key="item.id"
        :class="`catalogue-slider__item catalogue-slider__item--${item.type}`"
      >
        <ListFormat :data="item" />
      </li>
    </ul>
    <SliderButton
      direction="next"
      :isDisplayed="isNextButtonDisplayed"
      :label="$t('common.slider.next')"
      @click="() => moveScroll(1)"
    >
      &#10142;
    </SliderButton>
  </div>
</template>

<script>
import SliderButton from "./SliderButton/index";

const SCROLL_STATES = {
  NO_SCROLL: "no-scroll",
  BEGINNING: "BEGINNING",
  MID: "mid",
  END: "end",
};

export default {
  components: { SliderButton },
  data() {
    return {
      scrollFromLeft: 0,
      scrollState: SCROLL_STATES.BEGINNING,
      isPreviousButtonDisplayed: false,
      isNextButtonDisplayed: false,
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: null,
    },
  },
  mounted() {
    this.updateScrollStateAndArrowVisibilities();
  },
  methods: {
    moveScroll(direction) {
      const slider = this.$refs.slider;

      const currentScroll = slider.scrollLeft;
      this.scrollFromLeft =
        currentScroll + this.$refs.slider.offsetWidth * 0.75 * direction;

      slider.scrollTo({
        top: 0,
        left: this.scrollFromLeft,
        behavior: "smooth",
      });
    },
    /**
     * When we update the scroll of the slider, because of the reacetivity,
     * we get the old value and cannot keep it in sync.
     *
     * To avoid this, we accept a parameter called "scrollLeftToKeepInSync"
     * so we can pass the newest value on the watch method.
     */
    updateScrollStateAndArrowVisibilities({ scrollLeftToKeepInSync } = {}) {
      const slider = this.$refs.slider;

      const currentScroll = scrollLeftToKeepInSync || slider.scrollLeft;
      const isScrollAtTheEnd =
        this.$refs.slider.offsetWidth >= slider.scrollWidth - currentScroll;
      const isScrollAtTheBeginning = currentScroll <= 0;
      const hasScroll = !(isScrollAtTheBeginning && isScrollAtTheEnd);

      if (!hasScroll) {
        this.scrollState = SCROLL_STATES.NO_SCROLL;
        this.isPreviousButtonDisplayed = false;
        this.isNextButtonDisplayed = false;
        return;
      }

      if (isScrollAtTheEnd) {
        this.scrollState = SCROLL_STATES.END;
        this.isPreviousButtonDisplayed = true;
        this.isNextButtonDisplayed = false;
        return;
      }

      if (isScrollAtTheBeginning) {
        this.scrollState = SCROLL_STATES.BEGINNING;
        this.isPreviousButtonDisplayed = false;
        this.isNextButtonDisplayed = true;
        return;
      }

      this.scrollState = SCROLL_STATES.MID;
      this.isPreviousButtonDisplayed = true;
      this.isNextButtonDisplayed = true;
    },
  },
  watch: {
    scrollFromLeft(latestScrollLeft) {
      this.updateScrollStateAndArrowVisibilities({
        scrollLeftToKeepInSync: latestScrollLeft,
      });
    },
  },
};
</script>

<style scoped src='./index.css'></style>
