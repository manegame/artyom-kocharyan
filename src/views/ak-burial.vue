<template>
  <div class='burial'>
    <!-- <img class='burial__core' :src='main.burial.channel.items[0].snippet.thumbnails.high.url' /> -->

    <div class="burial__first">
      <div class="burial__first__video"
           v-if='this.$route.params.video === "enter"'>
        <div class="youtube-embed">
          <iframe type='text/html'
                  :src='"https://www.youtube.com/embed/" + this.firstVideo.snippet.resourceId.videoId + "?" + this.options.first + ""'/>
        </div>
      </div>
      <div class="burial__first__video"
           v-else>
        <div class="youtube-embed">
          <iframe type='text/html'
                  :src='"https://www.youtube.com/embed/" + this.$route.params.video + "?" + this.options.first + ""'/>
        </div>
      </div>
    </div>

    <div class="burial__list dragscroll"
         ref='list'>
         <router-link tag='img'
                      class="burial__list__item"
                      v-for='video in videosExcept'
                      :to="{ name: 'burial', params: { video: video.snippet.resourceId.videoId } }"
                      ref='item'
                      :src='video.snippet.thumbnails.medium.url' />
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'burial',
  data() {
    return {
      options: {
        first: 'autoplay=1&modestbranding=1'
      }
    }
  },
  computed: {
    ...mapState(['main']),
    exception() {
      if (this.$route.params.video === 'enter') {
        if (this.been) return 'VVVuNG5CUXE3VUZkOHBWYldsOVJVenpBLnVzTzhJOFY0bFpF'
        else return 'VVVuNG5CUXE3VUZkOHBWYldsOVJVenpBLmppWFBfQ2JteEVJ'
      } else {
        return this.$route.params.video
      }
    },
    firstVideo() {
      return this.main.burial.videos.filter(vid => vid.id === this.exception)[0]
    },
    videosExcept() {
      return this.main.burial.videos.filter(vid => vid.id !== this.exception)
    }
  },
  methods: {
    scrollList() {
      this.$refs.list.scrollLeft += (window.innerWidth - this.$refs.item[0].offsetWidth)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/helpers/_embed.scss';
@import '../style/helpers/_reset.css';
@import '../style/helpers/_transitions.scss';
@import '../style/_variables.scss';

.burial {
  background: $black;
  color: $black;
  overflow-y: scroll;

  @include hide-scroll;

  &__first {
    margin: $top-bar-height / 2 auto 0;
    width: 100vw;
    background: $black;

    &__video {
      margin: 0 auto;
      width: 70%;
    }
  }

  &__list {
    width: 100vw;
    display: flex;
    overflow-x: scroll;

    @include hide-scroll;

    &__item {
      display: inline-block;
      margin: 10px;
    }
  }

  &__core {
    position: fixed;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
</style>
