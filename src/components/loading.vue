<template>
  <div class='loading main__cluster main__cluster--1'>
    Loading
  </div>
</template>

<script>
export default {
  name: 'loading'
}
</script>

<style lang='scss'>

.loading {
  &::after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    -webkit-animation: ellipsis steps(4, end) 900ms infinite;
    animation: ellipsis steps(4, end) 900ms infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
    width: 0;
  }
}

@keyframes ellipsis {
  to {
    width: 1.25em;
  }
}

@-webkit-keyframes ellipsis {
  to {
    width: 1.25em;
  }
}
</style>