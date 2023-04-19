<template>
  <div>
  <div v-if="messages">
        <Messages />
      </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Messages from '@/views/shared/components/Messages'
export default {
  name: 'Blank',
   components: { Messages },
     computed: {
    messages: {
      get () {
        return this.$store.getters.getMessages
      }
    }
  },
  created () {
    this.$store.commit('setLayout', 'blank')
  }
}
</script>


<style>
</style>
