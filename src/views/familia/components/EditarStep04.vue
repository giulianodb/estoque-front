<template>
  <div>
    <h4>Programas sociais e socioeducativos</h4>

      <br>
      <br>
    <b-row >
      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-bpc"  v-model="familia.programas.bpc" > BPC </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-auxDoenca"  v-model="familia.programas.auxilioDoenca" > Auxílio doença </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-scfv2"  v-model="familia.programas.scfv" > SCFV </b-form-checkbox>
      </b-col>

            <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-bolsaFamilia"  v-model="familia.programas.bolsaFamilia" > Bolsa família </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-minhaCasaMinhaVida"  v-model="familia.programas.minhaCasaMinhaVida" > Minha casa minha vida</b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-tarifaSocial"  v-model="familia.programas.tarifaSocial" > Tarifa Social Copel/Sanepar</b-form-checkbox>
      </b-col>

            <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-urbs"  v-model="familia.programas.urbs" > URBS </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-adolescenteAprendiz"  v-model="familia.programas.adolescenteAprendiz" > Adolescente aprendiz </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-armazenFamilia"  v-model="familia.programas.armazemFamilia" > Armazém da família </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
        <b-form-group
          id="cras"
          label="CRAS Referenciado:"
          label-for="txt-cras"
        >
          <b-form-input id="txt-cras"  v-model="familia.programas.cras"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="3" lg="12">
        <b-form-group
          id="nis"
          label="NIS:"

          label-for="txt-nis"
        >
          <b-form-input id="txt-nis"  v-model="familia.programas.nis"></b-form-input>
        </b-form-group>
      </b-col>

            <b-col sm="12" lg="12">
        <b-form-group
          id="beneficio"
          label="Recebe algum benefício assistencial (gás,cesta básica,leite)? De quem? "

          label-for="txt-beneficio"
        >
          <b-form-input id="txt-beneficio"    v-model="familia.programas.beneficioAssistencial"></b-form-input>
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
