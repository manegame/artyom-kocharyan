<template>
  <div class="scatter__cell"
       :class='"scatter__cell--" + count'
       @click='scrollTo($event)'>
    <img class="scatter__cell__image"
         v-for='(image, index) in content.acf.images'
         v-if='image.image'
         :style='{
           top: positionImages("y") + "%",
           left: positionImages("x") + "%"
         }'
         :src='image.image.sizes["thumbnail"]'
         @click='openSlideshow(index)'/>
</div>
</template>

<script>
import slideshow from '../components/slideshow'

export default {
  name: 'scatter-cell',
  components: {
    slideshow
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
    }
  }
}
</script>

<style scoped lang='scss'>
.scatter__cell {
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  cursor: pointer;
  transition: background 0.3s ease-out;

  &__image {
    width: 10%;
    height: auto;
  }

  &:hover {
    background: rgba(255, 207, 225, 0.27);
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
    grid-row: 8 / 11;
  }

  &--9 {
    grid-column: 2 / 3;
    grid-row: 8 / 11;
  }

  &--10 {
    grid-column: 2 / 3;
    grid-row: 1 / 4;
  }

  &--11 {
    grid-column: 4 / 5;
    grid-row: 1 / 4;
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
