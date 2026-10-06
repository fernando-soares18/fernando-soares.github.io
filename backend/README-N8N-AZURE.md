# Nandolino 2.0 — n8n + Azure

## Arquitetura segura
Portfólio (GitHub Pages) -> Webhook HTTPS do n8n -> Azure OpenAI -> n8n -> Portfólio

A chave/API secret do Azure fica SOMENTE no n8n (Credentials/Environment). Nunca coloque segredo no HTML, JS ou GitHub.

## Contrato do webhook
O front-end envia POST JSON:
```json
{"message":"pergunta do visitante","sessionId":"uuid","source":"portfolio","language":"pt-BR","page":"url"}
```

O n8n deve devolver JSON:
```json
{"reply":"resposta do Nandolino","actions":[]}
```

## Fluxo n8n sugerido
1. Webhook POST `/nandolino-chat`
2. Validar/limitar tamanho de `message` e aplicar rate limit
3. Montar System Prompt com os dados profissionais autorizados do Fernando
4. Chamar o deployment do Azure OpenAI usando credencial privada no n8n
5. Normalizar a resposta para `{ reply, actions }`
6. Respond to Webhook

## Configuração do site
Em `nandolino/index.html`, procure `NANDOLINO_AI.endpoint` e informe SOMENTE a URL HTTPS pública do webhook/proxy n8n.

Enquanto `endpoint` estiver vazio, o Nandolino continua 100% funcional em modo local. Se o backend cair, há fallback automático para as respostas locais.

## Produção
- Restrinja CORS ao domínio do portfólio.
- Use HTTPS.
- Rate limit por sessão/IP no backend.
- Não envie dados pessoais desnecessários ao modelo.
- Mantenha logs sem segredos.
- Defina um prompt de sistema que proíba inventar experiência, formação, projetos ou contatos.
