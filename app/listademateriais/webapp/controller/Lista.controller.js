sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
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
                { ID: 5, name: "Grampeador", desc: "Preto" }
                { ID: 6, name: "Lapiseira", desc: "Com grafite 0.9" }
                { ID: 7, name: "Estojo", desc: "Rosa" }
                { ID: 8, name: "Fita adesiva", desc: "Larga" }
                { ID: 9, name: "Caderno", desc: "Preto" }
                { ID: 10, name: "Caderno", desc: "Marrom" }
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
        }

    });
});