<template>
  <div class='app'>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      meta: {
        sitename: 'Artyom Kocharyan',
        facebook: 'xxxxxxxxx',
        twitter: '@xxxxx',
        title: 'Artyom Kocharyan',
        description: 'xxxx',
        type: 'website',
        image: 'http://xxxx',
        url: 'http://xxxx',
        defaults: {
          title: 'Artyom Kocharyan',
          description: 'xxxx',
          image: 'http://xxxx',
          type: 'website'
        }
      }
    }
  },
  computed: {
    ...mapState(['main'])
  },
  watch: {
    $route(to, from) {}
  },
  mounted() {
    this.$_setMetaTags()
  },
  methods: {
    ...mapActions(['GET_POSTS']),
    $_setMetaTags(meta = {}) {
      this.meta.title = meta.title || this.meta.defaults.title
      this.meta.description = meta.description || this.meta.defaults.description
      this.meta.image = meta.image || this.meta.defaults.image
      this.meta.type = meta.type || this.meta.defaults.type
      this.meta.url = 'http://xxx.com' + this.$route.fullPath
      this.$emit('updateHead')
    },
    $_fetchData(routeName) {
      // All requests for data from the server originates from this function
      if (routeName === 'home') {
        this.GET_POSTS()
      }
    }
  },
  head: {
    title() {
      return {
        inner: this.meta.title
      }
    },
    meta() {
      return [
        {name: 'application-name', content: 'Artyom Kocharyan'},
        {name: 'description', content: this.meta.description},
        // Twitter
        {name: 'twitter:card', content: 'summary'},
        {name: 'twitter:title', content: this.meta.title},
        {name: 'twitter:description', content: this.meta.description},
        {name: 'twitter:site', content: this.meta.twitter},
        {name: 'twitter:creator', content: this.meta.twitter},
        {name: 'twitter:image:src', content: this.meta.image},
        // Facebook / Open Graph
        {property: 'og:title', content: this.meta.title},
        {property: 'og:site_name', content: this.meta.defaults.title},
        {property: 'og:description', content: this.meta.description},
        {property: 'og:type', content: this.meta.type},
        {property: 'og:url', content: this.meta.url},
        {property: 'og:image', content: this.meta.image},
        // {property: 'fb:admins', content: this.meta.facebook},
        // {property: 'fb:app_id', content: this.meta.facebook},
        // Google+ / Schema.org
        {itemprop: 'name', content: this.meta.title},
        {itemprop: 'description', content: this.meta.description},
        {itemprop: 'image', content: this.meta.image}
      ]
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_responsive.scss';
@import './style/_variables.scss';

.app {
  min-height: 100vh;
  font-family: $sans-serif-stack;
  font-size: $font-size;
  line-height: $line-height;
  color: $white;
  background: tomato;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: black;

  &:visited,
  &:hover,
  &:active {
    color: black;
  }
}
</style>
