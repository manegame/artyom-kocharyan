<template>
  <div class='app'>
    <router-view />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  name: 'app',
  data() {
    return {
      ps: [],
      scrollConfig: {
        minScrollbarLength: 40,
        maxScrollbarLength: 120,
        suppressScrollX: true
      },
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
  mounted() {
    this.$_setMetaTags()
    this.$_fetchData(this.$route.name)
    this.been = this.$cookie.set('been', true, 7)
  },
  created() {
    if (this.$route.name === 'info' || this.$route.name === 'single') this.$_initCustomScrollbars()
  },
  methods: {
    ...mapActions([
      'GET_POSTS',
      'GET_SINGLE_EXHIBITION',
      'CLEAR_SINGLE_EXHIBITION'
    ]),
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
      if (routeName === 'main') {
        this.GET_POSTS()
      }
      if (routeName === 'single' || routeName === 'info' || routeName === 'lightbox') {
        if (this.main.posts.length) this.GET_SINGLE_EXHIBITION(this.$route.params.slug)
        else {
          this.GET_POSTS().then(() => {
            this.GET_SINGLE_EXHIBITION(this.$route.params.slug)
          })
        }
      }
    },
    $_initCustomScrollbars() {
      console.log('init scrollbars')
      window.setTimeout(() => {
        this.ps[0] = new PerfectScrollbar('.single__info', this.scrollConfig)
      }, 500)
    },
    $_destroyCustomScrollbars() {
      console.log('destroy scrollbars')
      if (this.ps[0]) {
        console.log('destroy scrollbars yepp')
        this.ps[0].destroy()
        this.ps[0] = null
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
  },
  watch: {
    '$route'(to, from) {
      this.$_fetchData(this.$route.name)
      if (to.name === 'single' || to.name === 'info') {
        if (this.ps.length > 0) {
          this.$_destroyCustomScrollbars()
        }
        this.$_initCustomScrollbars()
      }
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_reset.css';
@import './style/helpers/_responsive.scss';
@import './style/_variables.scss';
@import './style/vendor/perfect-scrollbar.css';

.app {
  min-height: 100vh;
  font-family: 'Times New Roman';
  font-size: $font-size;
  line-height: $line-height;
  letter-spacing: $letter-spacing;
  color: $white;
  background: $white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  p,
  a {
    font-size: $font-size;
    line-height: $line-height;
  }

  em {
    font-style: italic;
  }

  a {
    color: $black;
    text-decoration: none;

    &:visited,
    &:hover {
      color: $black;
      text-decoration: none;
    }

    &:active {
      text-decoration: underline;
    }
  }

  .ps__rail-y {
    opacity: 1;
    width: 14px;
    margin: 20px 0;

    .ps__thumb-y {
      background: $black;
      width: 8px;
      margin-right: 1px;
    }
  }
}
</style>
