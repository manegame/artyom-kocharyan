<template>
  <div class="main dragscroll"
       ref='main'>
    <div class="scatter"
         :class='"scatter--zoom_" + zoom'
         ref='scatter'>
      <scatterCell v-for='(post, index) in main.posts'
                   :content='post'
                   :count='index + 1'
                   @scrollTo='scrollTo'/>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import scatterCell from '../components/scatter-cell'
import TWEEN from 'tween.js'

export default {
  name: 'ak-main',
  data() {
    return {
      zoom: 2,
      wW: window.innerWidth,
      wH: window.innerHeight,
      animatedTop: 0,
      animatedLeft: 0,
      scroll: {
        top: 0,
        left: 0
      }
    }
  },
  components: {
    scatterCell
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions([
      'GET_POSTS',
      'GET_BURIAL',
      'GET_VIDEOS'
    ]),
    scrollMiddle() {
      let newLeft = this.$refs.scatter.offsetWidth / 2 - this.wW / 2
      let newTop = this.$refs.scatter.offsetHeight / 2 - this.wH / 2
      this.$refs.main.scrollLeft = newLeft
      this.$refs.main.scrollTop = newTop
    },
    scrollTo(dimensions) {
      let newLeft = dimensions.x + (dimensions.w / 2) - (this.wW / 2)
      let newTop = dimensions.y + (dimensions.h / 2) - (this.wH / 2)
      this.scroll = {
        top: newTop,
        left: newLeft
      }
    },
    setWindow() {
      this.wW = window.innerWidth
      this.wH = window.innerHeight
    },
    updateScroll(event) {
      this.scroll.top = event.target.scrollTop
      this.scroll.left = event.target.scrollLeft
    },
    removeHash() {
      this.$router.push({
        name: 'main',
        hash: '',
        params: {slug: this.$route.params.slug}
      })
    }
  },
  watch: {
    scroll(newValue, oldValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          window.requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({
        tweenLeft: oldValue.left,
        tweenTop: oldValue.top
      })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({
          tweenLeft: newValue.left,
          tweenTop: newValue.top
        }, 500)
        .onUpdate(function () {
          vm.animatedLeft = this.tweenLeft.toFixed(0)
          vm.animatedTop = this.tweenTop.toFixed(0)
        })
        .start()

      animate()
    },
    animatedTop() {
      this.$refs.main.scrollTop = this.animatedTop
    },
    animatedLeft() {
      this.$refs.main.scrollLeft = this.animatedLeft
    }
  },
  mounted() {
    this.GET_POSTS()
    this.GET_BURIAL()
    this.GET_VIDEOS()
    this.scrollMiddle()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/helpers/_transitions.scss';
@import '../style/_variables.scss';

.main {
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  color: black;

  @include hide-scroll;
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
  $w: 80vw;
  $h: 100vh;
  $n-1: 1;
  $n-2: 1.8;
  $n-3: 3;

  color: black;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2vh 0;
  grid-template-rows: repeat(10, 1fr);

  &--zoom_1 {
    width: $n-1 * $w;
    height: $n-1 * $h;
  }

  &--zoom_2 {
    width: $n-2 * $w;
    height: $n-2 * $h;
  }

  &--zoom_3 {
    width: $n-3 * $w;
    height: $n-3 * $h;
  }
}
</style>
