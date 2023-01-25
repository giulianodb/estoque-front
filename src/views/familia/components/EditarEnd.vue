<template>
<div class="d-flex">
  <div>

    <div id="lottie" class="center-xy my-5">
      <lottie
        :options="defaultOptions"
        :height="75"
        :width="75"
        v-on:animCreated="handleAnimation"
      />
      <span class="concluido ml-4">Concluído!</span>
    </div>
  </div>

</div>
</template>

<script>
import Lottie from 'vue-lottie'
import animationData from '@/assets/lottiefiles/success.json'

export default {
  name: 'app',
  components: {
    Lottie
  },
  props: {
    index: Number
  },
  data () {
    return {
      defaultOptions: { animationData: animationData, loop: false },
      animationSpeed: 1
    }
  },
  methods: {
    handleAnimation: function (anim) {
      this.anim = anim
    },

    stop: function () {
      this.anim.stop()
    },

    play: function () {
      this.anim.play()
    },

    pause: function () {
      this.anim.pause()
    },

    onSpeedChange: function () {
      this.anim.setSpeed(this.animationSpeed)
    }
  }
}
</script>

<style scoped>
h4 {
  font-weight: bold;
}
.concluido{
  font-size: 2rem;
}
</style>
