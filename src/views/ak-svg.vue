<template>
  <div class="svg">
    <embed class="svg__embed"
           :class='{"svg__embed--show": show}'
           type="image/svg+xml"
           :src='svgImage'
           ref='embed'
           @load='initPanZoom'/>
    <div class="svg__loading"
       v-if='!show'>
    </div>
  </div>
</template>

<script>
// import annunciationHead from '../assets/svg/annunciation-head.svg'
import venus from '../assets/svg/venus-spiral.svg'
import svgPanZoom from 'svg-pan-zoom'

export default {
  name: 'svg',
  data() {
    return {
      show: false
    }
  },
  computed: {
    svgImage() {
      return venus
    }
  },
  methods: {
    initPanZoom() {
      this.show = true
      console.log('trying to initialize')
      svgPanZoom(this.$refs.embed, {
        zoomScaleSensitivity: 0.3,
        contain: true,
        maxZoom: 10000
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    window.stop()
    next()
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/helpers/_transitions.scss';
@import '../style/_variables.scss';

.svg {
  background: $white;

  &__embed {
    width: 100%;
    height: 100%;
    opacity: 0;

    &--show {
      opacity: 1;
    }
  }

  &__loading {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-left: -55px;
    margin-top: -55px;
    width: 110px;
    height: 110px;
    background-image: url('../../static/loading.png');
    background-size: contain;
    animation: spin 1.4s linear infinite;
    -webkit-animation: spin 1.4s linear infinite;
  }

  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
}
</style>
