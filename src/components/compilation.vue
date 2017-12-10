<template>
  <div class="compilation" v-if='posts.length > 0' :class='{"compilation--blur": slideshowActive}'>
    <p class="compilation__title" v-html='posts[0].acf.compilation.name'></p>
    <ul class="compilation__circle" :class='"compilation__circle--" + posts.length + ""'>
      <li :class='"compilation__circle--" + posts.length + "__item"' v-for='(post, index) in posts' @click='openSlideshow(index)'>
        <img :class='"compilation__circle--" + posts.length + "__item__image"' :src='post.acf.image.sizes["pwr-medium"]' alt="..." />
      </li>
    </ul>
    <slideShow v-if='$route.hash.substring(1) === "images"' :images='imagesArray' :count='0' @close='removeHash'/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import slideShow from '../components/slide-show'

export default {
  name: 'compilation',
  components: {
    slideShow
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      count: 0,
      slideshowActive: false
    }
  },
  computed: {
    ...mapState(['main']),
    imagesArray() {
      let result = []
      this.posts.map(post => {
        result.push({
          url: post.acf.image.sizes['pwr-large']
        })
      })
      return result
    }
  },
  mounted() {
    this.GET_POSTS()
    console.log('go!')
  },
  methods: {
    ...mapActions(['GET_POSTS']),
    openSlideshow(index) {
      this.slideshowActive = true
      this.$router.push({name: this.$route.name, hash: '#images', params: {slug: this.$route.params.slug, count: this.count}})
    },
    removeHash() {
      this.$router.push({name: 'main', hash: '', params: {slug: this.$route.params.slug}})
      this.slideshowActive = false
    }
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.hash.substring(1) === 'images') {
        this.slideshowActive = true
      } else {
        this.slideshowActive = false
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.compilation {
  position: relative;
  width: 50vw;
  height: 50vh;

  @include screen-size('small') {
    width: 100vw;
    height: 100vmin;
  }

  &--blur {
    *:not(.popup) {
      filter: blur(5px);
    }
  }

  &__title {
    display: block;
    font-style: italic;
    cursor: pointer;
    color: $black;
    z-index: 10;

    @include center;
    @include no-select;
  }

  &__circle {
    margin-top: $line-height;

    @include center;

    @for $i from 1 through 20 {
      @include modifier($i) {
        @include on-circle($i, $circle-l, $item-l);
        @include in-circle;
      }
    }
  }
}

</style>
