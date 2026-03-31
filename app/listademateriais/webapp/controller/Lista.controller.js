sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/m/MessageToast'
], (Controller,MessageToast) => {
    "use strict";

    return Controller.extend("listademateriais.controller.Lista", {

        onInit: function () {       
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            this.oRouter
            .getTarget("TargetLista") // Sempre alterar o Target
            .attachDisplay(this.handleRouteMatched, this); 
        },

        handleRouteMatched: function () {
            this.createModel();  
            this.getTableCapacity();  
        },

        createModel: function () {
            this.getView().setModel(
                new sap.ui.model.json.JSONModel({
                    variavelInput: 123,
                    Lista: [
                        {
                            ID: 1,
                            name: "João"
                        },{
                            ID: 2,
                            name: "Maria"
                        }
                    ],
                    Lista2: []
                }),
                    "oModelLista"
                );

            this.oViewModel = this.getView().getModel("oModelLista");
        },  


        onPress: function (evt) {
      MessageToast.show(evt.getSource().getId() + " Pressed");
    },


        onDigitando: function (evt) {
            var teste;
    },


        getTableCapacity: async function () {

            let oData;
            let oModel = this.getOwnerComponent().getModel();
            let Service = "/Material"

            let oFilter = new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, 3);

            //V4 - Tipo 01
            let oListBinding = oModel.bindList(Service);
            oListBinding.filter([oFilter]);
            let aContexts = await oListBinding.requestContexts();

            if (aContexts.length > 0) {
                oData = aContexts[0].getObject();

                let payload = [
                    {
                        ID: oData.ID,
                        NumMat: oData.NumMat,
                        nome: oData.nome,
                        desc: oData.desc
                    }
                ]

                if(oData){
                    this.oViewModel.setProperty("/Lista2", payload);
                }
            } 

            //V4 - Tipo 02
            // var oContext = oModel.bindContext(`${Service}(ID=1)`);
            // await oContext.requestObject();

            // if (oContext.length > 0) {
            //     oData = oContext.getBoundContext().getObject();
            // }             

            // //V2    
            // let returnV2DataBank = await new Promise(function (resove, reject) {
            //     oModel.read(Service, {
            //         success: function (data) {
            //             resove(data);
            //         }.bind(this),
            //             error: function (oError) {
            //             reject(oError);
            //         }.bind(this),
            //     });
            // });
        },


    });
});