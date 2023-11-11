<template>
  <div>
    <h4>Identificação do Responsável</h4>

    <b-row class="my-2">
      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-1"
          label="CPF:"
          v-mask="'###.###.###-##'"
          v-model="familia.cpfResponsavel"
          label-for="txt-cpf"
          description="Informe seu nome completo">
       
          <b-form-input @blur="pesquisarCpf()" id="txt-cpf" 
                v-validate="'required|min:3'" 
                v-model="familia.cpfResponsavel" 
                placeholder="Digite o CPF"
                :error-messages="errors.collect('cpfResponsavel')" 
                data-vv-name="cpfResponsavel"
                data-vv-as="CPF Responsável"
                :state="errors.has('cpfResponsavel')==false?null:!errors.has('cpfResponsavel')">
           </b-form-input>
           <span v-show="errors.has('cpfResponsavel')" class="help is-danger">{{ errors.first('cpfResponsavel') }}</span>
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
          <b-form-input 
            id="txt-nome" 
            v-model="familia.nomeResponsavel"
            v-validate="'required|min:3'" 
            placeholder="Nome do Responsável"
            :error-messages="errors.collect('nomeResponsavel')" 
            data-vv-name="nomeResponsavel"
            data-vv-as="Nome Responsável"
            :state="errors.has('nomeResponsavel')==false?null:!errors.has('nomeResponsavel')">
          </b-form-input>
          <span v-show="errors.has('nomeResponsavel')" class="help is-danger">{{ errors.first('nomeResponsavel') }}</span>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-3"
          label="Data Nascimento:"
          label-for="txt-nascimento"
          description="Data de nascimento"
        >
          <b-form-input 
            id="txt-nascimento" 
            type="date" 
            v-model="familia.dataNascimento"
            v-validate="'required|min:3'" 
            placeholder="Data nascimento do responsável"
            :error-messages="errors.collect('dataNascimento')" 
            data-vv-name="dataNascimento"
            data-vv-as="Data nascimento"
            :state="errors.has('dataNascimento')==false?null:!errors.has('dataNascimento')">
          </b-form-input>

          <span v-show="errors.has('dataNascimento')" class="help is-danger">{{ errors.first('dataNascimento') }}</span>
        </b-form-group>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-estadocivil"
          label="Estado cívil:"
          label-for="txt-estadoCivil"
          description="Estado cívil"
        >

          <b-form-select
                    id="estadoCivil"
                    :plain="true"
                    v-model="familia.estadoCivil"
                    v-validate="'required|excluded:-1'"
                    data-vv-name="estadoCivil"
                    data-vv-as="estadoCivil"
                    :error-messages="errors.collect('estadoCivil')"
                    :state="
                      errors.has('estadoCivil') == false ? null : !errors.has('estadoCivil')
                    "
                  >
                    <template slot="first">
                      <option value="-1">Selecione</option>
                    </template>
                    <option value="SOLTEIRA"> Solteira </option>
                    <option value="CASADA"> Casada </option>
                    <option value="DIVORCIADA"> Divorciada </option>
                    <option value="VIUVA"> Viúva </option>
                  </b-form-select>
                  <span v-show="errors.has('estadoCivil')" class="help is-danger">{{ errors.first('estadoCivil') }}</span>

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
          <b-form-input id="txt-rg" 
            v-model="familia.rgResponsavel"
            v-validate="'required|min:5'" 
            placeholder="RG do Responsável"
            :error-messages="errors.collect('rgResponsavel')" 
            data-vv-name="rgResponsavel"
            data-vv-as="RG Responsável"
            :state="errors.has('rgResponsavel')==false?null:!errors.has('rgResponsavel')">
          </b-form-input>
          <span v-show="errors.has('rgResponsavel')" class="help is-danger">{{ errors.first('rgResponsavel') }}</span>
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
          <b-form-input id="txt-rua" 
            v-model="familia.rua"
            v-validate="'required|min:3'" 
            placeholder="Rua"
            :error-messages="errors.collect('rua')" 
            data-vv-name="rua"
            data-vv-as="Rua"
            :state="errors.has('rua')==false?null:!errors.has('rua')">
          </b-form-input>
          <span v-show="errors.has('rua')" class="help is-danger">{{ errors.first('rua') }}</span>

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
          <b-form-input id="txt-bairro" 
            v-model="familia.bairro"
            v-validate="'required|min:3'" 
            placeholder="Bairro"
            :error-messages="errors.collect('bairro')" 
            data-vv-name="bairro"
            data-vv-as="Bairro"
            :state="errors.has('bairro')==false?null:!errors.has('bairro')">
          </b-form-input>
        </b-form-group>
        <span v-show="errors.has('bairro')" class="help is-danger">{{ errors.first('bairro') }}</span>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-10"
          label="CEP:"
          v-model="familia.cep"
          label-for="txt-cep"
          description="CEP"
        >
          <b-form-input id="txt-cep" 
            v-model="familia.cep"
            v-validate="'required|min:3'" 
            placeholder="CEP"
            :error-messages="errors.collect('cep')" 
            data-vv-name="cep"
            data-vv-as="CEP"
            :state="errors.has('cep')==false?null:!errors.has('cep')">
          </b-form-input>
        </b-form-group>
        <span v-show="errors.has('cep')" class="help is-danger">{{ errors.first('cep') }}</span>
      </b-col>

       <b-col sm="12" lg="6">
        <b-form-group
          id="input-group-11"
          label="Cidade:"
          v-model="familia.cidade"
          label-for="txt-cidade"
          description="Cidade"
        >
          <b-form-input id="txt-cidade" 
            v-model="familia.cidade"
            v-validate="'required|min:3'" 
            placeholder="Cidade"
            :error-messages="errors.collect('cidade')" 
            data-vv-name="cidade"
            data-vv-as="Cidade"
            :state="errors.has('nomeRespocidadensavel')==false?null:!errors.has('cidade')">
          </b-form-input>
        </b-form-group>
        <span v-show="errors.has('cidade')" class="help is-danger">{{ errors.first('cidade') }}</span>
      </b-col>

     <b-col sm="12" lg="1">
        <b-form-group
          id="input-group-12"
          label="UF:"
          label-for="txt-uf"
          description="UF"
        >
          <b-form-input id="txt-uf" 
            v-model="familia.estado"
            v-validate="'required|min:2'" 
            placeholder="Estado residência"
            :error-messages="errors.collect('estado')" 
            data-vv-name="estado"
            data-vv-as="Estadp"
            :state="errors.has('estado')==false?null:!errors.has('estado')">
          </b-form-input>
        </b-form-group>
        <span v-show="errors.has('estado')" class="help is-danger">{{ errors.first('estado') }}</span>
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
          label-for="txt-celular"
          description="Celular">
          <b-form-input id="txt-celular" 
            v-model="familia.celular" 
            v-validate="'required|min:8'" 
            placeholder="Celular"
            :error-messages="errors.collect('celular')" 
            data-vv-name="celular"
            data-vv-as="Celular"
            :state="errors.has('celular')==false?null:!errors.has('celular')">
          </b-form-input>
        </b-form-group>
        <span v-show="errors.has('celular')" class="help is-danger">{{ errors.first('celular') }}</span>
      </b-col>

      <b-col sm="12" lg="3">
        <b-form-group
          id="input-group-15"
          label="Data cadastro:"
          v-model="familia.dataCadastro"
          label-for="txt-dataCadastro"
          description="Cada Cadastro"
        >
          <b-form-input type="date" id="txt-cataCadastro" 
            v-model="familia.dataCadastro"
            v-validate="'required|min:3'" 
            placeholder="Data do cadastro"
            :error-messages="errors.collect('dataCadastro')" 
            data-vv-name="dataCadastro"
            data-vv-as="Data Cadastro"
            :state="errors.has('dataCadastro')==false?null:!errors.has('dataCadastro')">
          </b-form-input>
        </b-form-group>
        <span v-show="errors.has('dataCadastro')" class="help is-danger">{{ errors.first('dataCadastro') }}</span>
      </b-col>

    </b-row>
  </div>
</template>

<script>

import Api from '@/api/social'
import events from '@/util/events'
import {mask} from 'vue-the-mask'

export default {
  directives: {mask},
  props: {
    index: Number
  },
  data () {
    return {
      valid: false,
      error: Object
    }
  },
  computed: {
    familia: {
      get () {
        return this.$store.getters.getFamilia
      },
      set (fam) {
        this.$store.commit('setFamilia', fam)
      }
    }
  },
  methods: {
    onReset (evt) {
      evt.preventDefault()
      // Reset
      this.familia.cpf = ''
      this.familia.idade = 0
    },
    pesquisarCpf(){
          console.log("VAmos pesauisar esse cpf mandrake")
         Api.getFamiliaPorCpf(this.familia.cpfResponsavel).then((res) => {
              console.log(res)
              let f = res.data
              f.status= "ATIVO"
              this. inserirObjetosFamilia(f)
              this.$store.commit('setFamilia', f)
              if (f.id) {
                events.$emit('familiaEncontrada')
              }
            })
            .catch((err) => {
              console.log(err)
              this.$store.commit('setMessages', err.response.data)
            })
    },
    inserirObjetosFamilia(familia){
      familia.status = "ATIVO"
      if (familia.motivo == null) {
        familia.motivo = {}
      }
      if (familia.moradia == null) {
        familia.moradia = {tipoMoradia: "-1",materialMoradia: "-1", propriedadeMoradia: "-1",situacaoMoradia:"-1" }
      }
      if (familia.programas == null) {
        familia.programas = {}
      }

      if (familia.visitaDomiciliar == null) {
        familia.visitaDomiciliar = {}
      }
    }
  }
  
}
</script>

<style>
</style>
