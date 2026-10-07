# Revisão Nandolino Skynet 2.2

## O que foi ajustado
- Nandolino conectado ao webhook público atual do n8n em `nandolino/config.js`.
- Timeout aumentado para 120 s para comportar respostas do Ollama em hardware local.
- Indicador visual de estado: configurado, pensando, IA online, fallback local e erro temporário.
- Bloqueio de envios duplicados enquanto a IA está processando.
- Limite de 600 caracteres por pergunta.
- Fallback local preservado caso n8n/Ollama/túnel estejam offline.
- Respostas da IA renderizadas como texto seguro, evitando execução de HTML retornado pelo modelo.
- Links de ações filtrados para HTTPS/caminhos relativos.
- Resposta local explicando a arquitetura do próprio Nandolino.
- Competências do portfólio atualizadas com n8n, Ollama/IA local e Cloudflare Tunnel.
- Code Snake agora mantém o recorde no navegador com localStorage.
- Documentação atualizada para a arquitetura real n8n + Ollama + Cloudflare.
- README antigo de Azure substituído pela documentação da solução atual.

## Atenção importante
O endereço `trycloudflare.com` atual é de Quick Tunnel e pode mudar quando o cloudflared for reiniciado. Se mudar, altere somente o campo `endpoint` em `nandolino/config.js` e publique novamente o site.

Para produção estável, o próximo upgrade recomendado é um Cloudflare Named Tunnel com hostname fixo.
