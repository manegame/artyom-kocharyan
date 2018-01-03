<template>
  <div class="main"
       ref='main'>
    <headbar/>
    <div class="scatter"
         :class='"scatter--zoom_" + zoom'
         ref='scatter'>
      <scatterCell v-for='(post, index) in main.posts'
                   :content='post'
                   :references='this.$refs'
                   :count='index + 1'
                   @scrollTo='scrollTo'/>
    </div>
    <p class="overlay"
       v-html='"."'
       @click='zoom++'/>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import headbar from '../components/headbar'
import scatterCell from '../components/scatter-cell'

export default {
  name: 'ak-main',
  data() {
    return {
      zoom: 1,
      wW: window.innerWidth,
      wH: window.innerHeight
    }
  },
  components: {
    headbar,
    scatterCell
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions(['GET_POSTS']),
    scrollMiddle() {
      let newLeft = this.$refs.scatter.offsetWidth / 2 - this.wW / 2
      let newTop = this.$refs.scatter.offsetHeight / 2 - this.wH / 2
      this.$refs.main.scrollLeft = newLeft
      this.$refs.main.scrollTop = newTop
    },
    scrollTo(dimensions) {
      let newLeft = dimensions.x + (dimensions.w / 2) - (this.wW / 2)
      let newTop = dimensions.y + (dimensions.h / 2) - (this.wH / 2)
      this.$refs.main.scrollLeft = newLeft
      this.$refs.main.scrollTop = newTop
    }
  },
  watch: {
    zoom() {
      this.scrollMiddle()
    }
  },
  mounted() {
    this.GET_POSTS()
    this.scrollMiddle()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/_variables.scss';

.main {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
}

.overlay {
  color: red;
  position: fixed;
  width: 100vw;
  height: 100vh;
  line-height: 100vh;
  top: 0;
  left: 0;
  text-align: center;
  z-index: 99999;
  pointer-events: none;
}

.scatter {
  $n-1: 1;
  $n-2: 2;
  $n-3: 3;

  color: black;
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(10, 10%);

  &--zoom_1 {
    width: $n-1 * 100vw;
    height: $n-1 * 100vh;
  }

  &--zoom_2 {
    width: $n-2 * 100vw;
    height: $n-2 * 100vh;
  }

  &--zoom_3 {
    width: $n-3 * 100vw;
    height: $n-3 * 100vh;
  }
}
</style>
