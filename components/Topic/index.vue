<template>
  <span class="topic" :class="topicDynamicClass">
    {{ topic.name }}
  </span>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    isUnderlined: {
      type: Boolean,
      required: true,
    },
  },
  data: function () {
    const topicName = this.data?.name || "victor";
    const baseClass = "topic";
    const topicNameSnakeCase = this.toKebabCase(topicName);
    const classModifierByName = `${baseClass}--${topicNameSnakeCase}`;
    let dynamicClass = [baseClass, classModifierByName];

    const classModifierByUnderline = `${baseClass}--is-underlined`;
    this.isUnderlined && dynamicClass.push(classModifierByUnderline);

    return {
      topic: this.data,
      topicDynamicClass: dynamicClass.join(" "),
    };
  },
  methods: {
    toKebabCase: function (string) {
      return string.toLowerCase().replace(" ", "-");
    },
  },
};
</script>

<style scoped src='./index.css'></style>