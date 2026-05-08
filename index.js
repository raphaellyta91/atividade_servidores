import express from 'express'
import routerAluno from './src/routers/routerAluno.js'
import routCurso from './src/routers/routerCurso.js'
const app = express()
const PORT = 3000
const HOST = 'localhost'



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routerAluno)
app.use(routCurso)

app.get('/', (req, res) => {
    res.send('<h1>Página Inicial - Sistema de Alunos SENAC</h1>')
})


app.listen(PORT, HOST, () => {
    console.log(`Servidor rodando em: http://${HOST}:${PORT}`)
})