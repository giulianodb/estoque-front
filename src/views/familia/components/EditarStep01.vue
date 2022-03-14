<template>
  <div>
    <h4>Identificação do Responsável</h4>

    <b-row class="my-2">
      <b-col sm="12" lg="6">
        <b-form-group
          id="input-group-1"
          label="CPF:"
          v-model="form.cpf"
          label-for="txt-cpf"
          description="Informe seu nome completo"
        >
          <b-form-input id="txt-cpf" v-model="form.cpf" required placeholder="Digite o CPF"></b-form-input>
        </b-form-group>
      </b-col>
      <b-col sm="12" lg="4">
        <b-form-group
          id="input-group-2"
          label="Idade:"
          v-model="form.idade"
          label-for="txt-idade"
          description="É preciso ser maior de 13 anos para se cadastrar."
        >
          <b-form-input id="txt-idade" type="number" required></b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    index: Number
  },

  data () {
    return {
      form: {
        nome: '',
        cpf: '',
        idade: 0
      }
    }
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      // Reset
      this.form.nome = ''
      this.form.idade = 0
    }
  }
}
</script>

<style>
</style>
