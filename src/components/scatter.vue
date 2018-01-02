<template>
  <div class="scatter">
    <img class="scatter__image"
         v-for='image in content.acf.images'
         :style='{top: positionImages("y") + "%", left: positionImages("x") + "%"}'
         :src='image.image.sizes["pwr-medium"]'
         @click='openSlideshow(0)'
    />
    <!-- <compilation :content='content'/> -->
    <slideShow v-if='$route.hash.substring(1) === "images" && $route.params.id === content.title.rendered'
               :images='slideshowImages()'
               :count='0'
               :slideshow='content.acf.slideshow'
               @open='openSlideshow'
               @close='removeHash'/>
  </div>
</template>

<script>
import compilation from '../components/compilation'
import slideShow from '../components/slide-show'

export default {
  name: 'scatter',
  components: {
    compilation,
    slideShow
  },
  props: {
    content: {
      type: Object,
      required: true
    }
  },
  methods: {
    positionImages(direction) {
      let windowW = 100
      let windowH = 100
      let randX = Math.floor(Math.random() * windowW)
      let randY = Math.floor(Math.random() * windowH)
      if (direction === 'x') return randX
      if (direction === 'y') return randY
    },
    openSlideshow(index) {
      console.log('called open slideshow')
      this.slideshowActive = true
      this.$router.push({name: this.$route.name, hash: '#images', params: {id: this.content.title.rendered}})
    },
    removeHash() {
      this.$router.push({name: 'main', hash: '', params: {slug: this.$route.params.slug}})
      this.slideshowActive = false
    },
    slideshowImages() {
      console.log('preparing array')
      let result = []
      this.content.acf.images.map(img => {
        result.push({
          url: img.image.sizes['pwr-large']
        })
      })
      return result
    }
  }
}
</script>

<style scoped lang='scss'>
.scatter {
  position: absolute;
  top: -30px;
  left: -30px;
  width: 100%;
  height: 100%;

  &__image {
    position: absolute;
    width: 60px;
    height: auto;
  }
}
</style>
