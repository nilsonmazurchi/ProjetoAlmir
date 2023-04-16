const alunos = require("./alunos.json")
const fs = require("fs");

// const alunos = [
//     { nome: "José Almir", matrícula: 15897968916, media: 7.0 },
//     { nome: "José Carlos", matrícula: 15897968917, media: 6.5 },
//     { nome: "Fernando Fernandes", matrícula: 15897968910, media: 4.5 },
//     { nome: "Cristiano Pereira", matrícula: 15897968911, media: 5.5 },
//     { nome: "João Cardozo", matrícula: 15897968912, media: 8.5 },
//     { nome: "João Pedro Lima", matrícula: 15897968913, media: 2.5 },
//     { nome: "Renata Adriana Silva", matrícula: 15897968914, media: 3.5 },
//     { nome: "Aline Cardoso", matrícula: 15897968915, media: 10.0 },
//     { nome: "Sofia Marques", matrícula: 15897968918, media: 6.2 },
//     { nome: "Adriana Santos", matrícula: 15897968919, media: 3.5 },
    
//   ];

  // Função de filtragem por nome
  function buscaNome(alunos, nome){
    return alunos.filter(aluno => {
      return aluno.nome.toLowerCase().includes(nome.toLowerCase());
    })

  }

  // Função de filtragem por média
  function buscaMedia(alunos, media){
    if (media >= 7) {
      return alunos.filter(aluno => aluno.media >= media);
  }
  }
  
// Função para deletar um aluno da lista

function deletarAluno(index) {
  if (index < 0 || index >= alunos.length) {
      return false;
  } else {
      alunos.splice(index, 1);
      return true;
}}

// Função para atualizar os dados dos alunos dentro do array

function atualizarDadosAluno(index, nome, matricula, media) {
  
  if (index < 0 || index >= alunos.length) {
      throw "Aluno não encontrado";
  } else {
    alunos[index].nome = nome;
    alunos[index].media = Number(media);
    alunos[index].matricula = Number(matricula);
    return nome, media, matricula
  }}

function salvarArquivoJson(){
  fs.writeFile("alunos.json", JSON.stringify(alunos), (err) => {
    if (err) throw err;
})
}
// // Exportação do array e das funções 

  module.exports = {alunos, buscaNome, buscaMedia, deletarAluno, atualizarDadosAluno, salvarArquivoJson}
  

  