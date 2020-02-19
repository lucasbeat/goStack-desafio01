const express = require("express");
const app = express();

app.use(express.json());
app.use(requests);

const projects = [];

// MIDDLEWARE PARA CHECAR SE PROJETO EXISTE
function checkProjectExists(req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({ error: "Projeto não existe" });
  }
  return next();
}

// CONTA O NUMERO DE REQUISIÇÕES
function requests(req, res, next) {
  console.count("Numero de requisições");

  return next();
}

// LISTA PROJETOS
app.get("/projects", (req, res) => {
  return res.json(projects);
});

//CRIA NOVO PROJETO
app.post("/projects", (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

// EDITA O PROJETO
app.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

// DELETA UM PROJETO
app.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id == id);

  projects.splice(project, 1);

  return res.json({ ok });
});

// ATUALIZANDO TASKS
app.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});

// INICIA O SERVIDOR
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
