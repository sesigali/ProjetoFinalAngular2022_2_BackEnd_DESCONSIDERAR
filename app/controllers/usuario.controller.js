const db = require("../models");
const Usuario = db.usuario;

// Adicionar um novo usuário
exports.criar = (req, res) => {
    // Verifica se existem as informações necessárias para adicionar um usuário
    if (!req.body.cpf || !req.body.nome || !req.body.email || !req.body.telefone || !req.body.qtdLivrosEmprestados) {
        // Se não existir, retorna uma mensagem de erro.
        res.status(400).send({ msg: "Requisição incompleta: dados ausentes", dadosReq:req });
        // Encerra a função.
        return;
    }

    // Caso a requisição possua todos as informações necessárias, é hora de criar o objeto...
    const usuario = new Usuario({
        cpf: req.body.cpf,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        qtdLivrosEmprestados:req.body.qtdLivrosEmprestados,
    });
    // Depois de criado o objeto, vamos salvá-lo no banco de dados.
    usuario.save(usuario).then(data => {
        // Caso o dado seja armazenado com sucesso, retorna o registro do MongoDB (o usuário recém cadastrado).
        res.send(data)
    }).catch(err => {
        // Caso haja algum problema, identifica um erro 500 e uma mensagem de erro qualquer
        res.status(500).send({
            msg: err.message
        });
    });
};

// Retornar a lista de usuários
exports.obterTodos = (req, res) => {
    /* 
    Queremos retornar todos os elementos que atendem a determinada condição. 
    Caso a condição esteja vazia (como é o caso aqui), então todos os usuários atendem à condição 
    (retornando a lista de usuários completa).
    */
    var condition = {};

    Usuario.find(condition).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao obter lista de usuarios"})
    });
};


// Atualizar um usuário
exports.atualizar = (req, res) => {
    if (!req.body) {
        res.status(400).send({ msg: "Dados inválidos" });
        return;
    }

    const _id = req.params._id;

    Usuario.findByIdAndUpdate(_id, req.body).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível atualizar o usuário" })
        } else {
            res.send({ msg: "usuário atualizado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao atualizar o usuário" });
    });

};

//remover um usuário
exports.excluir = (req, res) => {
    const _id = req.params._id;
    Usuario.findByIdAndRemove(_id).then(data => {
        if (!data) {
            res.status(400).send({ msg: "Não foi possível remover o usuário" })
        } else {
            res.send({ msg: "usuário deletado com sucesso" });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Erro ao deletar o usuário" });
    });
};

