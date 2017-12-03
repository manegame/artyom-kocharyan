<template>
  <div class="compilation">
    <p class="compilation__title" @click='rotated = !rotated'>
      Compilation 1
    </p>
    <ul class="compilation__circle" :class='{"compilation__circle--rotated": rotated}'>
      <li class="compilation__circle__item" v-for='item in main.posts'><img class="compilation__circle__item__image" :src='item.acf.image.sizes["pwr-medium"]' alt="..." /></li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'compilation',
  data() {
    return {
      rotated: false
    }
  },
  computed: {
    ...mapState(['main'])
  },
  mounted() {
    this.GET_POSTS()
  },
  methods: {
    ...mapActions(['GET_POSTS'])
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.compilation {
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
