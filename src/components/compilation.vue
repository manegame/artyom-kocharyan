<template>
  <div class="compilation" v-if='content.length > 0' :class='{"compilation--blur": slideshowActive}'>
    <p class="compilation__title" v-html='content[0].acf.compilation.name'></p>
    <ul class="compilation__circle" :class='"compilation__circle--" + content.length + ""'>
      <li :class='"compilation__circle--" + content.length + "__item"' v-for='(post, index) in content' @click='$emit("passImgs")'>
        <img :class='"compilation__circle--" + content.length + "__item__image"' :src='post.acf.image.sizes["pwr-medium"]' alt="..." />
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'compilation',
  props: {
    content: {
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
      this.content.map(post => {
        result.push({
          url: post.acf.image.sizes['pwr-large']
        })
      })
      return result
    }
  },
  methods: {
    openSlideshow(index) {
      this.slideshowActive = true
      this.$router.push({name: this.$route.name, hash: '#images'})
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
