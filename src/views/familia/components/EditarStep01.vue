<template>
  <div>
    <h4>Identificação do Responsável</h4>

    <b-row class="my-2">
      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-1"
          label="CPF:"
          v-model="familia.cpfResponsavel"
          label-for="txt-cpf"
          description="Informe seu nome completo"
        >
          <b-form-input id="txt-cpf" v-model="familia.cpfResponsavel" required placeholder="Digite o CPF"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="9">
        <b-form-group
          id="input-group-2"
          label="Nome:"
          v-model="familia.nomeResponsavel"
          label-for="txt-nome"
          description="Nome do responsável."
        >
          <b-form-input id="txt-nome" required v-model="familia.nomeResponsavel"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-3"
          label="Data Nascimento:"
          label-for="txt-nascimento"
          description="Data de nascimento"
        >
          <b-form-input id="txt-nascimento" type="date" required  v-model="familia.dataNascimento"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-4"
          label="Estado cívil:"
          v-model="familia.estadoCivil"
          label-for="txt-estadoCivil"
          description="Estado cívil"
        >
          <b-form-input id="txt-estadoCivil" v-model="familia.estadoCivil" ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="6">
        <b-form-group
          id="input-group-5"
          label="Nacionalidade:"
          v-model="familia.nacionalidade"
          label-for="txt-nacionalidade"
          description="Nacionalidade"
        >
          <b-form-input id="txt-nacionalidade"  v-model="familia.nacionalidade"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="6">
        <b-form-group
          id="input-group-6"
          label="Profissão:"
          v-model="familia.profissao"
          label-for="txt-profissao"
          description="Profissão"
        >
          <b-form-input id="txt-profissao" v-model="familia.profissao"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-7"
          label="RG:"
          v-model="familia.rgResponsavel"
          label-for="txt-rg"
          description="RG"
        >
          <b-form-input id="txt-rg"   v-model="familia.rgResponsavel"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="6">
        <b-form-group
          id="input-group-9"
          label="Endereço:"
          v-model="familia.rua"
          label-for="txt-rua"
          description="Rua"
        >
          <b-form-input id="txt-rua"   v-model="familia.rua"></b-form-input>
        </b-form-group>
      </b-col>

     <b-col sm="12" lg="6">
        <b-form-group
          id="input-group-9"
          label="Bairro:"
          v-model="familia.bairro"
          label-for="txt-bairro"
          description="Bairro"
        >
          <b-form-input id="txt-bairro"  v-model="familia.bairro"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-10"
          label="CEP:"
          v-model="familia.cep"
          label-for="txt-cep"
          description="CEP"
        >
          <b-form-input id="txt-cep"  v-model="familia.cep"></b-form-input>
        </b-form-group>
      </b-col>

       <b-col sm="12" lg="6">
        <b-form-group
          id="input-group-11"
          label="Cidade:"
          v-model="familia.cidade"
          label-for="txt-cidade"
          description="Cidade"
        >
          <b-form-input id="txt-cidade"  v-model="familia.cidade"></b-form-input>
        </b-form-group>
      </b-col>

     <b-col sm="12" lg="1">
        <b-form-group
          id="input-group-12"
          label="UF:"
          label-for="txt-uf"
          description="UF"
        >
          <b-form-input id="txt-uf"  v-model="familia.estado"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-13"
          label="Telefone:"
          v-model="familia.telefone"
          label-for="txt-telefone"
          description="Telefone"
        >
          <b-form-input id="txt-telefone" v-model="familia.telefone"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-14"
          label="Celular:"
          v-model="familia.celular"
          label-for="txt-celular"
          description="Celular"
        >
          <b-form-input id="txt-celular" v-model="familia.celular" ></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-15"
          label="Data cadastro:"
          v-model="familia.dataCadastro"
          label-for="txt-dataCadastro"
          description="Cada Cadastro"
        >
          <b-form-input type="date"  id="txt-cataCadastro" v-model="familia.dataCadastro" ></b-form-input>
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
