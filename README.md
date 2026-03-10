# Lambda - Saudação Personalizada

Lambda em Node.js que recebe um JSON com o campo `nome` e retorna uma mensagem de saudação personalizada. Deploy automático via GitHub Actions (OIDC).

## Entrada

```json
{"nome": "Rodrigo"}
```

## Saída

```json
{
  "statusCode": 200,
  "body": "{\"message\": \"Olá, Rodrigo! Esta é minha primeira Lambda.\"}"
}
```

## Pré-requisitos

- [AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html) instalado
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) configurado com credenciais

## Deploy

```bash
sam build
sam deploy --guided
```

O `--guided` fará perguntas na primeira vez (nome do stack, região, permissões, etc.).

## Endpoint HTTP (API Gateway)

Após o deploy, a Lambda fica exposta como endpoint:

- **POST** `https://<api-id>.execute-api.sa-east-1.amazonaws.com/Prod/ola`  
  Body: `{"nome": "Rodrigo"}`

- **GET** `https://<api-id>.execute-api.sa-east-1.amazonaws.com/Prod/ola?nome=Rodrigo`

A URL completa aparece no output do `sam deploy`.

## Teste

### Via HTTP (curl)

```bash
# POST
curl -X POST https://<sua-url>/Prod/ola -H "Content-Type: application/json" -d '{"nome":"Rodrigo"}'

# GET
curl "https://<sua-url>/Prod/ola?nome=Rodrigo"
```

### Console AWS

1. Acesse o console da Lambda
2. Selecione a função criada
3. Crie um evento de teste com: `{"nome": "Rodrigo"}`
4. Execute o teste

### AWS CLI

```bash
aws lambda invoke --function-name <NomeDaFuncao> --payload '{"nome":"Rodrigo"}' out.json
cat out.json
```

### Local (SAM)

Crie um arquivo `event.json`:

```json
{"nome": "Rodrigo"}
```

Execute:

```bash
sam local invoke OlaNomeFunction --event event.json
```
