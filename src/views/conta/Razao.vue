<template>
    <div>
        <b-button outline @click="gerarPdf()" size="md" variant="secondary">Gerar PDF</b-button>
        <b-button outline @click="gerarOutro()" size="md" variant="secondary">Gerar PDF - método 2</b-button>

        <div ref="outro" width="100%">
            <div class="header">
        <img src="logo.png" alt="Logo da Empresa" class="logo">
        <div class="company-info" style="text-align: right;">
            <p>Nome da EMPRES</p>
            <p>Email: empresa@example.com</p>
            <p>Endereço: Rua da Empresa, 123</p>
        </div>
    </div>

    <div class="report-section">
        <h2 class="section-title">Receitas</h2>
        <div class="category-group">
            <h3 class="category-title">Impostos</h3>
            <!-- Tabela de transações de Impostos -->
        </div>
        <div class="category-group">
            <h3 class="category-title">Despesas Funcionários</h3>
            <!-- Tabela de transações de Despesas Funcionários -->
        </div>
        <div class="category-group">
            <h3 class="category-title">Investimentos</h3>
            <!-- Tabela de transações de Investimentos -->
        </div>
        <div class="category-group">
            <h3 class="category-title">Doações</h3>
            <!-- Tabela de transações de Doações -->
        </div>
        <table class="transaction-table">
            <thead>
                <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Centro de Custo</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <!-- Transações de Receitas -->
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td colspan="3">Total Receitas:</td>
                    <td>R$ 1000,00</td>
                </tr>
            </tfoot>
        </table>
    </div>

    <div class="report-section">
        <h2 class="section-title">Despesas</h2>
        <!-- Mesma estrutura para categorias e transações de Despesas -->
    </div>

    <div class="report-section">
        <h2 class="section-title">Somatório Geral</h2>
        <!-- Mostrar somatório geral de Receitas e Despesas -->
    </div>
        </div>

    </div>
</template>
  
<script>

import Api from '@/api/social'
import events from '@/util/events'
import jsPDF from 'jspdf'
// import jsPDFInvoiceTemplate from "jspdf-invoice-template";
//import jsPDFInvoiceTemplate, { OutputType, jsPDF } from "jspdf-invoice-template";
import html2canvas from "html2canvas"

export default {
    name: 'Conta',
    methods: {
        gerarPdf() {
            this.gerarPdfMesmo();
        },

        gerarPdfMesmo() {
            // //or in browser
            // var pdfObject = jsPDFInvoiceTemplate.default(props); //returns number of pages created
            /*
            let dto = [{ nome: "nome", projeto: "projeto", periodo: "periodo" }, { nome: "nome", projeto: "projeto", periodo: "periodo" }, { nome: "nome", projeto: "projeto", periodo: "periodo" }]

            var teste = "15/03/2023"
            var props = {
                outputType: OutputType.Save,
                returnJsPDFDocObject: true,
                fileName: "Invoice 2021",
                orientationLandscape: false,
                compress: true,
                logo: {
                    src: "http://localhost:8081/logo.png",
                    type: 'PNG', //optional, when src= data:uri (nodejs case)
                    width: 25, //aspect ratio = width/height
                    height: 25,
                    margin: {
                        top: 0, //negative or positive num, from the current position
                        left: 0 //negative or positive num, from the current position
                    }
                },
                business: {
                    name: "De Mãos Unidas " + teste,
                    address: "Rua Raul Felix, 277",
                    phone: "(41) 3079-2034",
                    email: "contato@demaosunidas.org.br",
                    website: "https://demaosunidas.org.br",
                },
                contact: {
                    label: " ",
                    name: "Inscrições",
                    address: " "
                },
                invoice: {
                    label: "Invoice #: ",
                    headerBorder: false,
                    tableBodyBorder: false,
                    header: [
                        {
                            title: "#",
                            style: {
                                width: 10
                            }
                        },
                        {
                            title: "Criança",
                            style: {
                                width: 30
                            }
                        },
                        {
                            title: "Projeto",
                            style: {
                                width: 80
                            }
                        },
                        { title: "Turno" },
                    ],
                    table: Array.from(dto, (item, index) => ([
                        index + 1,
                        item.nome,
                        item.projeto,
                        item.periodo

                    ])),
                    additionalRows: [{
                        col1: 'Total:',
                        col2: "500",
                        style: {
                            fontSize: 14 //optional, default 12
                        }
                    },
                    {
                        col1: 'Manhã:',
                        col2: "500",
                        style: {
                            fontSize: 10 //optional, default 12
                        }
                    },
                    {
                        col1: 'Tarde:',
                        col2: "500",
                        style: {
                            fontSize: 10 //optional, default 12
                        }
                    },
                    {
                        col1: 'FOCAR:',
                        col2: "500",
                        style: {
                            fontSize: 10 //optional, default 12
                        }
                    },
                    {
                        col1: 'NFCS:',
                        col2: "500",
                        style: {
                            fontSize: 10 //optional, default 12
                        }
                    },

                    ],
                    invDescLabel: " ",
                    invDesc: " ",
                },
                footer: {
                    text: "DMU",
                },
                pageEnable: true,
                pageLabel: "Página ",
            };

            const pdfObject = jsPDFInvoiceTemplate(props); //returns number of pages created
                */
        },

        gerarOutro() {
            var doc = new jsPDF();
            const conteudo = this.$refs.outro.innerHTML;
            doc.html(conteudo, {
                callback: function (doc) {
                    doc.save();
                },
                x: 5,
                y: 5,
                windowWidth: 50,
                width: 10,
                html2canvas: {}
            });

         
        }
    }

}
</script>
  
<style>

body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            background-color: #f2f2f2;
        }
        .logo {
            max-width: 100px;
            height: auto;
        }
        .company-info {
            text-align: right;
        }
        .report-section {
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
        }
        .section-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }
        .category-group {
            margin: 10px 0;
        }
        .category-title {
            font-weight: bold;
        }
        .transaction-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }
        .transaction-table th,
        .transaction-table td {
            padding: 8px;
            border: 1px solid #ccc;
        }
        .total-row {
            font-weight: bold;
            background-color: #e0e0e0;
        }

</style>
  