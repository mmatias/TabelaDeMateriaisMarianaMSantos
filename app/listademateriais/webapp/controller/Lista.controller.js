sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], (Controller, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("listademateriais.controller.Lista", {

        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter.getTarget("TargetLista").attachDisplay(this.handleRouteMatched, this);
        },

        handleRouteMatched: function () {
            this.createModel();
            this.loadInitialData();
        },

        createModel: function () {
            const oModel = new sap.ui.model.json.JSONModel({
                variavelInput: 3, // valor inicial do input
                tableMaterial: []  // dados da tabela
            });
            this.getView().setModel(oModel, "oModelLista");
            this.oViewModel = oModel;
        },

        loadInitialData: function () {
            // Dados predefinidos
            const aDados = [
                { ID: 1, name: "Caneta", desc: "Azul" },
                { ID: 2, name: "Caneta", desc: "Vermelha" },
                { ID: 3, name: "Boracha", desc: "Preta" },
                { ID: 4, name: "Boracha", desc: "Branca" },
                { ID: 5, name: "Grampeador", desc: "Preto" },
                { ID: 6, name: "Lapiseira", desc: "Com grafite 0.9" },
                { ID: 7, name: "Estojo", desc: "Rosa" },
                { ID: 8, name: "Fita adesiva", desc: "Larga" },
                { ID: 9, name: "Caderno", desc: "Preto" },
                { ID: 10, name: "Caderno", desc: "Marrom" },
            ];
            this.oViewModel.setProperty("/tableMaterial", aDados);
        },

        // Função de filtro
        onFiltrar: function () {
            const quantidade = parseInt(this.oViewModel.getProperty("/variavelInput"));
            const aTodos = this.oViewModel.getProperty("/tableMaterial");

            if (!quantidade || quantidade <= 0) {
                MessageToast.show("Digite um número válido");
                return;
            }

            // Seleciona os primeiros N registros (sequencial)
            const aFiltrados = aTodos.slice(0, quantidade);
            this.oViewModel.setProperty("/tableMaterial", aFiltrados);
        },

        //Criar o material
        onCriarMaterial: function () {
            if (!this._oDialog) {
                this._oDialog = new sap.m.Dialog({
                    title: "Criar Material",
                    type: "Message",
                    content: [
                        new sap.m.Label({ text: "ID" }),
                        new sap.m.Input("inputID", { type: "Number" }),
                        new sap.m.Label({ text: "Nome" }),
                        new sap.m.Input("inputName"),
                        new sap.m.Label({ text: "Descrição" }),
                        new sap.m.Input("inputDesc")
                    ],
                    beginButton: new sap.m.Button({
                        text: "Salvar",
                        press: () => {
                            this._salvarMaterial();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancelar",
                        press: () => {
                            this._oDialog.close();
                        }
                    })
                });
                this.getView().addDependent(this._oDialog);
            }
            this._oDialog.open();
        },

        _salvarMaterial: function () {
            const oID = sap.ui.getCore().byId("inputID").getValue();
            const oName = sap.ui.getCore().byId("inputName").getValue();
            const oDesc = sap.ui.getCore().byId("inputDesc").getValue();

            // Validação básica
            if (!oID || !oName || !oDesc) {
                sap.m.MessageBox.error("Todos os campos devem ser preenchidos!");
                return;
            }

            // Objeto do novo material
            const oNovoMaterial = {
                ID: parseInt(oID),
                name: oName,
                desc: oDesc
            };

            // Pega os dados atuais da tabela
            const aMateriais = this.oViewModel.getProperty("/tableMaterial") || [];

            // Adiciona novo registro
            aMateriais.push(oNovoMaterial);

            // Atualiza a model
            this.oViewModel.setProperty("/tableMaterial", aMateriais);

            // Fecha o dialog e exibe mensagem de sucesso
            this._oDialog.close();
            sap.m.MessageBox.success("Material criado com sucesso!");
        }
    });
});