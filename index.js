const express = require("express");
const {alunos, buscaNome, buscaMedia, deletarAluno, atualizarDadosAluno, salvarArquivoJson} = require("./alunos");
const bodyParser = require('body-parser');
const fs = require("fs");
const morganBody = require('morgan-Body');
const path = require('path');
const morgan = require('morgan')
//const moment = require("moment/moment");
const app = express();
app.use(bodyParser.json());

// Aplicando Morgan para salvar o log em arquivo
const log = fs.createWriteStream(
    path.join(__dirname, "./logs", "express.log"), { flags: "a" }
);
morganBody(app, {
    noColors: true,
    stream: log,
});


// Get para /alunos
app.get("/alunos", morgan('combined'), (req, res) => {
    let listaAlunos = alunos;

    if (req.query.nome) {
        listaAlunos = buscaNome(listaAlunos, req.query.nome);
    }
    if (req.query.media) {
        listaAlunos = buscaMedia(listaAlunos, parseFloat(req.query.media));
    }
    res.json(listaAlunos);
    })

// POST para novo aluno
app.post("/alunos/novo", morgan('tiny'), (req, res) => {
    const { nome, matricula, media } = req.query;
    const novoAluno = { nome: nome,  matricula: matricula, media: media };
    alunos.push(novoAluno);
    salvarArquivoJson();
    
    if (novoAluno) {
        res.status(201).json({ message: "Usuário adicionado" });
    } else {
        res.status(400).json({ message: "Aluno não encontrado" });
    }
});

// Deletar aluno

// app.post("/alunos/deletar/:index", (req, res) => {
//     const index = parseInt(req.params.index);

//     try {
//         deletarAluno(index);
//         fs.writeFile("alunos.json", JSON.stringify(alunos), (err) => {
//             if (err) throw err;
//         })
//         res.json({ message: "Aluno removido com sucesso" });
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// });

app.delete("/alunos/:index", morgan(':url :method'), (req, res) => {
    const index = parseInt(req.params.index);
    
    if(alunos[index]) {
        deletarAluno(index);
        res.json({ message: "Aluno removido com sucesso" });
    } else  {
        res.status(404).json({ error: "O index não existe" });
    }
    salvarArquivoJson();
});

// Atualizar a lista de alunos

// app.post("/alunos/atualizar/:index", (req, res) => {
//     const index = req.params.index;
//     const { nome, matricula, media } = req.query;

//     if (!alunos[index]) {
//         res.status(404).json({ error: 'Aluno não encontrado' });
//         return;
//     }else {
//         atualizarDadosAluno(index, nome, matricula, media);
//         fs.writeFile("alunos.json", JSON.stringify(alunos), (err) => {
//             if (err) throw err;
//         })
//     }
//     res.json(alunos);
// })

app.put("/alunos/:index", (req, res) => {
    const index = (req.params.index);
    const { nome, matricula, media } = req.query;
    
    if (!alunos[index]) {
        res.status(404).json({ error: 'Aluno não encontrado' });
        return;
    }else {
        atualizarDadosAluno(index, nome, matricula, media);
    }
    salvarArquivoJson()
    res.json(alunos);
})

// Escuta
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/");
});



