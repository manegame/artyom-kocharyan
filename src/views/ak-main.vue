<template>
  <div class="main">
    <div class="main__compilations">
      <compilation v-for='post in main.posts' :content='post'/>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import compilation from '../components/compilation'
import headBar from '../components/head-bar'

export default {
  name: 'ak-main',
  components: {
    compilation,
    headBar
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions(['GET_POSTS'])
  },
  mounted() {
    this.GET_POSTS()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.main {
  color: $black;
  clear: both;

  &__compilations {
    position: relative;
    width: 100vw;
    height: auto;
    background: $white;
    float: left;
    overflow-y: scroll;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: flex-end;

    @include hide-scroll;
  }

  &__headbar {
    height: 100vh;
    width: 50vh;
    text-align: right;
    float: left;
    background: -moz-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 40%);
    background: -webkit-linear-gradient(left, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 40%);
    background: linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(255, 255, 255, 0) 40%);
    filter: progid:dximagetransform.microsoft.gradient(startColorstr='#000000', endColorstr='#00ffffff', GradientType=0);
  }
}
</style>
