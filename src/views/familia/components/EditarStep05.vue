<template>
  <div>
    <h4>Moradia</h4>

      <br>
      <br>
    <b-row >

 <b-col sm="3" lg="3">
        <b-form-group
          id="tipo"
          label="Tipo:"
          label-for="txt-tipo"
        >

                    <b-form-select
                    id="tipo"
                    :plain="true"
                    v-model="familia.moradia.tipoMoradia"
                    v-validate="'required|excluded:0'"
                    data-vv-name="tipo"
                    data-vv-as="tipo"
                    :error-messages="errors.collect('tipo')"
                    :state="
                      errors.has('tipo') == false ? null : !errors.has('tipo')
                    "
                  >
                    <template slot="first">
                      <option value="0">Tipo</option>
                    </template>
                    <option value="APARTAMENTO"> Apartamento </option>
                    <option value="CASA"> Casa </option>
                    <option value="SOBRADO"> Sobrado </option>
                  </b-form-select>

        </b-form-group>
</b-col>

             <b-col sm="3" lg="3">
        <b-form-group
          id="pecas"
          label="Quantidade de peças:"
          label-for="txt-pecass"
        >
          <b-form-input id="txt-pecas"  v-model="familia.moradia.quantidadePecas" ></b-form-input>
        </b-form-group>
      </b-col>

<b-col sm="3" lg="3">
        <b-form-group
          id="material"
          label="Material:"
          label-for="txt-material"
        >

                    <b-form-select
                    id="material"
                    :plain="true"
                    v-model="familia.moradia.materialMoradia"
                    v-validate="'required|excluded:0'"
                    data-vv-name="material"
                    data-vv-as="material"
                    :error-messages="errors.collect('material')"
                    :state="
                      errors.has('material') == false ? null : !errors.has('material')
                    "
                  >
                    <template slot="first">
                      <option value="0">Material</option>
                    </template>
                    <option value="MADEIRA"> Madeira </option>
                    <option value="ALVENARIA"> Alvenaria </option>
                    <option value="MISTA"> Mista </option>
                  </b-form-select>

        </b-form-group>
</b-col>

<b-col sm="3" lg="3">
        <b-form-group
          id="propriedade"
          label="Propriedade:"
          label-for="txt-propriedade"
        >

                    <b-form-select
                    id="propriedade"
                    :plain="true"
                    v-model="familia.moradia.propriedadeMoradia"
                    v-validate="'required|excluded:0'"
                    data-vv-name="propriedade"
                    data-vv-as="propriedade"
                    :error-messages="errors.collect('propriedade')"
                    :state="
                      errors.has('propriedade') == false ? null : !errors.has('propriedade')
                    "
                  >
                    <template slot="first">
                      <option value="0">Propriedade</option>
                    </template>
                    <option value="PROPRIA"> Próprio </option>
                    <option value="ALUGADA"> Alugado </option>
                    <option value="CEDIDA"> Cedido </option>
                  </b-form-select>

        </b-form-group>
</b-col>

<b-col sm="3" lg="3">
        <b-form-group
          id="situacao"
          label="Situação:"
          v-model="familia.moradia.situacaoMoradia"
          label-for="situacao"
        >
                    <b-form-select
                    id="situacao"
                    :plain="true"
                    v-model="familia.moradia.situacaoMoradia"
                    v-validate="'required|excluded:0'"
                    data-vv-name="situacao"
                    data-vv-as="situacao"
                    :error-messages="errors.collect('situacao')"
                    :state="
                      errors.has('situacao') == false ? null : !errors.has('situacao')
                    "
                  >
                    <template slot="first">
                      <option value="0">Situação</option>
                    </template>
                    <option value="INSALUBRE"> Insalubre </option>
                    <option value="IRREGULAR"> Irregular </option>
                    <option value="LEGALIZADA"> Legalizado </option>
                  </b-form-select>

        </b-form-group>
</b-col>

   <b-col sm="3" lg="3">
        <b-form-group
          id="tempo"
          label="Tempo de residência (anos):"
         
          label-for="txt-tempo"
        >
          <b-form-input id="txt-tempo"  v-model="familia.moradia.tempoResidencia"></b-form-input>
        </b-form-group>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-agua"  v-model="familia.moradia.aguaEncanada" > Água encanada </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-esgoto"  v-model="familia.moradia.redeEsgoto" > Rede de esgoto </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-fossa"  v-model="familia.moradia.fossa" > Fossa </b-form-checkbox>
      </b-col>

     <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-luz"  v-model="familia.moradia.luz" > Luz </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-internet"  v-model="familia.moradia.internet" > Internet</b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-coletaLixo"  v-model="familia.moradia.coletaLixo" > Coleta de Lixo </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-lazer"  v-model="familia.moradia.areasLazer" > Acesso à áreas de lazer </b-form-checkbox>
      </b-col>

      <b-col sm="3" lg="12">
          <b-form-checkbox id="txt-veiculo"  v-model="familia.moradia.veiculoProprio" > Veículo próprio </b-form-checkbox>
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
