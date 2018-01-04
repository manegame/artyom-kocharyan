<template>
  <div class="youtube">
    <youtube :video-id='id' @ready="ready"></youtube>
  </div>
</template>

<script>
import { getIdFromURL } from 'vue-youtube-embed'

export default {
  name: 'ak-youtube-embed',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  computed: {
    id() {
      return getIdFromURL(this.url)
    }
  },
  methods: {
    ready (player) {
      console.log('ready')
    }
  }
}
</script>

<style scoped lang='scss'>
.youtube {
  width: 100%;
  height: 100%;
  text-align: center;
}
</style>
