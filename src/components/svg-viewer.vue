<template>
  <div class="svg-viewer">
    <embed class="svg-viewer__embed"
           :class='{"svg-viewer__embed--show": show}'
           type="image/svg+xml"
           :src='svgImage'
           ref='embed'
           @load='initPanZoom'/>
    <div class="svg-viewer__loading"
       v-if='!show'>
    </div>
  </div>
</template>

<script>
import venus from '../assets/svg/venus-spiral.svg'
import svgPanZoom from 'svg-pan-zoom'

export default {
  name: 'svg-viewer',
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
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_reset.css';
@import '../style/helpers/_transitions.scss';
@import '../style/_variables.scss';

.svg-viewer {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  @include hide-scroll;

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
    margin-left: -40px;
    margin-top: -40px;
    width: 80px;
    height: 80px;
    border: 3px solid rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
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
