<template>
  <div class="scatter__cell"
       :class='"scatter__cell--" + count'>
       <router-link :to="{ name: 'single', params: { slug: content.slug } }">
         <piece v-for='(image, index) in content.acf.images'
                v-if='image.image'
                :image='image'/>
        </router-link>
  </div>
</template>

<script>
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
      type: Object,
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  },
  methods: {
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
      this.$emit('scrollTo', {
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

/* ANIMATIONS */

@keyframes float {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }

  100% {
    transform: translateY(0);
  }
}

.scatter__cell {
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  border-radius: 50%;

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
