<template>
     <b-card header="Créditos" class="mb-4">
        <ul>
          <li v-for="item in items" :key="item.name">
            <span class="text-bold">{{ item.name }}</span>: {{ item.description }}
            ( <a :href="item.href" target="_blank">{{ item.href }}</a> )
          </li>
        </ul>
    </b-card>
</template>

<script>

export default {
  props: {
    items: Array
  },
  methods: {
    getDebugObjName (arr, index) {
      console.log(Object.keys(arr) + ' --> ' + index)
    },
    getObjName (arr, index) {
      this.getDebugObjName(arr, index)
      return Object.keys(arr)
    }
  }
}
</script>

<style>

</style>
