<template>
  <div>
    <h4>Motivo</h4>

      <br>
      <br>
    <b-row >
      <b-col sm="12" lg="12">
          <b-form-checkbox id="txt-scfv"  v-model="familia.motivo.scfv" > Vaga no SCFV </b-form-checkbox>
      </b-col>

      <b-col sm="12" lg="12">
          <b-form-checkbox id="txt-solic"  v-model="familia.motivo.solicitacaoDoacao" > Solicitação de doações </b-form-checkbox>
      </b-col>

      <b-col sm="12" lg="12">
          <b-form-checkbox id="txt-ori"  v-model="familia.motivo.orientacaoTec" > Orientação Técnica/Encaminhamento </b-form-checkbox>
      </b-col>
     
      <b-col sm="12" lg="12">
        <b-form-group
          id="input-group-1"
          label="Outros:"
          v-model="familia.motivo.outros"
          label-for="txt-outros"
        >
          <b-form-input id="txt-outros" ></b-form-input>
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
