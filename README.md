# Missão Ortodoxa em Salvador

Site da [Missão Ortodoxa Grega em Salvador](https://www.ortodoxabahia.com.br) + **sistema de presença nas catequeses**.

## Sistema de presença

O padre cria uma catequese, o sistema gera um link de presença, e os catecúmenos confirmam pelo e-mail. Quem não está na lista é cadastrado na hora (nome + telefone). Relatórios por catequese e de presença geral, com exportação em CSV.

**Rotas:**
- `/presenca/[slug]` — página pública de confirmação (o link que o padre divulga)
- `/admin` — área do padre: criar catequese, ver presenças, relatórios
- `/admin/pessoas` — lista de catecúmenos + importar CSV do Notion

**Regras de negócio:**
- A chave de cada pessoa é o **e-mail** (case-insensitive).
- No import do CSV do Notion, quem já existe é atualizado; novidades são cadastradas. Quem não tem e-mail é casado pelo nome.
- Quem confirma com e-mail fora da lista é cadastrado automaticamente (marcado como "auto").

### Variáveis de ambiente

| Variável | Descrição |
| --- | --- |
| `DATABASE_PATH` | Caminho do banco SQLite. Em produção, aponte para o volume (ex: `/data/presenca.db`). |
| `ADMIN_PASSWORD` | Senha da área `/admin`. |

### Desenvolvimento

```bash
npm install
npm run dev
```

O banco fica em `data/presenca.db` (ignorado pelo git). Sem `ADMIN_PASSWORD` em dev, a senha é `admin123`.

### Deploy no Railway

1. Conecte o repositório ao Railway (crie um serviço a partir do repo — `railway.json` já define o build/start).
2. Crie um **Volume** de 1 GB montado em `/data`.
3. Configure as variáveis: `DATABASE_PATH=/data/presenca.db` e `ADMIN_PASSWORD=<senha forte>`.
4. Após o deploy, acesse `/admin`, entre com a senha e importe a lista de catecúmenos (exporte o CSV do Notion e cole em *Catecúmenos → Importar*).
5. Aponte o domínio (`ortodoxabahia.com.br` ou subdomínio) para o serviço no Railway.