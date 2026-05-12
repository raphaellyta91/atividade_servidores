import express from 'express'
import path from 'path'
import routeCurso from './src/routes/routeCurso.js'

const app = express()
const PORT = 3000
const HOST = 'localhost'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, './src/public')))

app.use(routeCurso)

app.get('/', (req, res) => {
  res.send('<h1>Página Inicial</h1>')
})

app.listen(PORT, HOST, () => {
  console.log(`Servidor rodando em http://${HOST}:${PORT}`)
})