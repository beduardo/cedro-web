# Avaliação Cedro - FrontEnd

## Observações gerais
O código a seguir foi implementado para ser integrado à solução BackEnd da avaliação, seguindo o modelo de unificação das funcionalidades em blocos onde módulo, componentes, specs de componentes, serviços e specs de serviços se encontram na mesma pasta. Somente os testes unitários foram implementados para que possam ser avaliadas também a intenção de cada trecho de código. Os elementos principais de cada template também foram testados para que compusessem corretamente a interface do usuário. 
Os testes de integração (e2e) necessários para a avaliação de performance, gestão de erros e funcionamento junto à infraestrutura não foram implementados por não estarem no escopo inicial da avaliação.

## Tecnologias e padrões utilizados
O projeto é implementado em Angular 5 para a criação dos componentes da aplicação e Karma/Jasmine para os testes unitários. Para melhorias visuais, o pacote npm `@angular/material` foi incluído ao projeto.

###### Arquitetura do projeto
O projeto é dividido em Componentes e Serviços onde um bloco de componentes atende a uma funcionalidade esperada pelo usuário comunicando com os serviços disponíveis para cada funcionalidade. A integração com o backend é feito pelos serviços através de comunicações HTTP padronizadas. 
