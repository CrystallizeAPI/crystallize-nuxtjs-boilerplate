<template>
  <ul class="topics-list" :class="topicListDynamicClass">
    <li v-for="topic in data" :v-key="topic.id" class="topics-list__element">
      <Topic :isUnderlined="isUnderlined" :data="topic" />
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    isUnderlined: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    const baseClass = "topics-list";
    let dynamicClass = [baseClass];
    const classModifierByUnderline = `${baseClass}--is-underlined`;
    this.isUnderlined && dynamicClass.push(classModifierByUnderline);

    return {
      topicListDynamicClass: dynamicClass.join(" "),
    };
  },
};
</script>

<style scoped src='./index.css'></style>