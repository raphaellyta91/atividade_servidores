import express from 'express'
import path from 'path'

const routAluno = express()
 

let alunos = [
    {
        matricula: '001',
        nome: 'Maria Silva',
        telefone: '84999999999',
        email: 'maria@email.com',
        curso: 'Desenvolvimento de Sistemas'
    }
]

routAluno.use(express.json())
routAluno.use(express.urlencoded({ extended: true }))


routAluno.get('/cadastro', (req, res) => {
    res.sendFile(path.resolve('./src/public/html/cadastro.html'))
})

routAluno.post('/aluno', (req, res) => {
    const matricula = req.body.matricula
    const nome = req.body.nome
    const telefone = req.body.telefone
    const email = req.body.email
    const curso = req.body.curso

    if (!matricula || !nome || !telefone || !email || !curso) {
        return res.status(400).json({ mensagem: 'Preencha todos os dados!' })
    }

    const novoAluno = { matricula, nome, telefone, email, curso }

    alunos.push(novoAluno)

    res.status(200).json({
        mensagem: 'Aluno cadastrado com sucesso!',
        novoAluno
    })
})

routAluno.get('/alunos/json', (req, res) => {
    res.status(200).json(alunos)
})

routAluno.get('/alunos/html', (req, res) => {
    let html = `
        <h1>Lista de Alunos</h1>

        <table border="1">
            <tr>
                <th>Matrícula</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Curso</th>
            </tr>
    `

    alunos.forEach(aluno => {
        html += `
            <tr>
                <td>${aluno.matricula}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.telefone}</td>
                <td>${aluno.email}</td>
                <td>${aluno.curso}</td>
            </tr>
        `
    })

    html += `
        </table>
        <br>
        <a href="/cadastro">Cadastrar novo aluno</a>
    `

    res.status(200).send(html)
})

routAluno.get('/aluno/:matricula', (req, res) => {
    const alunoEncontrado = alunos.find(a => a.matricula === req.params.matricula)

    if (!alunoEncontrado) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }

    res.status(200).json({
        mensagem: 'Aluno encontrado!',
        alunoEncontrado
    })
})

routAluno.put('/aluno/:matricula', (req, res) => {
    const alunoEncontrado = alunos.find(a => a.matricula === req.params.matricula)

    if (!alunoEncontrado) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }

    const { nome, telefone, email, curso } = req.body

    if (!nome || !telefone || !email || !curso) {
        return res.status(400).json({ mensagem: 'Preencha todos os dados!' })
    }

    alunoEncontrado.nome = nome
    alunoEncontrado.telefone = telefone
    alunoEncontrado.email = email
    alunoEncontrado.curso = curso

    res.status(200).json({
        mensagem: 'Aluno atualizado com sucesso!',
        alunoEncontrado
    })
})

routAluno.patch('/aluno/:matricula', (req, res) => {
    const alunoEncontrado = alunos.find(a => a.matricula === req.params.matricula)

    if (!alunoEncontrado) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }

    const { nome, telefone, email, curso } = req.body

    if (nome !== undefined && nome !== null && nome !== '') {
        alunoEncontrado.nome = nome
    }

    if (telefone !== undefined && telefone !== null && telefone !== '') {
        alunoEncontrado.telefone = telefone
    }

    if (email !== undefined && email !== null && email !== '') {
        alunoEncontrado.email = email
    }

    if (curso !== undefined && curso !== null && curso !== '') {
        alunoEncontrado.curso = curso
    }

    res.status(200).json({
        mensagem: 'Aluno atualizado com sucesso!',
        alunoEncontrado
    })
})

routAluno.delete('/aluno/:matricula', (req, res) => {
    const alunoEncontrado = alunos.findIndex(a => a.matricula === req.params.matricula)

    if (alunoEncontrado === -1) {
        return res.status(404).json({ mensagem: 'Aluno não encontrado!' })
    }

    alunos.splice(alunoEncontrado, 1)

    res.status(200).json({
        mensagem: 'Aluno removido com sucesso!',
        alunos
    })
})

export default routAluno

