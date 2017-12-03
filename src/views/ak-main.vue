<template>
  <div class="main">
    <div class="main__compilation">
      <compilation/>
    </div>
    <div class="main__compilation">
      <compilation/>
    </div>
  </div>
</template>

<script>
import compilation from '../components/compilation'
export default {
  name: 'ak-main',
  components: {
    compilation
  }
}
</script>

<style scoped lang='scss'>
.main {
  color: red;

  &__compilation {
    position: relative;
    width: 100vmin;
    height: 100vmin;
    background: black;
  }
}
</style>
