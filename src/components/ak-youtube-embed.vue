<template>
  <div class="youtube-embed">
    <iframe :src='url + "&rel=0"'  frameborder="0" gesture="media" allow="encrypted-media" webkitallowfullscreen mozallowfullscreen allowfullscreen/>
  </div>
</template>

<script>
export default {
  name: 'ak-youtube-embed',
  props: {
    video: {
      type: String,
      required: true
    }
  },
  methods: {
    findUrl(video) {
      let test = /https:\/\/.+?(?=")/ // match starts with https, takes everything up until first " char
      return this.video.match(test)
    }
  },
  computed: {
    url() {
      let vimeo = /vimeo/
      let youtube = /youtube/
      if (vimeo.test(this.video) || youtube.test(this.video)) {
        return this.findUrl(this.video)
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_embed.scss';

.youtube-embed {
  color: black;
}
</style>
