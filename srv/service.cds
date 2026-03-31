using prova from '../db/schema';

service ProvaCAP {

    entity Material as projection on prova.Material;

    function filtroMateriais(quantidade: Integer) returns array of Material;

    action adicionarMaterial(
            NumMat: Integer,
            Nome: String,
            Descr: String
        ) returns String;
}
