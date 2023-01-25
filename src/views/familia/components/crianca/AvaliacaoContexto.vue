<template>
  <div class="fluid">
    <h1 class="app-title">
      Avaliação contexto - {{ this.avaliacaoContexto.crianca.nome }}
    </h1>

    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <b>Informações da criança</b>
            <b-badge variant="mute" class="float-right small"
              >(*) Obrigatório</b-badge
            >
          </div>
          <table border="1">
            <thead>
              <tr>
                <td width="30%">Pergunta</td>
                <td width="3%">S</td>
                <td width="3%">P</td>
                <td width="3%">N</td>
                <td width="50%">Observação</td>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in avaliacaoContexto.listAvaliacaoContextoResposta"
                :key="item.id"
              >
                <td>
                  {{ item.avaliacaoContextoPergunta.descricao }}
                </td>
                <td>
                  <b-form-radio
                    v-model="item.resposta"
                    value="3"
                    :onchange="atualizarSomas()"
                  />
                </td>
                <td>
                  <b-form-radio
                    v-model="item.resposta"
                    value="2"
                    :disabled="habilitarRadio(item.avaliacaoContextoPergunta)"
                    :onchange="atualizarSomas()"
                  />
                </td>
                <td>
                  <b-form-radio
                    v-model="item.resposta"
                    value="1"
                    :onchange="atualizarSomas()"
                  />
                </td>
                <td>
                  <b-form-input id="nome" v-model="item.observacao" trim />
                </td>
              </tr>
            </tbody>
          </table>
          <b-form>
            Total Situação: {{ avaliacaoContexto.totalSituacao }}
            <br />
            Total Afirmação: {{ avaliacaoContexto.totalAfirmacao }}

            <br /><br />

            <b-button @click="salvarAvaliacao()" variant="primary" size="md"
              ><i class="far fa-save"></i> Salvar</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Api from "@/api/social";
import events from "@/util/events";

export default {
  name: "EditarCrianca",
  data() {
    return {
      valid: false,
      error: Object,
      avaliacaoContexto: { crianca: {} },
    };
  },
  computed: {
    crianca: {
      get() {
        return this.$store.getters.getCrianca;
      },
      set() {
        this.$store.commit("setCrianca", this.crianca);
      },
    },
    familia: {
      get() {
        return this.$store.getters.getFamilia;
      },
      set() {
        this.$store.commit("setFamilia", this.familia);
      },
    },
  },

  methods: {
    habilitarRadio(avaliacao) {
      if (avaliacao.tipoAvaliacao == "SITUACAO") {
        return true;
      }
      return false;
    },
    atualizarSomas() {
      console.log("Vamos atualiza!");
      var somaSituacao = 0;
      var somaAfirmacao = 0;
      this.avaliacaoContexto.listAvaliacaoContextoResposta.forEach(
        (element) => {
          if (element.avaliacaoContextoPergunta.tipoAvaliacao == "SITUACAO") {
            somaSituacao = parseInt(somaSituacao) + parseInt(element.resposta);
          } else {
            somaAfirmacao =
              parseInt(somaAfirmacao) + parseInt(element.resposta);
          }
        }
      );
      console.log("Situação " + somaSituacao);
      console.log("Avaliação " + somaAfirmacao);
      //  console.log(this.avaliacaoContexto)
      this.avaliacaoContexto.totalSituacao = somaSituacao;
      this.avaliacaoContexto.totalAfirmacao = somaAfirmacao;
    },

    salvarAvaliacao() {
      if (this.avaliacaoContexto.novo) {
        Api.salvarAvaliacao(this.avaliacaoContexto)
          .then((res) => {
            console.log("ok");
            this.$store.commit("setMessages", {
              message: "Sucesso ao salvar avaliação de contexo",
              variant: "success",
            });
          })
          .catch((err) => {
            this.avaliacaoContexto = {};
            this.$store.commit("setMessages", err.response.data);
          });
      } else {
        Api.atualizarAvaliacao(this.avaliacaoContexto)
          .then((res) => {
            console.log("ok");
            this.$store.commit("setMessages", {
              message: "Sucesso ao atualizar avaliação de contexto",
              variant: "success",
            });
          })
          .catch((err) => {
            this.avaliacaoContexto = {};
            this.$store.commit("setMessages", err.response.data);
          });
      }
    },

    buscarCrianca(idCrianca) {
      Api.getCrianca(idCrianca)
        .then((res) => {
          this.$store.commit("setCriancas", res.data.content);
        })
        .catch((err) => {
          this.$store.commit("setCrianca", []);
          this.$store.commit("setMessages", err.response.data);
        });
    },
    buscarAvaliacaoContexto(idCrianca) {
      Api.getAvaliacaoContextoPorCrianca(idCrianca)
        .then((res) => {
          this.avaliacaoContexto = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          this.avaliacaoContexto = {};
          this.$store.commit("setMessages", err.response.data);
        });
    },
    alterarCrianca() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          Api.alterarCrianca(this.crianca)
            .then(() => {
              events.$emit("CriancaAlterada", this.crianca);
              this.clear();
              this.$store.dispatch("novaCrianca");
              this.$store.commit("setMessages", {
                message: "Sucesso ao alterar série",
                variant: "success",
              });
            })
            .catch((err) => {
              this.$store.commit("setMessages", err.response.data);
            });
        }
      });
    },
    clear() {
      this.$validator.reset();
      this.$store.dispatch("novaCrianca");
      this.$store.dispatch("limparMensagens");
    },
  },

  created() {
    // this.buscarCrianca(this.$route.params.idCrianca)
    this.buscarAvaliacaoContexto(this.$route.params.idCrianca);
  },
};
</script>

<style></style>
