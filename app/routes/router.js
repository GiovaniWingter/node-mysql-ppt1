var express = require("express");
var router = express.Router();

var fabricaDeConexao = require("../../config/connection-factory");
var conexao = fabricaDeConexao();

router.get("/", function (req, res) {
  res.render("pages/index")
});

router.get("/select", function (req, res) {
  conexao.query("select * from tarefas where status_tarefa = 1", function (error, results) {
    console.log(results);
    console.log(error);
    if (error) {
      return res.json({ erro: error });
    }
    res.json({ tarefas: results });
  });
});

router.get("/insert", function (req, res) {
  dadosParaIserir = {
    "nome_tarefa": "Formatar PC do Cliente 3",
    "prazo_tarefa": "2022-06-25",
    "situacao_tarefa": 1
  }
  conexao.query("insert into tarefas set ? ", 
    [dadosParaIserir], function (error, results) {
    console.log(results);
    console.log(error);
    if (error) {
      return res.json({ erro: error });
    }
    res.json({ tarefas: results });
  });
});

router.get("/update", function (req, res) {
  dadosParaAlterar = {
    "nome_tarefa": "Formatar PC do Cliente 3.1",
    "prazo_tarefa": "2023-12-25",
    "situacao_tarefa": 0,
  }
  id_tarefa = 5; 
  conexao.query("UPDATE tarefas SET ? WHERE id_tarefa = ? ", 
  [dadosParaAlterar, id_tarefa], function (error, results) {
    console.log(results);
    console.log(error);
    if (error) {
      return res.json({ erro: error });
    }
    res.json({ tarefas: results });
  });
});

router.get("/delete-f", function (req, res) {
  id_tarefa = 6; 
  conexao.query("delete from tarefas  WHERE id_tarefa = ? ", 
  [id_tarefa], function (error, results) {
    console.log(results);
    console.log(error);
    if (error) {
      return res.json({ erro: error });
    }
    res.json({ tarefas: results });
  });
});

router.get("/delete-l", function (req, res) {
  id_tarefa = 5; 
  conexao.query("UPDATE tarefas SET status_tarefa = 0 WHERE id_tarefa = ? ",
   [id_tarefa], function (error, results) {
    console.log(results);
    console.log(error);
    if (error) {
      return res.json({ erro: error });
    }
    res.json({ tarefas: results });
  });
});

module.exports = router;