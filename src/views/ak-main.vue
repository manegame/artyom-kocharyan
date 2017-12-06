<template>
  <div class="main">
    <div class="main__compilation">
      <compilation/>
    </div>
    <!-- <div class="main__headbar">
      <headBar/>
    </div> -->
    <slideShow v-if='$route.hash.substring(1, 7) === "images"' @close='removeHash' :images='imageArray' :count='$route.params.count'/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import compilation from '../components/compilation'
import headBar from '../components/head-bar'
import slideShow from '../components/slide-show'

export default {
  name: 'ak-main',
  components: {
    compilation,
    headBar,
    slideShow
  },
  computed: {
    ...mapState(['main']),
    imageArray() {
      console.log('populating array')
      let result = []
      this.main.posts.map(post => {
        result.push({
          type: 'image',
          url: post.acf.image.sizes['pwr-large']
        })
      })
      return result
    }
  },
  methods: {
    removeHash() {
      this.$router.push({name: 'main', hash: '', params: {slug: this.$route.params.slug}})
    }
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

  &__compilation {
    position: relative;
    width: 100vmin;
    height: 100vmin;
    background: $white;
    float: left;
    overflow-y: scroll;

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
