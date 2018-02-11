<template>
  <div class="headbar"
       :class='{"headbar--light": light}'>

    <router-link class='headbar__item'
                 :to="{ name: 'main' }"
                 v-html='"Artyom Kocharyan"' />

    <router-link class='headbar__item'
                 :class='{
                   "headbar__item--active": $route.name === "burial" ||
                                            $route.name === "svg" ||
                                            $route.name === "single" }'
                 :to='this.$route.name === "burial" ? { name: "main" } : { name: "burial", params: { video: "enter" }}'
                 v-html='"Burial Artyomovich"' />

    <router-link class='headbar__item'
                 :class='{"headbar__item--active": $route.name === "svg" || $route.name === "single"}'
                 :to='this.$route.name === "svg" ? { name: "main" } : { name: "svg", params: {component: "annunciationHead", title: "the Annunciation"}}'
                 v-html='"SVGs"' />

    <router-link class='headbar__item'
                :class='{"headbar__item--active": $route.hash.substring(1) === "images"}'
                v-if='$route.name === "single"'
                :to="{ name: 'single', params: { slug: $route.params.slug }}"
                v-html='main.single.title.rendered' />

    <router-link class='headbar__item'
                 v-if='$route.name === "single" && main.single.acf.description !== ""'
                 :to='$route.hash.substring(1) === "description" ? {name: "single"} : { name: "single", hash: "#description" }'
                 v-html='"description"' />

    <router-link class='headbar__item'
                v-if='$route.name === "svg"'
                :to="{ name: 'svg', params: { slug: $route.params.slug }}"
                v-html='$route.params.title' />

    <router-link class='headbar__item'
                v-if='$route.hash.substring(1) === "images"'
                :to="{ name: 'single', params: { slug: $route.params.slug }}"
                v-html='"back"' />

    <router-link class='headbar__item--active headbar__item--active--flipped'
                v-if='$route.name === "svg"'
                :to='{ name: "svg", params: {component: "venus", title: "Venus de Milo"}}'
                v-html='"next"'/>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'headbar',
  methods: {
    escapeLoading() {
      window.stop()
    }
  },
  computed: {
    ...mapState(['main']),
    light() {
      if (this.$route.name === 'burial') return true
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

  &--light {
    filter: invert(100%);
  }

  &__item {
    color: $black;
    white-space: nowrap;
    margin-right: 0.2em;
    text-decoration: none;

    &--active {
      color: transparent;
      background-image: url('../../static/arrow.png');
      background-size: cover;

      &--flipped,
      &--flipped:hover {
        background-image: url('../../static/arrow-r.png');
        background-position: right;
      }
    }
  }
}
</style>
