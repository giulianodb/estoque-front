<template>
  <div>
    <h4>Visita domiciliar</h4>

      <br>
      <br>
    <b-row >

      <b-col sm="12" lg="12">
        <b-form-group
          id="input-group-1"
          label="Observações:"
          v-model="familia.visitaDomiciliar.observacoes"
          label-for="txt-obs"
        >
          <b-form-input id="txt-obs"    v-model="familia.visitaDomiciliar.observacoes" ></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>

    <br><br>
  </div>
</template>

<script>
export default {
  props: {
    index: Number
  },
  computed: {
    familia: {
      get () {
        return this.$store.getters.getFamilia
      },
      set () {
        this.$store.commit('setFamilia', this.Familia)
      }
    }
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      // Reset
      this.familia.cpf = ''
      this.familia.idade = 0
    }
  }
}
</script>

<style>
</style>
