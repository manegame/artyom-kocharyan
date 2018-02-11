<template>
  <div class='burial'>
    <img class='burial__core' :src='main.burial.channel.items[0].snippet.thumbnails.high.url' />

    <div>
      <img :src='firstVideo.snippet.thumbnails.maxres.url' />
      {{firstVideo.snippet.title}}
    </div>

    <div v-for='video in videosExcept'>
      <img :src='video.snippet.thumbnails.medium.url' />
      {{video.snippet.title}}
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'burial',
  data() {
    return {
      been: this.$cookie.get('been')
    }
  },
  computed: {
    ...mapState(['main']),
    exception() {
      if (this.been) return 'VVVuNG5CUXE3VUZkOHBWYldsOVJVenpBLnVzTzhJOFY0bFpF'
      else return 'VVVuNG5CUXE3VUZkOHBWYldsOVJVenpBLmppWFBfQ2JteEVJ'
    },
    firstVideo() {
      return this.main.burial.videos.filter(vid => vid.id === this.exception)[0]
    },
    videosExcept() {
      return this.main.burial.videos.filter(vid => vid.id !== this.exception)
    }
  },
  mounted() {
    if (!this.been) {
      console.log('never been here before')
      this.$cookie.set('been', true)
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

.burial {
  background: $white;
  color: $black;
  overflow-y: scroll;

  @include hide-scroll;

  &__core {
    position: fixed;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
