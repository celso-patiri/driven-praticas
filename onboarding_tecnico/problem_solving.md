#Tecnica de resolucao de problemas

          ┌────────────────────────────────────────────────────────────┐
          │           1                 ▲              2               │
          │  Priorisar solucoes         │    Em seguida solucoes       │
          │  que tenham alto impacto    │    que tenham alto impacto   │
          │  e baixo esforco            │    e exijam alto esforco     │
          │                             │                              │
 Effort   │ ◄───────────────────────────┼───────────────────────────── │
          │           3                 │              4               │
          │  Depois das solucoes acima  │    Por ultimo, se precisar   │
          │  solucoes com baixo impacto │    solucoes com alto esforco │
          │  e baixo esforco            │    e baixo impacto           │
          │                             │                              │
          └────────────────────────────────────────────────────────────┘
                                      Impact


#Passos

1. Rodar os testes do backend e ver se existe algum problema obvio logo de cara
2. Olhar o codigo da rota problematica no backend e verificar se existe algum problema obvio
3. Rodar o prisma studio e realizar testes manuais da rota pra entender melhor o problema
4. Rodar um debugger e ir verificando cada passo de execucao da rota problematica
