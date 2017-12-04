<template>
  <div class="compilation">
    <p class="compilation__title" @click='rotated = !rotated'>
      Compilation 1
    </p>
    <ul class="compilation__circle" :class='{"compilation__circle--rotated": rotated}'>
      <li class="compilation__circle__item" v-for='(item, index) in main.posts' @click='openSlideshow(index)'><img class="compilation__circle__item__image" :src='item.acf.image.sizes["pwr-medium"]' alt="..." /></li>
    </ul>
    <slideShow v-if='$route.hash.substring(1) === "images"' :images='imageArray'/>

    <!-- <bacPopUpSlideshow v-if='$route.hash.substring(1) === "images"' @close='removeHash' :images='$route.params.language === "en" ? englishImageArray : arabicImageArray' :captions='$route.params.language === "en" ? englishCaptionsArray : arabicCaptionsArray' :count='count' /> -->

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
  data() {
    return {
      rotated: false,
      count: 0
    }
  },
  computed: {
    ...mapState(['main']),
    imageArray() {
      console.log('populating array')
      let result = []
      this.main.posts.map(post => {
        result.push({
          type: 'image',
          url: post.acf.image.sizes['pwr-large']
        })
      })
      return result
    }
  },
  mounted() {
    this.GET_POSTS()
  },
  methods: {
    ...mapActions(['GET_POSTS']),
    openSlideshow(index) {
      console.log('called', index)
      // this.count = index
      // this.$router.push({name: this.$route.name, hash: '#images', params: {slug: this.$route.params.slug}})
    },
    removeHash() {
      this.$router.push({name: 'page', hash: '', params: {slug: this.$route.params.slug}})
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
  height: 100vmin;
  width: 100vmin;
  display: flex;
  align-items: center;

  &__title {
    display: block;
    font-style: italic;
    cursor: pointer;

    @include center;
    @include no-select;
  }

  &__circle {
    border: solid 5px red;
    pointer-events: none;
    margin: 0 auto;

    @include on-circle(4, 80vmin, 0, 120);

    &__item {
      &__image {
        display: block;
        max-width: 100%;
        border-radius: 0;
        transition: 0.15s;
      }
    }

    &--rotated {
      color: black;

      @include on-circle(3, 80vmin, 200px, 0);
    }
  }
}

</style>
