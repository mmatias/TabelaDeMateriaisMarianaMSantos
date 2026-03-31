const cds = require('@sap/cds');
 
module.exports = cds.service.impl(async function () {
 
    // Função de filtro
    this.on('filtroMateriais', async (req) => {

        const { Material } = this.entities;
        const { quantidade } = req.data;

        // Busca materiais do banco
        const materiais = await SELECT.from(Material);

        // Retorna somente a quantidade pedida
        return materiais.slice(0, quantidade);
    })
 
    // Action para adicionar material
    this.on('adicionarMaterial', async (req) => {
        const { NumMat, Nome, Descr } = req.data;

        // Verifica se o material já existe
        const existente = await SELECT.from(Material).where({ NumMat });
        if (existente.length > 0) {
            return `Erro: Material com NumMat ${NumMat} já cadastrado.`;
        }

        // Buscar último ID e gerar sequencial
        const ultimo = await SELECT.one.from(Material).orderBy('ID desc');
        const novoID = ultimo ? ultimo.ID + 1 : 1;

        // Inserir novo material
        await INSERT.into(Material).entries({
            ID: novoID,
            NumMat,
            Nome,
            Descr
        });

        return `Sucesso: Material ${Nome} adicionado com ID ${novoID}.`;
    });
    
})