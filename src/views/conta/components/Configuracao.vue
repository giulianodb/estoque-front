<template>
    <b-card header="Configuracao" class="text-left">
      
      <b-form-group
          id="periodog"
          label="Período:"
          label-for="periodo"
        >
                    <b-form-select
                    id="periodo"
                    :plain="true"
                    v-model="fluxoCaixaPesquisa.periodo"
                    data-vv-name="periodo"
                    data-vv-as="periodo"
                    :error-messages="errors.collect('periodo')"
                    :state="
                      errors.has('periodo') == false ? null : !errors.has('periodo')
                    "
                  >
                    <option value="30"> 30 dias  </option>
                    <option value="60"> 60 dias </option>
                    <option value="0"> Personalizado </option>
                  </b-form-select>

        </b-form-group>
      
      
      <div>
        <b-button v-b-modal.modal-prevent-closing>Open Modal</b-button>
        <b-modal
          id="modal-prevent-closing"
          ref="modal"
          title="Submit Your Name"
          @show="resetModal"
          @hidden="resetModal"
          @ok="handleOk"
        >
          <form ref="form" @submit.stop.prevent="handleSubmit">
            <b-form-group
              label="Name"
              label-for="name-input"
              invalid-feedback="Name is required"
              :state="nameState"
            >
              <b-form-input
                id="name-input"
                v-model="name"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </div>
    </b-card>
  
</template>

<script>
    
    
// import Lottie from 'vue-lottie'

export default {
  name: 'Transacao',
  data () {
    return {
      name: '',
        nameState: null,
        submittedNames: []
    }
  },
  computed: {
    fluxoCaixaPesquisa: {
      get () {
        return this.$store.getters.getFluxoCaixaPesquisa
      },
      set (f) {
        this.$store.commit('setFluxoCaixaPesquisa', f)
      }
    }
  },
  methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvent) {
        // Prevent modal from closing
        bvModalEvent.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.submittedNames.push(this.name)
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    },
    created(){
      this.fluxoCaixaPesquisa = {periodo:"30"}
      //this.$store.commit('setFluxoCaixaPesquisa',{periodo:"30"})
    }
}
</script>

<style>

</style>