<template>
  <div class="headbar">
    <router-link class='headbar__item'
                 :to="{ name: 'main' }"
                 v-html='"Artyom Kocharyan"' />
    <router-link class='headbar__item'
                 :class='{"headbar__item--active": this.$route.name === "burial"}'
                 :to='this.$route.name === "burial" ? { name: "main" } : { name: "burial" }'
                 v-html='"Burial Artyomovich"' />
    <router-link class='headbar__item'
                 :class='{"headbar__item--active": this.$route.name === "svg"}'
                 :to='this.$route.name === "svg" ? { name: "main" } : { name: "svg" }'
                 v-html='"SVG"' />
  </div>
</template>

<script>
export default {
  name: 'headbar',
  methods: {
    escapeLoading() {
      window.stop()
    }
  }
}
</script>

<style lang="scss">
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.headbar {
  position: fixed;
  width: 100%;
  top: 0;
  padding: 0 20px;
  text-align: left;
  font-family: 'Times New Roman';
  font-size: $font-size;
  line-height: $line-height;
  cursor: pointer;

  &__item {
    white-space: nowrap;
    margin-right: 0.2em;

    &--active {
      color: transparent;
      background-image: url('../../static/arrow.png');
      background-size: cover;

      &:hover {
        color: transparent;
        background-image: url('../../static/arrow.png');
        background-size: cover;
      }
    }
  }
}
</style>
