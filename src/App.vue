<template>
  <div class='app'>
    <headbar />
    <router-view />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import headbar from './components/headbar'

export default {
  name: 'app',
  components: {
    headbar
  },
  data() {
    return {
      been: false,
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
  created() {
    // if (!this.been) {
    //   console.log('never been here before')
    //   this.$cookie.set('been', true, 7)
    // } else {
    //   console.log('been here before')
    // }
    // document.addEventListener('unload', this.$cookie.delete('been'))
  },
  mounted() {
    this.$_setMetaTags()
    this.$_fetchData(this.$route.name)
    this.been = this.$cookie.set('been', true, 7)
  },
  methods: {
    ...mapActions([
      'GET_POSTS',
      'SET_FIELD',
      'FIELDS_SET',
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
      this.CLEAR_SINGLE_EXHIBITION()
      if (routeName === 'main' && !this.main.fieldsSet) {
        this.GET_POSTS()
          .then(() => {
            this.main.posts.forEach(post => {
              console.log('set field')
              this.SET_FIELD(post)
            })
          })
          .then(() => {
            this.FIELDS_SET()
          })
      }
      if (routeName === 'single') {
        this.GET_SINGLE_EXHIBITION(this.$route.params.slug)
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
    }
  }
}
</script>

<style lang='scss'>
@import './style/helpers/_mixins.scss';
@import './style/helpers/_reset.css';
@import './style/helpers/_responsive.scss';
@import './style/_variables.scss';

.app {
  min-height: 100vh;
  font-family: 'Times New Roman';
  font-size: $font-size;
  line-height: $line-height;
  color: $white;
  background: $white;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
