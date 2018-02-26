<template>
  <div class="main dragscroll">
    main new
    <div class="main__cluster main__cluster--1" style='background:red' />
    <div class="main__cluster main__cluster--2" style='background:blue' />
    <div class="main__cluster main__cluster--3" style='background:#b2f526' />
    <div class="main__cluster main__cluster--4" style='background:#f086cc' />
    <div class="main__cluster main__cluster--5" style='background:#66b332' />
    <div class="main__cluster main__cluster--6" style='background:#32b394' />
    <div class="main__cluster main__cluster--7" style='background:#b332b1' />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  name: 'main-new',
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions([
      'GET_POSTS',
      'GET_SVGS',
      'GET_BURIAL',
      'GET_VIDEOS'
    ])
  },
  mounted() {
    this.GET_POSTS()
    this.GET_BURIAL()
    this.GET_SVGS()
    this.GET_VIDEOS()
    this.scrollMiddle()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_grid.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.main {
  background: $white;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0;
  grid-template-rows: repeat(10, 1fr);

  &__cluster {
    @include cluster-modifiers;
  }
}
</style>
