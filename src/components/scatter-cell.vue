]<template>
  <div class="scatter__cell"
       :class='"scatter__cell--" + count'
       @click.self='scrollTo($event)'>
       <!-- Burial -->
       <template v-if='type === "burial"'>
         <piece v-for='(video, index) in main.burial_artyomovich.acf.burial_artyomovich'
                v-if='video.front'
                :video='video.video'
                :type='type'/>
       </template>
       <!-- svg -->
       <template v-if='type === "svg"'>
         <router-link :to='{ name: "svg", params: {component: "annunciationHead"}}'>
               <piece v-for='item in content'
                      :image='item.preview.sizes["artyom-small"]'
                      :type='type'/>
          </router-link>
       </template>
       <!-- Images -->
       <template v-if='type === "images"'>
         <router-link :to="{ name: 'single', params: { slug: content.slug } }">
           <piece v-for='(image, index) in content.acf.images'
                  v-if='image.image'
                  :image='image'
                  :type='type'/>
          </router-link>
        </template>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import piece from '../components/piece'

export default {
  name: 'scatter-cell',
  components: {
    piece
  },
  data() {
    return {
      target: {}
    }
  },
  props: {
    content: {
      type: [Object, Array],
      required: true
    },
    count: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['main'])
  },
  methods: {
    ...mapActions(['GET_BURIAL']),
    handleClick(index, event) {
      if (this.target === event.target) this.openSlideshow(index)
      else this.target = event.target
    },
    positionImages(direction) {
      let windowW = 100
      let windowH = 100
      let randX = Math.floor(Math.random() * windowW)
      let randY = Math.floor(Math.random() * windowH)
      if (direction === 'x') return randX
      if (direction === 'y') return randY
    },
    scrollTo(event) {
      this.$emit('scroll-to', {
        w: event.target.offsetWidth,
        h: event.target.offsetHeight,
        x: event.target.offsetLeft,
        y: event.target.offsetTop
      })
    },
    animate(event) {
      event.target.offsetTop += 100
      console.log(event.target.offsetTop)
    }
  }
}
</script>

<style scoped lang='scss'>
@import '../style/helpers/_mixins.scss';
@import '../style/helpers/_responsive.scss';
@import '../style/_variables.scss';

.scatter__cell {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;

  &--0 {
    grid-area: 1 / 1 / 9 / 9;
  }

  &--1 {
    grid-column: 3 / 4;
    grid-row: 5 / 7;
  }

  &--2 {
    grid-column: 3 / 4;
    grid-row: 7 / 9;
  }

  &--3 {
    grid-column: 2 / 3;
    grid-row: 6 / 8;
  }

  &--4 {
    grid-column: 2 / 3;
    grid-row: 4 / 6;
  }

  &--5 {
    grid-column: 3 / 4;
    grid-row: 3 / 5;
  }

  &--6 {
    grid-column: 4 / 5;
    grid-row: 4 / 6;
  }

  &--7 {
    grid-column: 4 / 5;
    grid-row: 6 / 8;
  }

  &--8 {
    grid-column: 4 / 5;
    grid-row: 8 / 10;
  }

  &--9 {
    grid-column: 2 / 3;
    grid-row: 8 / 10;
  }

  &--10 {
    grid-column: 2 / 3;
    grid-row: 2 / 4;
  }

  &--11 {
    grid-column: 4 / 5;
    grid-row: 2 / 4;
  }

  &--12 {
    grid-column: 5 / 6;
    grid-row: 5 / 7;
  }

  &--13 {
    grid-column: 3 / 4;
    grid-row: 9 / 11;
  }

  &--14 {
    grid-column: 1 / 2;
    grid-row: 5 / 7;
  }

  &--15 {
    grid-column: 3 / 4;
    grid-row: 1 / 3;
  }

  &--16 {
    grid-column: 5 / 6;
    grid-row: 1 / 3;
  }

  &--17 {
    grid-column: 5 / 6;
    grid-row: 9 / 11;
  }

  &--18 {
    grid-column: 1 / 2;
    grid-row: 9 / 11;
  }

  &--19 {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }

  &--20 {
    grid-column: 5 / 6;
    grid-row: 3 / 5;
  }

  &--21 {
    grid-column: 5 / 6;
    grid-row: 7 / 9;
  }

  &--22 {
    grid-column: 1 / 2;
    grid-row: 7 / 9;
  }

  &--23 {
    grid-column: 1 / 2;
    grid-row: 3 / 5;
  }
}
</style>
