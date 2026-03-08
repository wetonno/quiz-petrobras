import { useState, useEffect, useRef, useCallback } from "react";

const QUESTIONS_DB = [
  // ═══════════════════════════════════════════════════════
  // BLOCO II — PETRÓLEO (90 questões)
  // ═══════════════════════════════════════════════════════
  { id:1, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"A rocha geradora de petróleo é caracterizada principalmente por:",
    opcoes:["Alta porosidade e permeabilidade","Elevado teor de matéria orgânica (querogênio)","Composição predominantemente carbonática","Ausência de estruturas sedimentares"],
    correta:1, explicacao:"A rocha geradora contém querogênio — matéria orgânica que, sob temperatura e pressão adequadas (janela do petróleo), gera hidrocarbonetos." },
  { id:2, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"fácil",
    pergunta:"O processo pelo qual os hidrocarbonetos migram da rocha geradora para a rocha reservatório é denominado:",
    opcoes:["Compactação","Diagênese","Migração primária e secundária","Subsidência"],
    correta:2, explicacao:"A migração primária ocorre dentro da rocha geradora; a secundária é o movimento pelo carrier bed até a armadilha." },
  { id:3, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"Uma armadilha estrutural do tipo anticlinal retém petróleo porque:",
    opcoes:["A rocha é impermeável em toda extensão","O dobramento cria uma geometria convexa onde o fluido fica retido abaixo do selo","A pressão capilar é zero nessa estrutura","O gradiente geotérmico é menor nessa região"],
    correta:1, explicacao:"O anticlinal é um dobramento côncavo para baixo. O petróleo, menos denso que a água, migra para o topo e fica retido pela rocha selante." },
  { id:4, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"difícil",
    pergunta:"A 'janela do petróleo' corresponde à faixa de temperatura em que:",
    opcoes:["10°C a 60°C","60°C a 120°C","150°C a 200°C","Acima de 250°C"],
    correta:1, explicacao:"Entre 60°C e 120°C ocorre a geração predominante de óleo. Acima de 120°C predomina gás (janela do gás seco)." },
  { id:5, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"A porosidade primária de uma rocha sedimentar é aquela formada:",
    opcoes:["Por dissolução de minerais após litificação","Durante a deposição e litificação dos sedimentos","Por fraturas tectônicas","Por dolomitização"],
    correta:1, explicacao:"Porosidade primária (intergranular) é formada durante a deposição. Porosidade secundária é criada por processos posteriores como dissolução ou fraturamento." },
  { id:6, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"O fator de recuperação de um reservatório de petróleo representa:",
    opcoes:["A razão entre o volume de óleo produzido e o volume original de óleo no lugar (VOPL)","A pressão média do reservatório","A viscosidade do óleo em condições de superfície","A espessura líquida da formação produtora"],
    correta:0, explicacao:"FR = Volume produzido / VOPL. Tipicamente varia de 20% a 50% para recuperação primária + secundária." },
  { id:7, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"difícil",
    pergunta:"Qual mecanismo de produção utiliza a expansão do gás em solução como principal força de empuxo?",
    opcoes:["Drive por capa de gás","Drive por água","Drive por gás em solução","Drive por compactação"],
    correta:2, explicacao:"No solution gas drive, o gás dissolvido no óleo se expande quando a pressão cai abaixo do ponto de bolha, empurrando o óleo para o poço." },
  { id:8, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"O número API do petróleo é uma medida de sua:",
    opcoes:["Viscosidade dinâmica","Densidade relativa (gravidade específica)","Pressão de vapor","Composição química em frações leves"],
    correta:1, explicacao:"°API = 141,5/SG - 131,5. Quanto maior o °API, mais leve (menos denso) é o petróleo. Óleo leve > 31°API; pesado < 22°API." },
  { id:9, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"fácil",
    pergunta:"Em um reservatório com contato óleo-água (COA), qual fluido ocupa a parte superior?",
    opcoes:["Água","Óleo","Gás","Depende da temperatura"],
    correta:1, explicacao:"Por diferença de densidade: gás no topo, óleo no meio, água na base. O COA marca a transição óleo-água." },
  { id:10, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"difícil",
    pergunta:"A permeabilidade efetiva ao óleo em um sistema multifásico é sempre:",
    opcoes:["Igual à permeabilidade absoluta","Maior que a permeabilidade absoluta","Menor que a permeabilidade absoluta","Independente da saturação de água"],
    correta:2, explicacao:"A permeabilidade efetiva é sempre menor que a absoluta, pois outras fases ocupam parte do espaço poroso, reduzindo o fluxo de cada fase." },

  { id:11, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"fácil",
    pergunta:"A função principal do fluido de perfuração (lama) é:",
    opcoes:["Apenas lubrificar a broca","Controlar a pressão de formação, remover cascalho e resfriar a broca","Somente cimentar o espaço anular","Apenas estabilizar as paredes do poço"],
    correta:1, explicacao:"O fluido de perfuração tem múltiplas funções: controle de pressão (coluna hidrostática), transporte de cascalho, resfriamento/lubrificação da broca e estabilização do poço." },
  { id:12, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O gradiente de pressão de uma coluna de lama com densidade 1,2 g/cm³ é aproximadamente:",
    opcoes:["0,052 psi/ft","0,624 psi/ft","1,2 psi/ft","12 psi/ft"],
    correta:1, explicacao:"Gradiente (psi/ft) = densidade (lb/gal) × 0,052. Convertendo: 1,2 g/cm³ = 10,01 lb/gal → 10,01 × 0,052 ≈ 0,52 psi/ft. Em kPa/m: 1,2 × 9,81 ≈ 11,77 kPa/m." },
  { id:13, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O fenômeno de 'kick' em perfuração ocorre quando:",
    opcoes:["A broca encontra uma rocha muito dura","A pressão de formação supera a pressão hidrostática da coluna de lama","A temperatura aumenta bruscamente","A velocidade de penetração cai abruptamente"],
    correta:1, explicacao:"Kick é o influxo indesejado de fluido de formação no poço. Se não controlado, pode evoluir para um blowout." },
  { id:14, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O BOP (Blowout Preventer) tem como função principal:",
    opcoes:["Aumentar a taxa de penetração da broca","Selar o poço em caso de kick ou blowout iminente","Controlar a densidade da lama","Medir a pressão estática do reservatório"],
    correta:1, explicacao:"O BOP é o equipamento de segurança instalado no cabeço do poço capaz de selar o espaço anular ou o interior da coluna em caso de emergência." },
  { id:15, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"difícil",
    pergunta:"A pressão equivalente de circulação (ECD) é maior que a pressão hidrostática estática porque:",
    opcoes:["O fluido em circulação é mais quente","As perdas de carga no espaço anular somam-se à pressão hidrostática","A velocidade de rotação da coluna reduz a pressão","O cascalho aumenta a densidade no ponto de fundo"],
    correta:1, explicacao:"ECD = densidade estática + perdas de pressão no anular. O fluido em movimento gera atrito, aumentando a pressão efetiva no fundo do poço." },
  { id:16, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"fácil",
    pergunta:"O objetivo da cimentação primária de um poço é:",
    opcoes:["Aumentar a permeabilidade da formação","Isolar zonas de diferentes pressões e proteger o revestimento","Reduzir a densidade da lama","Aumentar a taxa de produção"],
    correta:1, explicacao:"A cimentação primária isola zonas produtoras, protege o revestimento contra corrosão e suporta estruturalmente a coluna de revestimento." },
  { id:17, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"A diferença entre perfuração direcional e perfuração horizontal é:",
    opcoes:["Na perfuração direcional o poço nunca sai da vertical","Na horizontal, o ângulo de desvio atinge 90° (seção horizontal); na direcional, o desvio é intermediário","Apenas o tipo de broca utilizado","A profundidade máxima atingida"],
    correta:1, explicacao:"Perfuração direcional é o termo geral para desviar o poço da vertical. Quando o ângulo chega a 90°, tornando-se paralelo às camadas, chama-se horizontal." },
  { id:18, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"difícil",
    pergunta:"O parâmetro WOB (Weight on Bit) influencia diretamente:",
    opcoes:["Apenas a densidade da lama","A taxa de penetração e o desgaste da broca","Somente a pressão de formação","A viscosidade do fluido de perfuração"],
    correta:1, explicacao:"WOB é o peso aplicado sobre a broca. Aumentá-lo eleva a taxa de penetração, mas excessivo causa desgaste prematuro e pode deflexão da coluna." },
  { id:19, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"Qual tipo de broca é mais indicado para formações abrasivas e muito duras?",
    opcoes:["Broca de lâminas (PDC) com pastilhas de diamante polimérico","Broca tricone com dentes de aço","Broca de jato de água","Broca expansível"],
    correta:0, explicacao:"Brocas PDC (Polycrystalline Diamond Compact) são indicadas para formações duras e abrasivas. Brocas tricone são mais versáteis para formações médias." },
  { id:20, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"fácil",
    pergunta:"O revestimento de superfície em um poço terrestre tem como função principal:",
    opcoes:["Produzir petróleo da zona mais rasa","Isolar o lençol freático e suportar as demais colunas","Medir a temperatura de fundo","Controlar a pressão do reservatório profundo"],
    correta:1, explicacao:"O revestimento de superfície protege o lençol freático de contaminação, ancora o cabeço do poço e suporta as colunas subsequentes." },

  { id:21, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A equação de Darcy para fluxo em meios porosos relaciona:",
    opcoes:["Temperatura e pressão","Vazão, permeabilidade, gradiente de pressão e viscosidade","Porosidade e saturação","Densidade e compressibilidade"],
    correta:1, explicacao:"Lei de Darcy: q = -(kA/μ)(dP/dL). A vazão é proporcional à permeabilidade e ao gradiente de pressão, e inversamente proporcional à viscosidade." },
  { id:22, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A pressão de ponto de bolha (Pb) de um óleo é a pressão na qual:",
    opcoes:["O óleo começa a se solidificar","O primeiro volume de gás se separa do óleo (início da solução)","A água começa a ser produzida","A permeabilidade relativa ao gás chega a zero"],
    correta:1, explicacao:"Abaixo do Pb, o gás sai de solução formando uma fase gasosa livre. Acima do Pb, o óleo está undersaturated (gás completamente dissolvido)." },
  { id:23, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"O fator volume de formação do óleo (Bo) representa:",
    opcoes:["O volume de óleo no reservatório em relação ao volume nas condições de superfície","A razão entre permeabilidade efetiva e absoluta","A fração de óleo no fluido total produzido","A pressão capilar no contato óleo-água"],
    correta:0, explicacao:"Bo = Vreservatório/Vsuperfície. Bo > 1 porque o óleo no reservatório contém gás dissolvido, sendo mais volumoso. Na superfície, o gás escapa e o óleo encolhe." },
  { id:24, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A razão gás-óleo (RGO) de produção indica:",
    opcoes:["A viscosidade relativa entre gás e óleo","O volume de gás produzido por volume de óleo nas condições de superfície","A proporção de água na produção","A densidade do óleo em condições de reservatório"],
    correta:1, explicacao:"RGO (m³/m³ ou scf/STB) mede o gás associado produzido por barril de óleo. Um aumento brusco da RGO indica que a capa de gás está sendo drenada." },
  { id:25, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"Em um teste de pressão tipo buildup, a pressão estática do reservatório é obtida:",
    opcoes:["No momento em que o poço é fechado","Por extrapolação da curva de Horner para tempo infinito","Pela derivada da curva de pressão durante o fluxo","Pela diferença entre pressão de fundo fluxente e pressão de cabeça"],
    correta:1, explicacao:"No plot de Horner, a pressão de extrapolação para (tp+Δt)/Δt → 1 fornece a pressão média do reservatório (p*)." },
  { id:26, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A saturação de água irredutível (Swi ou Swc) é:",
    opcoes:["A saturação de água acima da qual a água começa a fluir","A saturação mínima de água que não pode ser deslocada por óleo — está retida nos poros menores","A saturação de água na zona de transição","A fração volumétrica de água total no reservatório"],
    correta:1, explicacao:"Swi é mantida por forças capilares. Abaixo de Swi, o óleo não flui. A permeabilidade relativa ao óleo é máxima quando Sw = Swi." },
  { id:27, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A recuperação secundária por injeção de água (waterflood) tem como objetivo principal:",
    opcoes:["Reduzir a viscosidade do óleo","Manter a pressão do reservatório e varrer o óleo em direção aos poços produtores","Dissolver o gás no óleo","Aumentar a permeabilidade da rocha"],
    correta:1, explicacao:"A injeção de água repõe energia ao reservatório (pressure maintenance) e desloca fisicamente o óleo em direção aos poços produtores." },
  { id:28, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"O número de capilaridade (Nc) em recuperação terciária é a razão entre:",
    opcoes:["Forças viscosas e forças capilares","Forças gravitacionais e forças viscosas","Pressão de reservatório e pressão capilar","Permeabilidade absoluta e permeabilidade relativa"],
    correta:0, explicacao:"Nc = forças viscosas / forças capilares. Para mobilizar óleo residual em EOR, é necessário aumentar Nc, reduzindo a tensão interfacial (surfactantes) ou aumentando a velocidade de fluxo." },
  { id:29, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"fácil",
    pergunta:"O que é VOPL (Volume Original de Petróleo no Lugar)?",
    opcoes:["O volume de óleo já produzido","O volume total de óleo existente no reservatório antes do início da produção","O volume de óleo recuperável economicamente","A reserva provada de óleo do campo"],
    correta:1, explicacao:"VOPL (ou OOIP — Original Oil In Place) é o volume de óleo no reservatório nas condições iniciais. Apenas uma fração (fator de recuperação) é economicamente produzível." },
  { id:30, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A heterogeneidade vertical de um reservatório é frequentemente quantificada pelo:",
    opcoes:["Número de Peclet","Coeficiente de variação de Dykstra-Parsons (VDP)","Fator de forma de Dietz","Índice de Lorenz"],
    correta:1, explicacao:"VDP varia de 0 (homogêneo) a 1 (totalmente heterogêneo). Alta heterogeneidade acelera o breakthrough de água e reduz a eficiência de varredura." },

  { id:31, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"fácil",
    pergunta:"A elevação natural (surgência) de um poço ocorre quando:",
    opcoes:["A pressão do reservatório é insuficiente para elevar o fluido","A pressão do reservatório é suficiente para vencer as perdas de carga e elevar o fluido até a superfície","O poço está em depleção avançada","A bomba de superfície está em operação"],
    correta:1, explicacao:"Na elevação natural, a energia do reservatório (pressão) é suficiente para trazer o fluido à superfície sem necessidade de equipamento de elevação artificial." },
  { id:32, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"O método de elevação artificial por Gas Lift consiste em:",
    opcoes:["Injetar gás comprimido no espaço anular para reduzir a densidade da coluna de fluido","Bombear fluido com bomba centrífuga submersa (BCS)","Usar êmbolo para empurrar o fluido","Injetar vapor para reduzir a viscosidade do óleo"],
    correta:0, explicacao:"No Gas Lift, gás é injetado pelo anular, entra na coluna de produção pelas válvulas de gas lift, reduz a densidade média da coluna e permite que a pressão do reservatório eleve o fluido." },
  { id:33, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"A bomba centrífuga submersa (BCS/ESP) é mais indicada para:",
    opcoes:["Poços com alta RGO e baixa produção de líquido","Poços de alta produção de líquido e baixa RGO","Poços de gás seco","Poços rasos com alta viscosidade"],
    correta:1, explicacao:"BCS é ideal para altas vazões de líquido (>500 bbl/d). Gas livre em excesso degrada o desempenho da bomba centrífuga (cavitação)." },
  { id:34, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"difícil",
    pergunta:"O fenômeno de 'golfadas' (slugging) em escoamento multifásico em tubulações ocorre principalmente no padrão de fluxo:",
    opcoes:["Bolhas dispersas","Anular","Golfadas (slug flow)","Estratificado"],
    correta:2, explicacao:"O padrão slug ocorre em inclinações ascendentes e verticais, com alternância de tampões de líquido e bolhas longas de gás, causando variações cíclicas de pressão e vazão." },
  { id:35, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"A curva IPR (Inflow Performance Relationship) de Vogel é utilizada para:",
    opcoes:["Poços de gás seco acima do ponto de orvalho","Poços de óleo abaixo da pressão de ponto de bolha (fluxo bifásico)","Calcular a perda de carga em tubulações","Dimensionar separadores de produção"],
    correta:1, explicacao:"A equação de Vogel (q/qmax = 1 - 0,2(Pwf/Pr) - 0,8(Pwf/Pr)²) descreve a IPR de poços de óleo com gás em solução liberado (abaixo do Pb)." },
  { id:36, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"O ponto de operação de um poço produtor é determinado pela interseção das curvas:",
    opcoes:["IPR e VLP (Vertical Lift Performance)","Permeabilidade relativa e saturação","RGO e BSW","Pressão de reservatório e temperatura de fundo"],
    correta:0, explicacao:"O ponto de operação (pressão de fundo fluxente e vazão) é onde a capacidade de afluxo do reservatório (IPR) iguala a capacidade de elevar o fluido (VLP/TPC)." },
  { id:37, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"fácil",
    pergunta:"O BSW (Basic Sediment and Water) indica:",
    opcoes:["A concentração de sal no óleo","A porcentagem volumétrica de água e sedimentos no fluido produzido","A viscosidade do óleo em condições de superfície","O teor de gás dissolvido no óleo"],
    correta:1, explicacao:"BSW é o percentual de água + sedimentos no fluido produzido. Campos maduros têm BSW > 90%, produzindo muito mais água que óleo." },
  { id:38, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"difícil",
    pergunta:"Em um sistema de produção offshore, a perda de pressão total desde o reservatório até a plataforma inclui:",
    opcoes:["Apenas a perda de carga na tubulação de produção","Perdas no reservatório (skin + Darcy), coluna de produção, linha de fluxo submarina e risers","Somente a perda hidrostática na coluna d'água","Apenas o skin factor do poço"],
    correta:1, explicacao:"O sistema de produção é analisado de forma integrada (NOdal Analysis): reservatório → poço → linha submarina → riser → facilidades de superfície." },
  { id:39, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"O skin factor (S) em análise de poços representa:",
    opcoes:["A espessura da zona de transição óleo-água","Um dano ou estimulação da formação próxima ao poço","A permeabilidade absoluta da rocha reservatório","A profundidade do intervalo perforado"],
    correta:1, explicacao:"S > 0: dano à formação (mud invasion, finos, precipitados). S < 0: estimulação (fratura hidráulica, acidificação). S = 0: formação sem dano." },
  { id:40, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"fácil",
    pergunta:"A gasolina natural e o GLP (Gás Liquefeito de Petróleo) são obtidos principalmente do processamento de:",
    opcoes:["Óleo pesado no fundo do reservatório","Gás natural rico em componentes pesados (C3+)","Água de formação","Resíduo de destilação atmosférica"],
    correta:1, explicacao:"O GLP (propano C3 e butano C4) e a gasolina natural (C5+) são frações líquidas recuperadas no processamento do gás natural rico nas UPGNs." },

  { id:41, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"A árvore de natal molhada (ANM) em poços submarinos tem como função:",
    opcoes:["Processar o fluido produzido no fundo do mar","Controlar e monitorar a produção do poço no fundo do mar, substituindo a árvore convencional de superfície","Separar gás e óleo antes de enviar à plataforma","Comprimir o gás para transporte em linhas longas"],
    correta:1, explicacao:"A ANM é instalada no cabeço do poço submarino. Contém válvulas de produção, kill, anular e acesso para intervenção com wireline/coiled tubing." },
  { id:42, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"O fenômeno de formação de hidratos em linhas submarinas é favorecido por:",
    opcoes:["Alta temperatura e baixa pressão","Baixa temperatura e alta pressão — condições típicas de fundos oceânicos profundos","Alta temperatura e alta pressão","Baixa temperatura e baixa pressão"],
    correta:1, explicacao:"Hidratos são compostos cristalinos formados por água + moléculas de gás. Formam-se espontaneamente em águas profundas (baixa T, alta P), podendo tamponar linhas." },
  { id:43, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"difícil",
    pergunta:"O FPSO (Floating Production Storage and Offloading) é uma unidade que:",
    opcoes:["Perfura poços em águas ultra-profundas","Produz, processa, armazena e transfere óleo para navios-tanque, sem necessidade de oleoduto até terra","Apenas armazena gás natural liquefeito","Realiza apenas perfuração exploratória"],
    correta:1, explicacao:"FPSOs são amplamente usados no pré-sal brasileiro. Substituem oleodutos em campos distantes da costa, permitindo armazenamento e transferência por aliviamento (shuttle tankers)." },
  { id:44, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"O manifold submarino tem como função principal:",
    opcoes:["Produzir gás comprimido para gas lift","Coletar a produção de vários poços e distribuí-la para as linhas de escoamento com maior eficiência","Separar as fases gás, óleo e água no fundo do mar","Controlar individualmente cada poço da plataforma"],
    correta:1, explicacao:"O manifold concentra os fluxos de múltiplos poços, permitindo flexibilidade operacional, testes individuais e otimização do escoamento." },
  { id:45, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"difícil",
    pergunta:"A deposição de parafina em linhas submarinas é combatida principalmente por:",
    opcoes:["Injeção de ácido clorídrico","Pigging (raspagem mecânica) e injeção de inibidores químicos","Aumento da pressão de operação","Redução da taxa de produção"],
    correta:1, explicacao:"Pigs são lançados periodicamente para raspar parafina depositada. Inibidores de parafina são injetados na cabeça do poço. O aquecimento ativo (pipe-in-pipe) também é usado." },
  { id:46, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"O sistema de controle de um poço submarino (SCM - Subsea Control Module) utiliza comunicação por:",
    opcoes:["Rádio frequência","Umbilical contendo linhas hidráulicas e elétricas/fibra óptica","Cabo de aço mecânico","Wireless subaquático de longa distância"],
    correta:1, explicacao:"O umbilical conecta a plataforma aos equipamentos submarinos, transmitindo fluido hidráulico de controle, energia elétrica, sinais de dados e inibidores químicos." },
  { id:47, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"fácil",
    pergunta:"O riser de produção em um sistema offshore é:",
    opcoes:["O cabo de ancoragem da plataforma","A tubulação que conecta o equipamento de fundo do mar à plataforma, transportando o fluido produzido","O tubo de revestimento do poço","A linha de injeção de água para o reservatório"],
    correta:1, explicacao:"O riser é o elo entre o sistema submarino e a superfície. Pode ser rígido (SCR), flexível ou em catenária, dependendo da lâmina d'água e tipo de unidade." },
  { id:48, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"difícil",
    pergunta:"A integridade de poços submarinos é monitorada principalmente através de:",
    opcoes:["Inspeção visual anual por mergulhadores","Monitoramento contínuo de pressão e temperatura nos annuli (espaços anulares) e testes de barreira","Análise de amostras de água do mar","Medição de vibração na plataforma"],
    correta:1, explicacao:"A integridade é avaliada pelo monitoramento dos annuli (A, B, C) para detectar migração de fluido. Falha de barreira pode indicar corrosão ou fratura no revestimento." },
  { id:49, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"A separação submarina (seabed separation) tem como vantagem principal em relação ao sistema convencional:",
    opcoes:["Eliminar a necessidade de risers","Reduzir o backpressure no poço, aumentando a produção, e permitir processar fluidos mais pesados","Eliminar o uso de inibidores químicos","Reduzir o custo de perfuração dos poços"],
    correta:1, explicacao:"Separadores submarinos reduzem a contrapressão na cabeça do poço, aumentando a diferencial de pressão e, consequentemente, a vazão de produção." },
  { id:50, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"fácil",
    pergunta:"O pré-sal brasileiro é caracterizado geologicamente por reservatórios localizados:",
    opcoes:["Em arenitos rasos da plataforma continental","Abaixo de uma espessa camada de sal (evaporitos), em carbonatos de idade cretácea","Em folhelhos de águas profundas","Em recifes de corais da costa nordestina"],
    correta:1, explicacao:"Os reservatórios do pré-sal estão em carbonatos (calcários e dolomitos) depositados antes da camada de sal, a profundidades de 5.000-7.000m abaixo do nível do mar." },

  { id:51, bloco:"II", assunto:"Processamento Primário", dificuldade:"fácil",
    pergunta:"O objetivo principal do processamento primário de petróleo na plataforma é:",
    opcoes:["Refinar o óleo em combustíveis finais","Separar o fluido produzido nas fases óleo, gás e água para exportação e descarte adequados","Converter óleo pesado em óleo leve","Criar derivados petroquímicos diretamente no campo"],
    correta:1, explicacao:"O processamento primário (ou de campo) visa separar as três fases (óleo, gás e água) para que o óleo atenda às especificações de exportação, o gás seja tratado e a água descartada." },
  { id:52, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"Os separadores de produção operam com base nos princípios de:",
    opcoes:["Destilação fracionada e craqueamento","Diferença de densidade entre as fases (gravidade), tempo de residência e diferença de pressão","Apenas filtração mecânica","Adsorção em leito de sílica"],
    correta:1, explicacao:"Separadores aproveitam diferença de densidade (gás < óleo < água) e fornecem tempo de residência suficiente para que as fases se separem por gravidade." },
  { id:53, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O dessalgador de petróleo tem como função:",
    opcoes:["Remover o enxofre do óleo","Remover sais inorgânicos dissolvidos na água de emulsão contida no óleo bruto","Separar o gás associado do óleo","Medir a salinidade da água produzida"],
    correta:1, explicacao:"O dessalgador injeta água de lavagem e aplica campo elétrico para coalescer gotículas de água salgada, reduzindo o teor de sal no óleo antes da exportação." },
  { id:54, bloco:"II", assunto:"Processamento Primário", dificuldade:"difícil",
    pergunta:"A especificação BSW máxima para exportação de óleo pela Petrobras é tipicamente:",
    opcoes:["10% de água e sedimentos","0,5% de água e sedimentos","5% de água e sedimentos","20% de água e sedimentos"],
    correta:1, explicacao:"O óleo para exportação deve ter BSW ≤ 0,5% (em volume), além de especificações de sal (PTB), RVP e outros parâmetros definidos pela PETROBRAS e regulação da ANP." },
  { id:55, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O sistema de compressão de gás na plataforma serve principalmente para:",
    opcoes:["Apenas queimar o gás no flare de emergência","Comprimir o gás associado produzido para reinjeção, exportação ou uso como combustível","Aumentar a pressão de injeção de água","Resfriar o óleo antes do armazenamento"],
    correta:1, explicacao:"O gás associado produzido com o óleo é comprimido em estágios. Destinos: exportação por gasoduto, reinjeção no reservatório (EOR), uso como combustível na própria plataforma ou GLP." },
  { id:56, bloco:"II", assunto:"Processamento Primário", dificuldade:"fácil",
    pergunta:"A água produzida antes do descarte ao mar deve ter o teor de óleo:",
    opcoes:["Qualquer concentração é aceitável","Reduzido abaixo dos limites legais (no Brasil, ≤ 29 mg/L pela Resolução CONAMA 393/2007)","Apenas filtrada de sólidos grosseiros","Tratada com ácido sulfúrico"],
    correta:1, explicacao:"A Resolução CONAMA 393/2007 estabelece concentração média mensal de óleo e graxas ≤ 29 mg/L para descarte de água produzida no mar." },
  { id:57, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"Emulsões óleo-água são estabilizadas principalmente por:",
    opcoes:["Alta temperatura","Agentes emulsificantes naturais como asfaltenos e resinas que se adsorvem na interface óleo-água","Alta pressão","Ausência de sal na água de formação"],
    correta:1, explicacao:"Asfaltenos e resinas são surfactantes naturais do petróleo que se concentram na interface óleo-água, formando filmes elásticos que estabilizam a emulsão." },
  { id:58, bloco:"II", assunto:"Processamento Primário", dificuldade:"difícil",
    pergunta:"A medição de petróleo para fins fiscais (custody transfer) exige equipamentos de medição com incerteza máxima de:",
    opcoes:["±10%","±5%","±0,5% (Portaria ANP 249/2000 e normas subsequentes)","±1%"],
    correta:2, explicacao:"A medição fiscal de óleo e gás no Brasil é regulamentada pela ANP e exige sistemas de medição com incerteza ≤ ±0,5% para líquidos, com calibração rastreável." },
  { id:59, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O flare de uma plataforma de petróleo tem como função:",
    opcoes:["Gerar energia elétrica para a plataforma","Queimar gás de alívio de segurança, purgas e gás não especificado para exportação","Produzir vapor para aquecimento do óleo","Sinalização para embarcações próximas"],
    correta:1, explicacao:"O flare é um sistema de segurança que queima gás que não pode ser aproveitado ou exportado, evitando acúmulo de gás inflamável na plataforma." },
  { id:60, bloco:"II", assunto:"Processamento Primário", dificuldade:"fácil",
    pergunta:"O gás natural é composto principalmente por:",
    opcoes:["Propano (C3H8)","Metano (CH4), com frações menores de etano, propano e butano","Butano (C4H10)","Etileno (C2H4)"],
    correta:1, explicacao:"O gás natural tem CH4 como componente predominante (tipicamente 70-98%). O teor de metano determina o poder calorífico e a classificação do gás (rico ou pobre)." },

  // ═══════════════════════════════════════════════════════
  // BLOCO I — FÍSICA / MECÂNICA / TERMODINÂMICA (70 questões)
  // ═══════════════════════════════════════════════════════
  { id:61, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"A equação da continuidade para escoamento incompressível em regime permanente estabelece que:",
    opcoes:["A velocidade é constante em todos os pontos","O produto da área pela velocidade é constante ao longo da linha de corrente (A₁V₁ = A₂V₂)","A pressão é igual em todos os pontos","A temperatura é constante"],
    correta:1, explicacao:"Conservação de massa: ρA₁V₁ = ρA₂V₂. Para fluido incompressível (ρ = const): A₁V₁ = A₂V₂. Seção menor → velocidade maior." },
  { id:62, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"A equação de Bernoulli é válida para escoamento:",
    opcoes:["Viscoso, compressível e não permanente","Invíscido, incompressível, permanente e ao longo de uma linha de corrente","Turbulento com grandes perdas de carga","Multifásico em tubulações"],
    correta:1, explicacao:"Bernoulli: P/ρ + V²/2 + gz = cte. Hipóteses: fluido ideal (sem viscosidade), incompressível, permanente, ao longo de uma linha de corrente." },
  { id:63, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"difícil",
    pergunta:"O número de Reynolds (Re) é a razão entre:",
    opcoes:["Forças gravitacionais e forças viscosas","Forças inerciais e forças viscosas","Forças de pressão e forças gravitacionais","Forças capilares e forças viscosas"],
    correta:1, explicacao:"Re = ρVD/μ = VD/ν. Re < 2300: laminar; Re > 4000: turbulento. Representa a dominância relativa de forças inerciais sobre viscosas." },
  { id:64, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"Para escoamento laminar em tubulação circular (Hagen-Poiseuille), a queda de pressão é proporcional a:",
    opcoes:["V² (velocidade ao quadrado)","V (velocidade — relação linear)","V^0.5","V^1.8"],
    correta:1, explicacao:"Na lei de Hagen-Poiseuille: ΔP = 128μLQ/(πD⁴). A queda de pressão é linear com a vazão (e portanto com a velocidade) no regime laminar." },
  { id:65, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"A viscosidade dinâmica (μ) de um fluido newtoniano:",
    opcoes:["Aumenta com a taxa de cisalhamento","É constante independentemente da taxa de cisalhamento","Diminui com a taxa de cisalhamento","Depende apenas da temperatura e pressão, sendo zero para gás ideal"],
    correta:1, explicacao:"Fluido newtoniano: τ = μ(dv/dy). μ é constante para dado par T e P. Fluidos não-newtonianos (polímeros, lamas de perfuração) têm viscosidade que varia com a taxa de cisalhamento." },
  { id:66, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"difícil",
    pergunta:"A perda de carga distribuída (Darcy-Weisbach) em uma tubulação é calculada por:",
    opcoes:["hf = f(L/D)(V²/2g)","hf = μVL/D²","hf = ρV²/2","hf = P/(ρg)"],
    correta:0, explicacao:"Darcy-Weisbach: hf = f(L/D)(V²/2g). O fator de atrito f depende do Re e da rugosidade relativa (ε/D), obtido pelo diagrama de Moody." },
  { id:67, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"A pressão manométrica é:",
    opcoes:["A pressão absoluta menos a pressão atmosférica","A pressão hidrostática na base de uma coluna de líquido","A pressão total do fluido em movimento","A diferença de pressão entre dois pontos de uma tubulação"],
    correta:0, explicacao:"P_man = P_abs - P_atm. Manômetros medem pressão relativa à atmosfera. P_abs = P_man + P_atm (aprox. 101.325 Pa ao nível do mar)." },
  { id:68, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"fácil",
    pergunta:"O empuxo sobre um corpo submerso é igual a:",
    opcoes:["O peso do corpo","O volume do corpo multiplicado pela densidade do fluido","O peso do fluido deslocado pelo corpo (Princípio de Arquimedes)","A área do corpo multiplicada pela pressão do fluido"],
    correta:2, explicacao:"Princípio de Arquimedes: E = ρ_fluido × g × V_submerso. O empuxo atua verticalmente para cima no centroide do volume de fluido deslocado." },
  { id:69, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"difícil",
    pergunta:"Em escoamento turbulento plenamente desenvolvido em tubulação, o perfil de velocidade é:",
    opcoes:["Parabólico como no laminar","Mais uniforme (achatado) em relação ao laminar, com gradientes maiores próximos à parede","Completamente uniforme (plug flow)","Linear da parede ao centro"],
    correta:1, explicacao:"No turbulento, a mistura intensa torna o perfil mais achatado no centro, mas os gradientes na subcamada viscosa próxima à parede são muito intensos." },
  { id:70, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"O coeficiente de perda de carga localizada (K) em uma curva ou válvula representa:",
    opcoes:["A perda de calor por convecção","A perda de carga expressa em múltiplos de V²/2g","A rugosidade equivalente da tubulação","O fator de atrito de Darcy"],
    correta:1, explicacao:"hf_local = K × V²/2g. Cada singularidade (curva, tê, válvula) tem seu K tabelado. Perdas localizadas somam-se às distribuídas para perda total." },
  { id:71, bloco:"I", assunto:"Termodinâmica", dificuldade:"fácil",
    pergunta:"A primeira lei da termodinâmica para um sistema fechado estabelece:",
    opcoes:["A entropia sempre aumenta em processos irreversíveis","A variação de energia interna é igual ao calor recebido menos o trabalho realizado (ΔU = Q - W)","A temperatura é constante em processos adiabáticos","A entalpia é conservada em turbinas"],
    correta:1, explicacao:"1ª lei: ΔU = Q - W. Para sistema aberto (volume de controle): Δh + ΔKE + ΔPE = q - w_s (entalpia + energias cinética e potencial = calor - trabalho de eixo)." },
  { id:72, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"Um processo isentrópico é simultaneamente:",
    opcoes:["Isotérmico e isobárico","Adiabático e reversível","Adiabático e irreversível","Isobárico e reversível"],
    correta:1, explicacao:"Isentrópico → ΔS = 0. Para isso, o processo deve ser adiabático (Q = 0) e reversível. Na prática, compressores e turbinas são aproximados como isentrópicos para análise." },
  { id:73, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"O ciclo de Carnot define a eficiência máxima de uma máquina térmica operando entre temperaturas TH e TC como:",
    opcoes:["η = TC/TH","η = 1 - TC/TH","η = (TH - TC)/(TH + TC)","η = TH/(TH - TC)"],
    correta:1, explicacao:"η_Carnot = 1 - TC/TH (em Kelvin). Nenhuma máquina real pode superar a eficiência de Carnot. Quanto maior a diferença de temperatura, maior a eficiência máxima." },
  { id:74, bloco:"I", assunto:"Termodinâmica", dificuldade:"difícil",
    pergunta:"A segunda lei da termodinâmica implica que em um processo espontâneo e isolado:",
    opcoes:["A energia interna aumenta","A entropia do universo aumenta (ΔS_universo ≥ 0)","A temperatura permanece constante","O trabalho útil é máximo"],
    correta:1, explicacao:"2ª lei de Clausius: a entropia do universo nunca diminui. Para processos reversíveis, ΔS_univ = 0; para irreversíveis, ΔS_univ > 0." },
  { id:75, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"Em uma expansão adiabática de gás ideal em uma turbina reversível, a temperatura do gás:",
    opcoes:["Permanece constante","Diminui","Aumenta","Depende apenas da pressão inicial"],
    correta:1, explicacao:"Na expansão isentrópica de gás ideal: T₂/T₁ = (P₂/P₁)^((γ-1)/γ). Como P₂ < P₁, T₂ < T₁. A energia interna converte-se em trabalho de eixo." },
  { id:76, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"O coeficiente de desempenho (COP) de um ciclo de refrigeração é definido como:",
    opcoes:["Trabalho fornecido / calor rejeitado na alta temperatura","Calor retirado da fonte fria / trabalho consumido pelo compressor","Calor rejeitado / calor absorvido","Eficiência isentrópica do compressor"],
    correta:1, explicacao:"COP_refrigeração = QL/W. Para bomba de calor: COP_BC = QH/W = COP_refrig + 1. Quanto maior o COP, mais eficiente o sistema." },
  { id:77, bloco:"I", assunto:"Termodinâmica", dificuldade:"fácil",
    pergunta:"A entalpia (H) é definida como:",
    opcoes:["H = U - PV","H = U + PV","H = TS - PV","H = G + TS"],
    correta:1, explicacao:"H = U + PV. Em processos isobáricos, Q_p = ΔH. A entalpia é a função de estado mais útil para análise de equipamentos abertos (turbinas, compressores, trocadores)." },
  { id:78, bloco:"I", assunto:"Termodinâmica", dificuldade:"difícil",
    pergunta:"Para um gás ideal sofrendo compressão politrópica (PVⁿ = cte), o trabalho de compressão é mínimo quando:",
    opcoes:["n = 0 (isobárico)","n = 1 (isotérmico)","n = γ (isentrópico)","n → ∞ (isocórico)"],
    correta:1, explicacao:"Para n = 1 (isotérmico), o trabalho de compressão é o menor possível. Na prática, resfria-se o gás em compressores de múltiplos estágios para aproximar o isotérmico." },
  { id:79, bloco:"I", assunto:"Transferência de Calor", dificuldade:"fácil",
    pergunta:"Os três mecanismos de transferência de calor são:",
    opcoes:["Condução, convecção e evaporação","Condução, convecção e radiação","Radiação, condensação e ebulição","Difusão, advecção e irradiação"],
    correta:1, explicacao:"Condução: transferência por contato (Fourier, q = -kA dT/dx). Convecção: fluido em movimento (Newton, q = hA ΔT). Radiação: ondas eletromagnéticas (Stefan-Boltzmann, q = εσAT⁴)." },
  { id:80, bloco:"I", assunto:"Transferência de Calor", dificuldade:"média",
    pergunta:"A lei de Fourier para condução de calor em regime permanente relaciona o fluxo de calor com:",
    opcoes:["O gradiente de temperatura — q'' = -k(dT/dx)","A diferença de temperatura ao quadrado","A velocidade do fluido","A emissividade da superfície"],
    correta:0, explicacao:"q'' = -k(dT/dx). O sinal negativo indica que o calor flui no sentido decrescente de temperatura. k é a condutividade térmica do material." },
  { id:81, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"média",
    pergunta:"A tensão normal de tração em uma barra submetida a uma força axial P com área A é:",
    opcoes:["σ = P/A","σ = P × A","σ = P/(2A)","σ = A/P"],
    correta:0, explicacao:"σ = P/A (Pa ou N/m²). Tração positiva; compressão negativa. A deformação unitária axial ε = σ/E = P/(AE) pela lei de Hooke." },
  { id:82, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"média",
    pergunta:"O módulo de elasticidade (E) de Young relaciona:",
    opcoes:["Tensão de cisalhamento e ângulo de distorção","Tensão normal e deformação unitária longitudinal (Lei de Hooke: σ = Eε)","Momento fletor e curvatura","Torque e ângulo de torção"],
    correta:1, explicacao:"Lei de Hooke: σ = Eε. Para aço, E ≈ 200 GPa; alumínio ≈ 70 GPa; concreto ≈ 25-30 GPa. E é propriedade intrínseca do material, independe da geometria." },
  { id:83, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"difícil",
    pergunta:"Em uma viga biapoiada sujeita a carga distribuída uniforme q, o momento fletor máximo ocorre:",
    opcoes:["Nos apoios","No meio do vão, com valor qL²/8","A um quarto do vão","Próximo aos apoios, com valor qL²/12"],
    correta:1, explicacao:"Para viga simplesmente apoiada com carga distribuída q: M_max = qL²/8 no centro. O diagrama de momento é parabólico, com máximo no meio." },
  { id:84, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"média",
    pergunta:"A tensão de cisalhamento máxima em uma seção circular sólida sob torque T é:",
    opcoes:["τ = T/J","τ = Tr/J (com r = raio externo)","τ = T/(πr²)","τ = TL/(GJ)"],
    correta:1, explicacao:"τ = Tr/J, onde J = πr⁴/2 para seção circular sólida. A tensão é máxima na periferia (r = R) e zero no centro." },
  { id:85, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"média",
    pergunta:"O coeficiente de Poisson (ν) descreve a relação entre:",
    opcoes:["Tensão de cisalhamento e deformação angular","Deformação lateral e deformação longitudinal em um carregamento uniaxial","Temperatura e deformação térmica","Momento e curvatura"],
    correta:1, explicacao:"ν = -ε_lat/ε_long. Para metais, ν ≈ 0,25-0,35. ν = 0,5 para material incompressível (borracha). Relaciona deformações em direções perpendiculares." },
  { id:86, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"difícil",
    pergunta:"O critério de von Mises para início de escoamento em estado biaxial de tensão afirma que:",
    opcoes:["A tensão principal máxima deve ser menor que a resistência ao escoamento","A tensão equivalente σ_eq = √(σ₁² - σ₁σ₂ + σ₂²) deve ser menor que σ_y","A tensão de cisalhamento máxima não deve superar τ_y","A energia de deformação total deve ser mínima"],
    correta:1, explicacao:"Von Mises (máxima energia de distorção): σ_eq < σ_y para o material não escoar. É o critério mais preciso para materiais dúcteis como aço e alumínio." },
  { id:87, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"fácil",
    pergunta:"A flambagem (buckling) de uma coluna esguia é analisada pela fórmula de Euler, que fornece a carga crítica:",
    opcoes:["Pcr = σ_y × A","Pcr = π²EI/(KL)²","Pcr = EA/L","Pcr = GJ/L"],
    correta:1, explicacao:"Fórmula de Euler: Pcr = π²EI/(Le)², onde Le = KL é o comprimento efetivo (K depende das condições de contorno). Colunas com baixo I/A² (esbeltez alta) flamejam antes de escoar." },
  { id:88, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"difícil",
    pergunta:"O número de Mach (Ma) é a razão entre:",
    opcoes:["Velocidade do fluido e velocidade do som no meio","Forças inerciais e forças de pressão","Forças viscosas e forças de superfície","Velocidade de fase e velocidade de grupo"],
    correta:0, explicacao:"Ma = V/c, onde c = √(γRT) para gás ideal. Ma < 1: subsônico; Ma = 1: sônico; Ma > 1: supersônico. Importante em escoamento de gás em tubulações longas." },
  { id:89, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"Em um trocador de calor casco-e-tubos operando em contra-corrente, comparado ao paralelo:",
    opcoes:["A diferença de temperatura média logarítmica (LMTD) é menor","A eficiência máxima é menor","A LMTD é maior, permitindo maior transferência de calor para a mesma área","Os dois têm a mesma LMTD"],
    correta:2, explicacao:"Contra-corrente sempre fornece LMTD maior que paralelo para as mesmas temperaturas de entrada/saída, sendo mais eficiente. Permite resfriamento do fluido quente abaixo da temperatura de saída do frio." },
  { id:90, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"A cavitação em bombas centrífugas ocorre quando:",
    opcoes:["A rotação é muito baixa","A pressão local no interior da bomba cai abaixo da pressão de vapor do líquido","A temperatura do fluido é muito alta","O fluido é muito viscoso"],
    correta:1, explicacao:"Quando P_local < P_vapor, o líquido vaporiza localmente, formando bolhas que implodem violentamente ao encontrar regiões de maior pressão, causando erosão e vibração." },

  // ═══════════════════════════════════════════════════════
  // MATEMÁTICA E RACIOCÍNIO LÓGICO (25 questões)
  // ═══════════════════════════════════════════════════════
  { id:91, bloco:"Mat", assunto:"Matemática Financeira", dificuldade:"média",
    pergunta:"Um capital de R$10.000 é investido a juros compostos de 2% ao mês por 6 meses. O montante final é:",
    opcoes:["R$11.200,00","R$11.261,62","R$12.000,00","R$11.040,00"],
    correta:1, explicacao:"M = C(1+i)^n = 10.000 × (1,02)^6 = 10.000 × 1,12616 = R$11.261,62. Juros compostos: os juros do período anterior geram juros no período seguinte." },
  { id:92, bloco:"Mat", assunto:"Matemática Financeira", dificuldade:"média",
    pergunta:"A taxa de juros de 1% ao mês corresponde a uma taxa efetiva anual de aproximadamente:",
    opcoes:["12%","12,68%","11,5%","13%"],
    correta:1, explicacao:"i_a = (1 + i_m)^12 - 1 = (1,01)^12 - 1 ≈ 0,1268 = 12,68%. A taxa nominal de 12% a.a. capitalizada mensalmente é diferente da taxa efetiva de 12,68% a.a." },
  { id:93, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"média",
    pergunta:"Se toda engenharia leva ao petróleo, e algum químico faz engenharia, então:",
    opcoes:["Todo químico leva ao petróleo","Algum químico leva ao petróleo","Nenhum químico leva ao petróleo","Não é possível concluir nada"],
    correta:1, explicacao:"Premissa 1: ∀E → P. Premissa 2: ∃Q → E. Conclusão: ∃Q → P (algum químico que faz engenharia leva ao petróleo). Silogismo válido por aplicação de Barbara ao subconjunto." },
  { id:94, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"fácil",
    pergunta:"A negação da proposição 'Todos os poços produzem óleo' é:",
    opcoes:["Nenhum poço produz óleo","Existe pelo menos um poço que não produz óleo","Todos os poços não produzem óleo","Algum poço produz óleo"],
    correta:1, explicacao:"Negação de 'Todo A é B' = 'Existe A que não é B'. Neg(∀x P(x)) = ∃x ¬P(x). A negação de uma universal é uma particular negativa." },
  { id:95, bloco:"Mat", assunto:"Estatística", dificuldade:"média",
    pergunta:"Em uma amostra de produção diária (bbl): 100, 120, 110, 130, 140. A média e o desvio padrão amostral são:",
    opcoes:["Média=120, DP≈15,81","Média=120, DP=14","Média=110, DP=20","Média=120, DP=100"],
    correta:0, explicacao:"Média = (100+120+110+130+140)/5 = 120. Variância amostral = [(20²+0²+10²+10²+20²)/4] = [800/4] = 200. DP = √200 ≈ 14,14. (Corrigindo: Σ(xi-x̄)²=400+0+100+100+400=1000; s²=1000/4=250; s≈15,81)." },
  { id:96, bloco:"Mat", assunto:"Estatística", dificuldade:"média",
    pergunta:"A correlação de Pearson entre duas variáveis mede:",
    opcoes:["A causalidade entre as variáveis","A força e direção da associação linear entre elas, variando de -1 a +1","A diferença entre as médias das variáveis","A variância combinada das duas variáveis"],
    correta:1, explicacao:"r ∈ [-1, +1]. r = +1: correlação linear positiva perfeita; r = -1: negativa perfeita; r = 0: ausência de correlação linear. Correlação ≠ causalidade." },
  { id:97, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"difícil",
    pergunta:"Em um conjunto de tabelas-verdade, a expressão (P → Q) é logicamente equivalente a:",
    opcoes:["P ∧ ¬Q","¬P ∨ Q","¬Q → ¬P apenas","P ∨ ¬Q"],
    correta:1, explicacao:"P → Q ≡ ¬P ∨ Q (definição da implicação material). Também equivale à contrapositiva ¬Q → ¬P. A implicação só é falsa quando P é V e Q é F." },
  { id:98, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"Uma tubulação circular tem diâmetro interno de 6 polegadas. Sua área da seção transversal interna em cm² é aproximadamente: (1 pol = 2,54 cm)",
    opcoes:["18,2 cm²","182,4 cm²","72,4 cm²","456 cm²"],
    correta:1, explicacao:"D = 6 × 2,54 = 15,24 cm; r = 7,62 cm. A = πr² = π × 7,62² ≈ 3,14159 × 58,06 ≈ 182,4 cm²." },
  { id:99, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"média",
    pergunta:"Em uma sequência lógica: 2, 6, 18, 54, ___. Qual é o próximo termo?",
    opcoes:["108","162","216","270"],
    correta:1, explicacao:"Razão geométrica = 3 (cada termo é 3 vezes o anterior). 54 × 3 = 162. Sequência: 2, 6, 18, 54, 162, 486, ..." },
  { id:100, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"A derivada de f(x) = x³ + 2x² - 5x + 3 em x = 2 é:",
    opcoes:["f'(2) = 11","f'(2) = 15","f'(2) = 7","f'(2) = 19"],
    correta:1, explicacao:"f'(x) = 3x² + 4x - 5. f'(2) = 3(4) + 4(2) - 5 = 12 + 8 - 5 = 15." },
  { id:101, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"A integral definida ∫₀² (2x + 1) dx é igual a:",
    opcoes:["5","6","7","8"],
    correta:1, explicacao:"∫(2x+1)dx = x² + x + C. Avaliando: [4 + 2] - [0 + 0] = 6. Geometricamente, é a área do trapézio com bases 1 e 5, altura 2: A = (1+5)×2/2 = 6." },
  { id:102, bloco:"Mat", assunto:"Estatística", dificuldade:"fácil",
    pergunta:"A mediana de um conjunto de dados é o valor que:",
    opcoes:["Aparece com maior frequência (moda)","Divide o conjunto ordenado em duas metades iguais","É a média aritmética de todos os valores","É sempre igual à média em distribuições simétricas"],
    correta:1, explicacao:"Mediana é o valor central quando os dados estão ordenados. Para n par: média dos dois centrais. É robusta a outliers, diferentemente da média aritmética." },
  { id:103, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"difícil",
    pergunta:"Cinco engenheiros (A, B, C, D, E) competem por 3 vagas. Se A e B não podem ficar juntos, o número de combinações possíveis é:",
    opcoes:["4","6","10","7"],
    correta:1, explicacao:"Total sem restrição: C(5,3) = 10. Combinações com A e B juntos: precisam de 1 dos 3 restantes = C(3,1) = 3. Válidas: 10 - 3 = 6... porém verificando: {A,C,D},{A,C,E},{A,D,E},{B,C,D},{B,C,E},{B,D,E} = 6 combinações." },
  { id:104, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"A equação da reta que passa pelos pontos (1, 3) e (3, 7) é:",
    opcoes:["y = 2x + 1","y = 3x","y = x + 2","y = 2x - 1"],
    correta:0, explicacao:"Coeficiente angular: m = (7-3)/(3-1) = 4/2 = 2. Equação: y - 3 = 2(x - 1) → y = 2x + 1. Verificando: x=3 → y = 7 ✓" },
  { id:105, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"média",
    pergunta:"Um tanque esférico tem raio de 2 metros. Seu volume em m³ é:",
    opcoes:["25,13 m³","33,51 m³","16,76 m³","50,27 m³"],
    correta:1, explicacao:"V = (4/3)πr³ = (4/3) × π × 8 = 32π/3 ≈ 33,51 m³." },

  // ═══════════════════════════════════════════════════════
  // BLOCO III — PORTUGUÊS (15 questões)
  // ═══════════════════════════════════════════════════════
  { id:106, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"Assinale a alternativa em que o uso da vírgula está INCORRETO:",
    opcoes:["O engenheiro, que trabalha na Petrobras, foi promovido.","O engenheiro que trabalha na Petrobras, foi promovido.","Portanto, a solução adotada foi a mais viável.","João, Pedro e Maria foram aprovados."],
    correta:1, explicacao:"Não se separa sujeito do predicado com vírgula. 'O engenheiro que trabalha na Petrobras' é o sujeito; 'foi promovido' é o predicado. A vírgula após 'Petrobras' é incorreta." },
  { id:107, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"Em 'Embora o reservatório apresentasse baixa permeabilidade, a produção foi satisfatória', a oração subordinada exprime:",
    opcoes:["Causa","Condição","Concessão","Consequência"],
    correta:2, explicacao:"'Embora' é conjunção concessiva. Indica que a oração principal ocorre apesar do que é dito na subordinada. Outras: causa (porque, pois), condição (se, caso), consequência (tanto que)." },
  { id:108, bloco:"III", assunto:"Português", dificuldade:"fácil",
    pergunta:"A palavra 'fluido' pode ser classificada como:",
    opcoes:["Apenas substantivo","Apenas adjetivo","Substantivo ou adjetivo, dependendo do contexto","Sempre verbo"],
    correta:2, explicacao:"'O fluido escoa' (substantivo). 'O movimento fluido' (adjetivo). Palavras que exercem função dupla são chamadas de substantivo-adjetivo ou têm dupla classe." },
  { id:109, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"Qual alternativa apresenta o uso correto da crase?",
    opcoes:["Ele foi à reunião de segurança.","Refiro-me à problemas técnicos.","Entregou o relatório à Petrobras S.A.","Dirigiu-se à plataforma e à sonda."],
    correta:0, explicacao:"Crase antes de substantivo feminino precedido de preposição 'a' + artigo 'a'. 'Reunião' é feminino → à reunião ✓. Antes de masculino (problemas) não há crase. Petrobras S.A. é nome próprio — crase facultativa." },
  { id:110, bloco:"III", assunto:"Português", dificuldade:"difícil",
    pergunta:"Na frase 'Os dados que a empresa divulgou foram contestados', o pronome relativo 'que' retoma:",
    opcoes:["empresa","divulgou","dados","contestados"],
    correta:2, explicacao:"'Que' é pronome relativo que substitui e retoma o antecedente 'os dados'. A oração relativa 'que a empresa divulgou' modifica 'dados'." },
  { id:111, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"Assinale a forma verbal corretamente flexionada:",
    opcoes:["Haviam muitos candidatos inscritos.","Houveram problemas no processo seletivo.","Havia muitos engenheiros disponíveis.","Houveram vagas para a ênfase 16."],
    correta:2, explicacao:"'Haver' no sentido de existir é impessoal — não tem sujeito, fica sempre no singular. 'Havia muitos engenheiros' ✓. 'Haviam', 'Houveram' são formas incorretas nesse contexto." },
  { id:112, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"A figura de linguagem presente em 'O poço bebia avidamente o fluido injetado' é:",
    opcoes:["Hipérbole","Metonímia","Prosopopeia (personificação)","Eufemismo"],
    correta:2, explicacao:"Prosopopeia ou personificação atribui características humanas ou de seres animados a coisas inanimadas. O poço 'beber' é uma ação humana atribuída a um objeto." },
  { id:113, bloco:"III", assunto:"Português", dificuldade:"difícil",
    pergunta:"Em 'Quanto mais produzimos, mais investimos em segurança', a construção expressa:",
    opcoes:["Proporção","Concessão","Oposição","Conclusão"],
    correta:0, explicacao:"A estrutura 'quanto mais... mais...' expressa relação de proporcionalidade. Conforme uma quantidade aumenta, outra também aumenta (ou diminui, se negativo)." },
  { id:114, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"O vocábulo 'outrossim' equivale a:",
    opcoes:["Porém, todavia","Além disso, também","Entretanto, no entanto","Por conseguinte, logo"],
    correta:1, explicacao:"'Outrossim' é advérbio de adição, sinônimo de 'além disso', 'também', 'igualmente'. Muito usado em linguagem jurídica e formal." },
  { id:115, bloco:"III", assunto:"Português", dificuldade:"fácil",
    pergunta:"Qual das palavras abaixo está INCORRETAMENTE acentuada?",
    opcoes:["Petróleo","Espontâneo","Análise","Engenharia"],
    correta:3, explicacao:"'Engenharia' é paroxítona terminada em ditongo crescente (-ia). Paroxítonas terminadas em ditongo crescente não são acentuadas pelas novas regras. As demais: 'petróleo' (proparoxítona), 'espontâneo' (proparoxítona), 'análise' (proparoxítona) — todas acentuadas corretamente." },
  { id:116, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"'A equipe realizou os testes. Os resultados foram publicados.' Qual conector une melhor essas orações mantendo o sentido original?",
    opcoes:["A equipe realizou os testes, mas os resultados foram publicados.","A equipe realizou os testes e os resultados foram publicados.","A equipe realizou os testes porque os resultados foram publicados.","A equipe realizou os testes embora os resultados fossem publicados."],
    correta:1, explicacao:"As duas orações são sequenciais sem oposição ou causalidade. 'E' é o conector de adição que preserva o sentido de sequência temporal e lógica." },
  { id:117, bloco:"III", assunto:"Português", dificuldade:"difícil",
    pergunta:"Indique a opção em que a concordância nominal está CORRETA:",
    opcoes:["Ficou proibido a entrada de visitantes.","É necessário atenção total no processo.","Foram enviados a proposta e o relatório.","É proibida a entrada de visitantes."],
    correta:3, explicacao:"'Proibida' concorda com 'entrada' (feminino singular). Na alternativa A, 'proibido' deveria ser 'proibida'. Em C, com dois sujeitos o verbo vai ao plural: 'foram enviados' está correto, mas 'a proposta e o relatório' exigiria masculino plural." },
  { id:118, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"O prefixo que indica negação ou privação em 'anaeróbio' é:",
    opcoes:["bio-","aero-","an- (forma de a- antes de vogal)","óbio"],
    correta:2, explicacao:"O prefixo grego 'a-' (an- antes de vogal) indica negação/privação. 'Anaeróbio' = sem ar/oxigênio. Outros: 'atípico' (sem tipo), 'assimétrico' (sem simetria)." },
  { id:119, bloco:"III", assunto:"Português", dificuldade:"fácil",
    pergunta:"Na classificação de parágrafos por função, o parágrafo que resume as ideias principais de um texto é chamado de:",
    opcoes:["Parágrafo de introdução","Parágrafo de desenvolvimento","Parágrafo de conclusão","Parágrafo de transição"],
    correta:2, explicacao:"O parágrafo conclusivo retoma as ideias principais, fecha o raciocínio e pode apresentar uma síntese, proposta ou julgamento final sobre o tema." },
  { id:120, bloco:"III", assunto:"Português", dificuldade:"média",
    pergunta:"Assinale a alternativa que apresenta o emprego CORRETO do 'porquê':",
    opcoes:["Não sei porque ele foi reprovado.","O porque da reprovação é a falta de estudo.","Ele foi reprovado por que não estudou.","Qual é o porquê da sua decisão?"],
    correta:3, explicacao:"'Por quê' (separado com acento) ocorre no final de frase ou antes de ponto. 'Porquê' (junto com acento) é substantivo (o motivo). 'Porque' (junto sem acento) é conjunção causal/explicativa. 'Por que' (separado sem acento) é pronome interrogativo ou relativo." },

  // ═══════════════════════════════════════════════════════
  // MAIS QUESTÕES BLOCO II (completando 90)
  // ═══════════════════════════════════════════════════════
  { id:121, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"O que é uma armadilha estratigráfica de petróleo?",
    opcoes:["Uma falha geológica que retém o petróleo","Uma trapação formada por variação lateral de fácies ou discordâncias, sem necessidade de deformação estrutural","Um dobramento anticlinal muito pronunciado","Uma intrusão de sal que empurra as rochas"],
    correta:1, explicacao:"Armadilhas estratigráficas dependem de variações nas propriedades da rocha (porosidade, permeabilidade) ou de discordâncias. São mais difíceis de detectar que as estruturais." },
  { id:122, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O objetivo do teste de formação (DST — Drill Stem Test) é:",
    opcoes:["Medir a temperatura de fundo do poço","Avaliar a capacidade produtiva da formação e coletar dados de pressão e fluido antes da completação","Testar a resistência do revestimento","Medir a velocidade de penetração da broca"],
    correta:1, explicacao:"O DST permite avaliar permeabilidade, pressão estática, dano (skin), fluidos presentes e produtividade potencial antes de decidir pela completação e produção do poço." },
  { id:123, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"A eficiência de varrido volumétrico (Ev) em um projeto de injeção de água é o produto da:",
    opcoes:["Eficiência de deslocamento e eficiência de invasão","Eficiência de varrido areal (Ea) pela eficiência de varrido vertical (Ev) = Ea × Ei","Porosidade pela saturação de óleo residual","Permeabilidade relativa ao óleo pelo fator de recuperação"],
    correta:1, explicacao:"Ev = Ea × Ei, onde Ea é o varrido horizontal (padrão de poços) e Ei é o varrido vertical (estratigrafia). A eficiência volumétrica total multiplica por Ed (deslocamento)." },
  { id:124, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"A unidade de tratamento de gás para remoção de H₂S e CO₂ (gases ácidos) mais comumente utilizada é:",
    opcoes:["Coluna de destilação a vácuo","Unidade de tratamento com aminas (UEA — absorção química)","Separador trifásico","Compressor recíproco"],
    correta:1, explicacao:"Aminas (MEA, DEA, MDEA) absorvem H₂S e CO₂ seletivamente. O gás ácido é removido por adsorção química reversível — a amina é regenerada por aquecimento." },
  { id:125, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"A análise nodal (Nodal Analysis) em engenharia de petróleo permite:",
    opcoes:["Apenas calcular a perda de carga em tubulações","Otimizar o sistema de produção inteiro, determinando o ponto de operação que maximiza a produção","Medir diretamente a pressão do reservatório","Calcular o VOPL do campo"],
    correta:1, explicacao:"A análise nodal divide o sistema em 'inflow' (IPR) e 'outflow' (VLP), encontrando o ponto de equilíbrio. Permite avaliar o efeito de mudanças em qualquer componente do sistema." },
  { id:126, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"fácil",
    pergunta:"A rocha selante (cap rock) em um sistema petrolífero deve ter:",
    opcoes:["Alta porosidade e alta permeabilidade","Baixíssima permeabilidade para impedir a migração dos hidrocarbonetos acumulados","Alta temperatura para deter o gás","Composição exclusivamente granítica"],
    correta:1, explicacao:"Rochas selantes têm permeabilidade < 0,01 mD (nanodarcys). Exemplos: evaporitos (sal, anidrita), folhelhos, carbonatos densos. São essenciais para reter os hidrocarbonetos na armadilha." },
  { id:127, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"difícil",
    pergunta:"O torque e o drag (arraste) em perfuração direcional são causados principalmente por:",
    opcoes:["Temperatura elevada do fluido de perfuração","Atrito entre a coluna de perfuração e as paredes do poço, especialmente em seções curvadas","Alta velocidade de rotação do Kelly","Fluido com alta densidade"],
    correta:1, explicacao:"Em poços direcionais/horizontais, o contato entre a coluna e a parede gera atrito. Torque resiste à rotação; drag resiste ao movimento axial. Lubrificantes e colocação de estabilizadores minimizam esses efeitos." },
  { id:128, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"A técnica de completação em poços produtores do pré-sal brasileiro mais utilizada para o reservatório carbonático fraturado é:",
    opcoes:["Completação com tela e gravel pack","Completação com liner ranhurado em poços horizontais longos","Completação simples com perforações convencionais em casing","Completação com bomba elétrica submersa instalada no fundo"],
    correta:1, explicacao:"Poços horizontais com liners ranhurados ou screened liners permitem drenar extensas áreas do carbonato fraturado do pré-sal, maximizando o contato com o reservatório heterogêneo." },
  { id:129, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"O método de recuperação terciária por injeção de CO₂ miscível funciona porque:",
    opcoes:["O CO₂ reage quimicamente com a rocha, aumentando a permeabilidade","O CO₂ se dissolve no óleo, reduzindo sua viscosidade e tensão interfacial, tornando o deslocamento mais eficiente","O CO₂ esfria o reservatório, reduzindo a mobilidade do gás","O CO₂ aumenta a pressão do reservatório sem interagir com o óleo"],
    correta:1, explicacao:"Na injeção miscível de CO₂, acima da pressão mínima de miscibilidade (MMR), o CO₂ extrai componentes leves do óleo, reduz a viscosidade e a tensão interfacial, aumentando o fator de recuperação." },
  { id:130, bloco:"II", assunto:"Processamento Primário", dificuldade:"difícil",
    pergunta:"O ponto de orvalho do gás natural é a temperatura na qual:",
    opcoes:["O gás começa a se liquefazer completamente","A primeira gota de líquido (condensado) se forma no gás, a uma dada pressão","O metano congela","O gás atinge pressão máxima de operação"],
    correta:1, explicacao:"Ponto de orvalho é a condição (T e P) onde a primeira gota de hidrocarboneto líquido precipita do gás. Abaixo do ponto de orvalho, o gás está na região bifásica (gás + condensado)." },
  { id:131, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"O teorema de Bernoulli generalizado (com perdas) é escrito como:",
    opcoes:["P₁/ρg + V₁²/2g + z₁ = P₂/ρg + V₂²/2g + z₂","P₁/ρg + V₁²/2g + z₁ = P₂/ρg + V₂²/2g + z₂ + hf - hb","P₁/ρg + V₁²/2g + z₁ + hf = P₂/ρg + V₂²/2g + z₂","Somente para fluidos ideais, sem modificações"],
    correta:1, explicacao:"A equação de energia inclui perdas (hf) e adição de energia por bomba (hb): H₁ + hb = H₂ + hf, onde H = P/ρg + V²/2g + z é a carga total." },
  { id:132, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"O vapor d'água superaquecido difere do vapor saturado porque:",
    opcoes:["Tem temperatura abaixo do ponto de ebulição","Tem temperatura acima do ponto de saturação a dada pressão, sendo uma fase única (gás)","Contém gotículas de líquido em suspensão","É mais denso que o vapor saturado"],
    correta:1, explicacao:"Vapor superaquecido (superheated steam) está a temperatura acima da saturação para a pressão dada, sem presença de fase líquida. Possui maior entalpia e é preferido em turbinas a vapor." },
  { id:133, bloco:"I", assunto:"Transferência de Calor", dificuldade:"média",
    pergunta:"O número de Nusselt (Nu) em convecção relaciona:",
    opcoes:["Forças viscosas e inerciais","Transferência de calor convectiva e condutiva: Nu = hL/k","Tempo difusivo e tempo convectivo","Gradiente de velocidade e gradiente de temperatura"],
    correta:1, explicacao:"Nu = hL/k. Quanto maior o Nu, mais eficiente a convecção em relação à condução pura. Correlações como Dittus-Boelter (Nu = 0,023 Re^0,8 Pr^n) são usadas para escoamento turbulento em tubos." },
  { id:134, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"difícil",
    pergunta:"O estado plano de tensões (EPT) é assumido quando:",
    opcoes:["Todas as tensões são iguais em todas as direções","As tensões na direção perpendicular ao plano são nulas (σz = τxz = τyz = 0) — válido para placas finas","Apenas tensões de cisalhamento atuam","A estrutura está em estado de compressão hidrostática"],
    correta:1, explicacao:"EPT é válido para estruturas planas com espessura pequena (chapas, cascas). As tensões σz se anulam na face livre, mas a deformação εz ≠ 0 (Poisson). Contrasta com estado plano de deformação." },
  { id:135, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"O princípio de Pascal afirma que a pressão aplicada a um fluido confinado:",
    opcoes:["Atua apenas no ponto de aplicação","Transmite-se integralmente a todos os pontos do fluido e paredes do recipiente","É absorvida pelo fluido sem se propagar","Atua apenas na direção vertical"],
    correta:1, explicacao:"Lei de Pascal: pressão aplicada a fluido confinado se transmite igualmente em todas as direções. Base dos sistemas hidráulicos: P = F₁/A₁ = F₂/A₂ → multiplicação de força." },
  { id:136, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"Se log₁₀(x) = 2, então x é igual a:",
    opcoes:["20","100","1000","10"],
    correta:1, explicacao:"log₁₀(x) = 2 → x = 10² = 100. Logaritmo é o expoente ao qual a base deve ser elevada para se obter o número." },
  { id:137, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"média",
    pergunta:"Um poço produz 1.000 bbl/dia e tem declínio exponencial de 10% ao mês. A produção após 3 meses é aproximadamente:",
    opcoes:["700 bbl/dia","729 bbl/dia","800 bbl/dia","900 bbl/dia"],
    correta:1, explicacao:"q = q₀ × (1-d)^t = 1000 × (0,9)³ = 1000 × 0,729 = 729 bbl/dia. Declínio exponencial: q = q₀ × e^(-Dt) em forma contínua." },
  { id:138, bloco:"Mat", assunto:"Estatística", dificuldade:"difícil",
    pergunta:"Em um histograma de distribuição normal, aproximadamente que porcentagem dos dados está dentro de ±2 desvios padrão da média?",
    opcoes:["68%","95%","99,7%","50%"],
    correta:1, explicacao:"Regra empírica (68-95-99,7): ±1σ → 68,3%; ±2σ → 95,4%; ±3σ → 99,7%. Fundamental para controle estatístico de processos e análise de incertezas em medições." },
  { id:139, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"A progressão geométrica 3, 6, 12, 24,... tem razão q e o 8º termo vale:",
    opcoes:["192","384","768","256"],
    correta:1, explicacao:"q = 2. a_n = a₁ × q^(n-1). a₈ = 3 × 2^7 = 3 × 128 = 384." },
  { id:140, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"média",
    pergunta:"'Se o campo tiver gás associado, então a produção de GLP aumenta.' O contraditório dessa afirmação é:",
    opcoes:["Se o campo não tiver gás associado, a produção de GLP não aumenta","O campo tem gás associado e a produção de GLP não aumenta","Se a produção de GLP aumentar, o campo tem gás associado","O campo não tem gás e a produção de GLP aumenta"],
    correta:1, explicacao:"A negação de P → Q é P ∧ ¬Q. A contradição de 'Se P então Q' é 'P e não-Q': o campo TEM gás (P=V) mas a produção NÃO aumenta (Q=F)." },

  // ═══════════════════════════════════════════════════════
  // QUESTÕES ADICIONAIS BLOCO II (completando distribuição)
  // ═══════════════════════════════════════════════════════
  { id:141, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"A diferença entre gás associado e gás não associado é:",
    opcoes:["O gás associado tem maior teor de metano","O gás associado ocorre em solução ou em contato com petróleo; o não associado acumula-se independentemente","O não associado é mais úmido","O associado é sempre reinjetado no reservatório"],
    correta:1, explicacao:"Gás associado (solution gas ou gas cap gas) está em contato com óleo. Gás não associado forma reservatórios próprios de gás (dry gas ou gás úmido sem óleo significativo)." },
  { id:142, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O revestimento intermediário (intermediate casing) em um poço é utilizado principalmente para:",
    opcoes:["Isolar o lençol freático","Cobrir zonas problemáticas como folhelhos instáveis, altas pressões anômalas ou zonas de perda de circulação","Produzir petróleo até a superfície","Apenas suportar o peso do revestimento de superfície"],
    correta:1, explicacao:"O revestimento intermediário (ou de proteção) isola problemas geológicos intermediários, permitindo continuar a perfuração com fluido de maior densidade sem fraturar as zonas mais rasas." },
  { id:143, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A simulação numérica de reservatórios é utilizada para:",
    opcoes:["Apenas calcular o VOPL inicial","Prever o comportamento futuro da produção, avaliar estratégias de recuperação e otimizar o desenvolvimento do campo","Medir propriedades petrofísicas in situ","Perfurar poços de forma automatizada"],
    correta:1, explicacao:"Simuladores de reservatório (Eclipse, CMG, Intersect) resolvem equações de fluxo em modelos 3D. Permitem comparar cenários de desenvolvimento, avaliar EOR e prever curvas de produção futuras." },
  { id:144, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"O índice de produtividade (IP ou J) de um poço é definido como:",
    opcoes:["A pressão do reservatório dividida pela vazão","A vazão de produção dividida pela diferença entre a pressão do reservatório e a pressão de fundo fluxente (drawdown)","A razão entre permeabilidade e viscosidade","O produto de WI pela mobilidade"],
    correta:1, explicacao:"IP = q/ΔP = q/(Pr - Pwf) [bbl/d/psi ou m³/d/bar]. Alto IP: poço muito produtivo; baixo IP: poço com dano ou baixa permeabilidade. Estimulação melhora o IP." },
  { id:145, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"O ROV (Remotely Operated Vehicle) em operações submarinas é utilizado para:",
    opcoes:["Perfurar poços em águas profundas","Realizar inspeção, manutenção e intervenção em equipamentos submarinos sem mergulhadores humanos","Escoar o óleo produzido até a plataforma","Medir pressão sísmica no fundo do mar"],
    correta:1, explicacao:"ROVs são veículos controlados remotamente equipados com câmeras, manipuladores e ferramentas. Realizam intervenções em árvores de natal, umbilicais e manifolds sem risco para humanos." },
  { id:146, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O número de cetano do diesel e o número de octano da gasolina medem respectivamente:",
    opcoes:["Densidade e viscosidade","Resistência à detonação espontânea (autodetonação) e resistência à detonação por faísca","Poder calorífico e volatilidade","Teor de enxofre e teor de aromáticos"],
    correta:1, explicacao:"Cetano alto = diesel ignita facilmente (bom para motor diesel de compressão). Octano alto = gasolina resiste à detonação precoce (bom para motor Otto de ignição por faísca)." },
  { id:147, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"difícil",
    pergunta:"A pressão de sobrepressão (overpressure) em um reservatório ocorre quando:",
    opcoes:["A pressão do reservatório é igual ao gradiente hidrostático normal","A pressão do fluido nos poros excede a pressão esperada para a profundidade (acima do gradiente hidrostático normal)","A pressão é menor que o gradiente hidrostático (sub-pressão)","A temperatura é anormalmente alta"],
    correta:1, explicacao:"Overpressure pode ser causado por compactação insuficiente, transferência de pressão lateral, geração de gás, ou diagênese. É um risco de segurança crítico na perfuração (kick/blowout)." },
  { id:148, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O método de medição enquanto perfura (MWD — Measurement While Drilling) permite:",
    opcoes:["Apenas medir a temperatura de fundo","Obter dados de inclinação, azimute e parâmetros de formação em tempo real durante a perfuração, sem retirar a coluna","Medir a vazão de superfície","Avaliar a resistência do cimento após a cimentação"],
    correta:1, explicacao:"MWD transmite dados direcionais por pulso de lama (mud pulse telemetry) em tempo real. LWD (Logging While Drilling) adiciona dados petrofísicos como resistividade, porosidade e densidade." },
  { id:149, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A compressibilidade de um fluido de reservatório influencia:",
    opcoes:["Apenas a viscosidade do fluido","O volume do fluido em resposta a mudanças de pressão — relevante para o drive por expansão do fluido e compactação do reservatório","A permeabilidade da rocha","A temperatura de fundo do poço"],
    correta:1, explicacao:"cf = -(1/V)(dV/dP). A compressibilidade do óleo, gás, água e da rocha determinam quanto fluido é expulso por unidade de queda de pressão — fundamental para balanço de materiais." },
  { id:150, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"difícil",
    pergunta:"O conceito de 'all-electric subsea' em sistemas submarinos visa substituir:",
    opcoes:["Os risers de produção por umbilicais","As linhas hidráulicas dos umbilicais por cabos elétricos, simplificando o sistema e aumentando o alcance operacional","Os separadores submarinos por separadores de superfície","As ANMs por válvulas mecânicas simples"],
    correta:1, explicacao:"Sistemas all-electric usam atuadores elétricos nas válvulas submarinas, eliminando o fluido hidráulico. Permitem controle mais preciso, maior distância (500+ km), menor umbilical e resposta mais rápida." },
  { id:151, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"difícil",
    pergunta:"O número de Froude (Fr) é relevante em:",
    opcoes:["Escoamento compressível em bocais","Escoamento com superfície livre onde as forças gravitacionais são importantes (canais, barramentos)","Transferência de calor em trocadores","Escoamento viscoso em capilares"],
    correta:1, explicacao:"Fr = V/√(gL). Fr < 1: subcrítico (controle downstream); Fr > 1: supercrítico (controle upstream). Analogia hidráulica com Ma para compressível." },
  { id:152, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"A eficiência isentrópica de um compressor é definida como:",
    opcoes:["Trabalho real / trabalho isentrópico ideal (η_s = w_s/w_real)","Trabalho isentrópico ideal / trabalho real consumido (η_s = w_s/w_real)","Calor rejeitado / trabalho fornecido","Entalpia de saída / entalpia de entrada"],
    correta:1, explicacao:"Para compressor, η_isen = w_isentrópico/w_real = (h₂s - h₁)/(h₂ - h₁) < 1. Um compressor real consome mais trabalho que o ideal por irreversibilidades internas." },
  { id:153, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"média",
    pergunta:"O fator de concentração de tensão (Kt) em geometrias com entalhes e furos indica que:",
    opcoes:["A tensão é uniforme em toda a seção","A tensão máxima local é Kt vezes maior que a tensão nominal calculada pela resistência dos materiais clássica","O material tem resistência reduzida pelo entalhe","A deformação é zero no ponto de concentração"],
    correta:1, explicacao:"σ_max = Kt × σ_nominal. Entalhes, furos e mudanças bruscas de seção concentram tensões. Kt é determinado experimentalmente ou por elementos finitos. Crítico para projeto de fadiga." },
  { id:154, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"Em um orifício de medição de vazão (placa de orifício), a queda de pressão medida é proporcional a:",
    opcoes:["V (velocidade)","V² (quadrado da velocidade)","V^0,5","1/V"],
    correta:1, explicacao:"Pela equação de Bernoulli: ΔP = ρV²/2 (pressão dinâmica). Portanto Q ∝ √ΔP. Placa de orifício, Venturi e pitot exploram esse princípio para medir vazão/velocidade." },
  { id:155, bloco:"I", assunto:"Transferência de Calor", dificuldade:"difícil",
    pergunta:"O número de Biot (Bi) em transferência de calor transitória indica:",
    opcoes:["A razão entre condução interna e convecção na superfície: Bi = hL/k_sólido","A taxa de irradiação relativa à convecção","O tempo de resposta de um termômetro","A eficiência de uma aleta"],
    correta:0, explicacao:"Bi = hL/k. Se Bi < 0,1: resistência interna desprezível (método da capacitância global válido). Se Bi >> 1: resistência interna domina e o gradiente interno é significativo." },
  { id:156, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"O querogênio tipo II, predominante em folhelhos marinhos, gera principalmente:",
    opcoes:["Gás seco (metano)","Óleo e gás de alto peso molecular","Carvão","Apenas água e CO₂"],
    correta:1, explicacao:"Tipo I (lacustre, algas): óleo waxy. Tipo II (marinho): óleo e gás condensado. Tipo III (terrígeno, madeira): gás seco. A composição do querogênio determina o produto gerado." },
  { id:157, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"fácil",
    pergunta:"O 'packer' em um poço produtor serve para:",
    opcoes:["Aumentar a pressão do reservatório","Isolar o espaço anular entre o tubing e o casing, forçando o fluido a fluir pelo tubing","Medir a temperatura de fundo","Perfurar a formação durante a completação"],
    correta:1, explicacao:"O packer sela o espaço anular, impedindo que fluidos de formação ou injetados entrem diretamente no annulo. Protege o revestimento e direciona o fluxo pelo tubing de produção." },
  { id:158, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"A operação de 'workover' em um poço produtor consiste em:",
    opcoes:["Perfurar um novo poço ao lado do existente","Realizar intervenções no poço para restaurar ou aumentar a produção: limpeza, substituição de equipamentos, reperforação","Injetar água no reservatório para aumento de pressão","Apenas medir a pressão estática do reservatório"],
    correta:1, explicacao:"Workover envolve intervenções com sonda em poços completados: substituição de bomba, mudança de intervalo produtor, acidificação, fratura hidráulica, entre outros." },
  { id:159, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"A corrente de turbidez é importante para a geologia do pré-sal porque:",
    opcoes:["Gera campos magnéticos que alteram as rochas","É o principal mecanismo de transporte e deposição dos carbonatos lacustres do pré-sal","Destrói armadilhas estruturais","Forma camadas de sal evaporítico"],
    correta:1, explicacao:"Correntes de turbidez são fluxos gravitacionais de sedimentos em suspensão. Na Bacia de Santos, turbiditos e carbonatos lacustres formam os principais reservatórios do pré-sal." },
  { id:160, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O ponto de fluidez (pour point) do petróleo é importante para:",
    opcoes:["Calcular a energia de ativação da craqueamento","Determinar a temperatura mínima de bombeamento e transporte, pois abaixo dela o óleo perde fluidez por cristalização de parafinas","Avaliar o teor de enxofre","Medir a viscosidade dinâmica a alta temperatura"],
    correta:1, explicacao:"Abaixo do pour point, as parafinas cristalizam e o óleo não flui. Crítico para projeto de oleodutos em regiões frias e para operação em águas profundas com baixa temperatura ambiental." },
  { id:161, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"O vapor de água no estado de qualidade x = 0,8 está:",
    opcoes:["Completamente vaporizado (vapor superaquecido)","Na região bifásica com 80% de vapor e 20% de líquido (em massa)","Com temperatura abaixo de 0°C","Totalmente líquido (líquido comprimido)"],
    correta:1, explicacao:"Qualidade x = mg/(mg + mf). x = 0: líquido saturado; x = 1: vapor saturado; 0 < x < 1: mistura bifásica. x = 0,8 → 80% vapor em massa." },
  { id:162, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"fácil",
    pergunta:"A pressão hidrostática a uma profundidade h em um fluido de densidade ρ é:",
    opcoes:["P = ρh","P = ρgh","P = ρg/h","P = g/ρh"],
    correta:1, explicacao:"P = ρgh (em Pa). Para lama de perfuração: P(kPa) = ρ(kg/m³) × 9,81 × h(m) / 1000. É a base do controle de pressão de poços." },
  { id:163, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"média",
    pergunta:"A condição de projeto mais conservadora para vasos de pressão cilíndricos de parede fina é dada pela tensão:",
    opcoes:["Tensão longitudinal: σ_L = Pr/(2t)","Tensão circunferencial (hoop stress): σ_θ = Pr/t — é o dobro da longitudinal","Tensão radial na superfície interna","Tensão de cisalhamento puro"],
    correta:1, explicacao:"Para vaso cilíndrico de parede fina: σ_θ = Pr/t (circunferencial) e σ_L = Pr/2t (longitudinal). A σ_θ é sempre o dobro de σ_L, portanto é a tensão crítica de projeto." },
  { id:164, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"A prospectividade de uma bacia sedimentar para petróleo depende de:",
    opcoes:["Apenas da profundidade da bacia","Da existência de todos os elementos do sistema petrolífero: rocha geradora, reservatório, selante, armadilha e timing correto","Da proximidade com o oceano","Da ausência de domos de sal"],
    correta:1, explicacao:"Sistema petrolífero funcional requer todos os elementos: (1) geradora matura, (2) reservatório poroso e permeável, (3) selante eficiente, (4) armadilha formada antes ou durante a migração." },
  { id:165, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O diagrama de lamas ('mud log') durante a perfuração registra:",
    opcoes:["Apenas a temperatura de fundo","Dados de perfuração como taxa de penetração, descrição litológica dos cascalhos, teor de gás e parâmetros de lama em função da profundidade","Apenas a resistividade da formação","A geometria do poço (inclinação e azimute)"],
    correta:1, explicacao:"O mud log é o registro de superfície básico: litologia (cascalho amostrado), ROP, gás total e cromatografia de gás, parâmetros de lama, torque e arraste. É a primeira avaliação da formação." },
  { id:166, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"O método de balanço de materiais (Material Balance Equation - MBE) de Havlena e Odeh permite:",
    opcoes:["Calcular apenas a pressão atual do reservatório","Determinar o VOPL, identificar o mecanismo de produção dominante e prever o comportamento do reservatório sem simulação numérica completa","Medir a permeabilidade in situ","Calcular o fator de recuperação futuro com precisão absoluta"],
    correta:1, explicacao:"A MBE (equação de Tank de zero dimensão) iguala expansão dos fluidos à produção acumulada. O plot de Havlena-Odeh (F vs Eo+mEg+Ef,w) lineariza os dados para identificar o mecanismo." },
  { id:167, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"A operação de 'cleanout' em um poço é realizada quando:",
    opcoes:["A bomba submersível queima","Sedimentos, areias ou parafinas acumulam-se no fundo do poço, prejudicando ou impedindo a produção","O gás associado aumenta abruptamente","A pressão do reservatório cai abaixo do ponto de bolha"],
    correta:1, explicacao:"O cleanout remove obstruções do fundo do poço usando circulação de fluido com coiled tubing ou wireline. Restore a produtividade do poço." },
  { id:168, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"A técnica de 'daisy-chain' em sistemas submarinos de produção consiste em:",
    opcoes:["Instalar várias ANMs em série usando uma única linha de fluxo principal","Conectar todos os poços diretamente à plataforma com linhas individuais","Usar um único poço para drenar todo o reservatório","Alternar produção entre poços para evitar depleção local"],
    correta:0, explicacao:"Em daisy-chain, os poços são conectados sequencialmente: poço 1 → poço 2 → ... → manifold/FPSO. Reduz o número de linhas submarinas, mas compromete a flexibilidade operacional." },
  { id:169, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O objetivo da estabilização de condensado no processamento de gás é:",
    opcoes:["Aumentar a pressão de vapor do condensado","Reduzir o RVP (Reid Vapor Pressure) do condensado removendo os componentes mais leves, tornando-o seguro para armazenamento e transporte","Aumentar o teor de C5+ no gás","Remover o H₂S do condensado"],
    correta:1, explicacao:"A estabilização remove C1-C4 dissolvidos no condensado. Um RVP alto indica excesso de componentes leves que vaporizam facilmente — risco de ignição e perda de produto durante armazenamento." },
  { id:170, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"fácil",
    pergunta:"O petróleo pesado (°API < 22) difere do óleo leve principalmente por:",
    opcoes:["Menor teor de resinas e asfaltenos","Maior viscosidade, maior densidade e maior teor de compostos pesados (asfaltenos, metais, enxofre)","Maior facilidade de refino","Menor custo de produção em qualquer condição"],
    correta:1, explicacao:"Óleos pesados têm alta viscosidade, baixo °API, alto BSW e requerem técnicas especiais de produção (vapor, SAGD, diluente). Têm menor valor de mercado e maior custo de processamento." },
  { id:171, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"A força de arrasto (drag) em um objeto imerso em escoamento é reduzida principalmente quando:",
    opcoes:["Aumenta-se a velocidade do escoamento","O objeto tem forma aerodinâmica (streamlined), reduzindo a separação da camada limite e a esteira turbulenta","Aumenta-se a viscosidade do fluido","Diminui-se o tamanho do objeto apenas"],
    correta:1, explicacao:"Formas aerodinâmicas (gotas, aerofólios) minimizam o coeficiente de arrasto (Cd) ao retardar a separação da camada limite. Isso é crítico para o design de risers e estruturas offshore." },
  { id:172, bloco:"I", assunto:"Termodinâmica", dificuldade:"fácil",
    pergunta:"A potência consumida por um compressor que eleva a pressão de um gás ideal de P₁ a P₂ com vazão mássica ṁ é calculada por:",
    opcoes:["Ẇ = ṁ(h₂ - h₁) apenas em processos isobáricos","Ẇ = ṁ(h₂ - h₁) — variação de entalpia em regime permanente adiabático","Ẇ = ṁc_v(T₂ - T₁)","Ẇ = ṁ(u₂ - u₁)"],
    correta:1, explicacao:"Para volume de controle em regime permanente adiabático: Ẇ = ṁ(h₂ - h₁). A entalpia inclui energia interna e trabalho de fluxo (PV), sendo a grandeza correta para equipamentos abertos." },
  { id:173, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"média",
    pergunta:"A vida em fadiga de um componente metálico é aumentada por:",
    opcoes:["Aumentar a concentração de tensão (entalhes profundos)","Polimento superficial, tratamentos de compressão superficial (shot peening) e redução de Kt","Aumentar a temperatura de operação","Aplicar carga cíclica de maior amplitude"],
    correta:1, explicacao:"Fadiga inicia-se em superfícies. Polimento remove defeitos, shot peening introduz tensões residuais de compressão que retardam propagação de trincas. Reduzir Kt aumenta σ_max que o componente suporta." },
  { id:174, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"difícil",
    pergunta:"A análise dimensional pelo Teorema de Buckingham Pi indica que um problema com n variáveis e k dimensões fundamentais tem:",
    opcoes:["n grupos adimensionais","n - k grupos adimensionais independentes","k grupos adimensionais","n + k grupos"],
    correta:1, explicacao:"Teorema Pi: número de grupos adimensionais = n - k. Ex: Número de Reynolds envolve 4 variáveis (ρ, V, D, μ) e 3 dimensões (M, L, T) → 4-3 = 1 grupo: Re = ρVD/μ." },
  { id:175, bloco:"I", assunto:"Transferência de Calor", dificuldade:"média",
    pergunta:"A taxa de transferência de calor por radiação entre dois corpos negros a temperaturas T₁ e T₂ é proporcional a:",
    opcoes:["(T₁ - T₂)","(T₁² - T₂²)","(T₁⁴ - T₂⁴)","(T₁ + T₂)⁴"],
    correta:2, explicacao:"Lei de Stefan-Boltzmann: q = εσA(T₁⁴ - T₂⁴). A dependência T⁴ torna a radiação dominante em altas temperaturas. σ = 5,67×10⁻⁸ W/m²K⁴." },

  // ═══════════════════════════════════════════════════════
  // QUESTÕES FINAIS (completando 200)
  // ═══════════════════════════════════════════════════════
  { id:176, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"A sísmica 4D (4D seismic) em campos produtores monitora:",
    opcoes:["A composição química do óleo ao longo do tempo","Variações nas propriedades elásticas das rochas causadas por produção/injeção, mapeando movimentos de fluidos no reservatório","A temperatura do fundo do mar","A integridade dos equipamentos submarinos"],
    correta:1, explicacao:"Repetindo levantamentos sísmicos 3D no mesmo local em diferentes épocas (tempo = 4ª dimensão), é possível observar como os fluidos se movem no reservatório, otimizando a produção e injeção." },
  { id:177, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O fluido de perfuração sintético (SBM — Synthetic Based Mud) é preferido em relação ao OBM (Oil Based Mud) em operações offshore porque:",
    opcoes:["É mais barato em todos os casos","Tem melhor desempenho em altas temperaturas e é menos tóxico para o ambiente marinho, facilitando o descarte dos cascalhos","É menos viscoso e fácil de misturar","Não requer controle de densidade"],
    correta:1, explicacao:"SBM usa base sintética (ésteres, olefinas lineares) com menor toxicidade que óleo mineral/diesel. Permite melhor desempenho em poços profundos e maior tolerância ambiental para descarte de cascalho." },
  { id:178, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"A razão de mobilidade (M) em um projeto de injeção de água é definida como λ_água/λ_óleo. Uma injeção estável (frente de deslocamento uniforme) requer:",
    opcoes:["M > 10","M > 1","M ≤ 1","M = 0"],
    correta:2, explicacao:"M = (k_rw/μ_w)/(k_ro/μ_o). M ≤ 1: água menos móvel que óleo — deslocamento pistão estável. M > 1: água mais móvel — fingering viscoso reduz eficiência. Polímeros são usados para reduzir M." },
  { id:179, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"A Petrobras exporta petróleo com especificação de conteúdo de sal máximo de:",
    opcoes:["100 PTB (pounds per thousand barrels)","50 PTB","10 PTB ou menos, conforme contrato","500 PTB"],
    correta:2, explicacao:"A especificação típica de sal para exportação é ≤ 57 PTB (ASTM), mas a Petrobras e muitas refinarias exigem ≤ 10 PTB. O dessalgador é dimensionado para atingir essa especificação." },
  { id:180, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"fácil",
    pergunta:"A produção artificial por bombeio mecânico (BM) — bomba de hastes — é mais indicada para:",
    opcoes:["Poços de alta produção offshore","Poços terrestres com moderada a baixa produção, especialmente de óleo pesado ou com alta RGO","Todos os poços submarine","Poços verticais com alta pressão de reservatório"],
    correta:1, explicacao:"BM (sucker rod pump) é o método de elevação artificial mais usado no mundo — simples, robusto, baixo custo de manutenção. Limitado em profundidade, produção e inclinação do poço." },
  { id:181, bloco:"Mat", assunto:"Matemática Financeira", dificuldade:"média",
    pergunta:"O Valor Presente Líquido (VPL) de um projeto é calculado trazendo todos os fluxos de caixa ao presente. Um projeto é economicamente viável quando:",
    opcoes:["VPL < 0","VPL = 0 apenas","VPL > 0","VPL > TIR"],
    correta:2, explicacao:"VPL > 0: o projeto gera valor acima do custo de capital (taxa de desconto). VPL = 0: retorna exatamente a taxa exigida. VPL < 0: destrói valor — não investir." },
  { id:182, bloco:"Mat", assunto:"Estatística", dificuldade:"média",
    pergunta:"Em análise de risco de reservatórios, o método Monte Carlo é utilizado para:",
    opcoes:["Calcular o VOPL determinístico","Gerar distribuições probabilísticas de VOPL e produção, considerando incertezas nas variáveis petrofísicas","Medir permeabilidade in situ","Interpretar perfis de poço"],
    correta:1, explicacao:"Monte Carlo sorteia aleatoriamente valores de porosidade, Sw, espessura, área e Bo dentro de suas incertezas, gerando milhares de casos para construir a distribuição P10-P50-P90 do VOPL." },
  { id:183, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"difícil",
    pergunta:"Em um grupo de 20 engenheiros, 12 sabem Python, 10 sabem MATLAB e 5 sabem ambos. Quantos sabem pelo menos uma das linguagens?",
    opcoes:["22","17","15","27"],
    correta:1, explicacao:"|P ∪ M| = |P| + |M| - |P ∩ M| = 12 + 10 - 5 = 17. Princípio da inclusão-exclusão evita contar duas vezes os que sabem ambos." },
  { id:184, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"A equação quadrática x² - 5x + 6 = 0 tem raízes:",
    opcoes:["x = 1 e x = 6","x = 2 e x = 3","x = -2 e x = -3","x = 1 e x = -6"],
    correta:1, explicacao:"Fatorando: (x-2)(x-3) = 0 → x = 2 ou x = 3. Verificando: 4-10+6=0 ✓ e 9-15+6=0 ✓. Soma das raízes = 5 (coef. b com sinal trocado); produto = 6 (coef. c)." },
  { id:185, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"A tensão superficial (σ_s) causa o fenômeno de:",
    opcoes:["Turbulência em altos Reynolds","Capilaridade — fluidos sobem ou descem em tubos capilares contra a ação da gravidade","Compressibilidade do líquido","Viscosidade não-newtoniana"],
    correta:1, explicacao:"A tensão superficial é a força por unidade de comprimento na interface líquido-gás. Capilaridade: h = 2σ_s cosθ/(ρgr). Fundamental para fluxo em meios porosos e formação de emulsões." },
  { id:186, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"Em análise de perfis geofísicos, o perfil de resistividade (ILD/ILM) é utilizado para:",
    opcoes:["Medir a porosidade total da rocha","Distinguir zonas com hidrocarbonetos (alta resistividade) de zonas aquíferas (baixa resistividade)","Calcular a temperatura de formação","Identificar a composição mineralógica da rocha"],
    correta:1, explicacao:"Água salgada conduz eletricidade (baixa resistividade); óleo e gás são isolantes (alta resistividade). A resistividade combinada com porosidade permite calcular a saturação de água (Sw) pela equação de Archie." },
  { id:187, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O fenômeno de 'lost circulation' (perda de circulação) na perfuração ocorre quando:",
    opcoes:["O fluido de perfuração é muito viscoso","A pressão hidrostática da lama fratura a formação ou encontra zonas muito permeáveis, fazendo o fluido entrar na rocha sem retornar","A broca perde contato com a formação","O gás de formação dissolve a lama"],
    correta:1, explicacao:"Perda de circulação desperdiça fluido caro e pode desestabilizar o poço. Combatida com LCM (Lost Circulation Materials), redução de densidade da lama ou cimentação." },
  { id:188, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A saturação de óleo residual (Sor) é importante no projeto de EOR porque:",
    opcoes:["Define a permeabilidade absoluta do reservatório","É o óleo que permanece no reservatório após varredura convencional por água — o alvo dos métodos terciários","Determina a pressão máxima do reservatório","Define o tipo de armadilha estrutural"],
    correta:1, explicacao:"Sor tipicamente 20-40% do VOPL. É o óleo 'travado' por forças capilares após waterflood. EOR (surfactantes, polímeros, CO₂ miscível) visa mobilizar esse óleo residual, aumentando o fator de recuperação." },
  { id:189, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"O teste de pressão hidrostática de linhas e equipamentos submarinos é realizado com pressão equivalente a:",
    opcoes:["50% da pressão de operação máxima","100% da pressão de trabalho","1,5 vezes a pressão máxima de operação (MAOP), geralmente","0,5 vezes a pressão de ruptura"],
    correta:2, explicacao:"Testes hidrostáticos tipicamente usam 1,25 a 1,5 × MAOP para verificar integridade sem atingir pressão de ruptura. Normas como ASME B31.3 e API 6A especificam os requisitos." },
  { id:190, bloco:"II", assunto:"Processamento Primário", dificuldade:"difícil",
    pergunta:"A equação de estado de Peng-Robinson é utilizada no processamento de petróleo para:",
    opcoes:["Calcular a resistência mecânica de vasos de pressão","Prever propriedades termodinâmicas de misturas de hidrocarbonetos (pressão de vapor, composição de fases, densidade)","Determinar a permeabilidade de reservatórios","Calcular o torque em compressores centrífugos"],
    correta:1, explicacao:"A EoS de Peng-Robinson (1976) é amplamente usada em simuladores de processo (HYSYS, ProMax) para calcular equilíbrio de fases, entalpia e outras propriedades de misturas de HC — fundamental para projeto de separadores e plantas de processamento." },
  { id:191, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"O coeficiente de descarga (Cd) de um bocal ou orifício é sempre menor que 1 porque:",
    opcoes:["O fluido comprime ao passar pelo orifício","A vena contracta (seção de menor área) é menor que a área geométrica do orifício e há perdas de energia","O fluido acelera além da velocidade teórica de Bernoulli","A temperatura cai ao atravessar o orifício"],
    correta:1, explicacao:"Cd = Q_real/Q_teórico < 1. A vena contracta tem área efetiva < área do orifício (coeficiente de contração Cc). Combinando Cc e Cv (coef. de velocidade): Cd = Cc × Cv ≈ 0,6-0,98." },
  { id:192, bloco:"I", assunto:"Termodinâmica", dificuldade:"difícil",
    pergunta:"A disponibilidade (exergia) de uma corrente de fluido representa:",
    opcoes:["A energia total do fluido (cinética + potencial + interna)","O máximo trabalho útil que pode ser obtido ao trazer o estado do fluido até o equilíbrio com o ambiente (estado morto)","A entalpia total do fluido","A entropia máxima que pode ser gerada"],
    correta:1, explicacao:"Exergia = máximo trabalho reversível. Quantifica a 'qualidade' da energia — energia a alta temperatura tem maior exergia que a mesma quantidade a baixa temperatura. Análise exergética identifica irreversibilidades em processos." },
  { id:193, bloco:"Mat", assunto:"Raciocínio Lógico", dificuldade:"média",
    pergunta:"Uma plataforma produz 50.000 bbl/dia de óleo e 200.000 bbl/dia de fluido total. Qual é o BSW?",
    opcoes:["25%","50%","75%","40%"],
    correta:2, explicacao:"BSW = (fluido total - óleo) / fluido total = (200.000 - 50.000) / 200.000 = 150.000/200.000 = 75%." },
  { id:194, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"A dolomitização de calcários é favorável para reservatórios porque:",
    opcoes:["Reduz a porosidade pela precipitação de calcita","Frequentemente aumenta a porosidade e permeabilidade pela substituição de Ca por Mg com redução de volume da rocha","Sela a rocha impedindo fluxo de fluidos","Dissolve completamente a rocha"],
    correta:1, explicacao:"Dolomita tem volume molar menor que calcita. A substituição Ca→Mg cria espaço (porosidade intercrístalina). Dolomitos podem ter porosidade 5-20%, sendo excelentes reservatórios (ex: campos do Oriente Médio)." },
  { id:195, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"fácil",
    pergunta:"A profundidade vertical verdadeira (TVD) de um poço diferirá da profundidade medida (MD) quando:",
    opcoes:["O poço for perfeitamente vertical","O poço for direcional ou horizontal (qualquer desvio da vertical cria diferença entre MD e TVD)","A broca for do tipo PDC","O revestimento for cimentado"],
    correta:1, explicacao:"MD é o comprimento real da trajetória do poço. TVD é a componente vertical. Em poços verticais, MD = TVD. Em horizontais, MD >> TVD na seção horizontal, pois se avança horizontalmente sem ganho de profundidade." },
  { id:196, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"O log de densidade (RHOB) em perfilagem de poços é utilizado principalmente para:",
    opcoes:["Medir a resistividade da formação","Calcular a porosidade da rocha e identificar a densidade do fluido nos poros","Determinar a saturação de gás diretamente","Medir a pressão de formação in situ"],
    correta:1, explicacao:"ρ_log = ρ_matrix(1-φ) + ρ_fluido × φ. Conhecendo a densidade da matriz e do fluido, calcula-se φ. Combinado com Neutron log, distingue gás (efeito cruzado neutron-densidade) de óleo/água." },
  { id:197, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"O método CHOKE (choke performance) para controle de vazão em poços produtores funciona porque:",
    opcoes:["O choke aquece o fluido aumentando sua viscosidade","A restrição ao fluxo cria queda de pressão controlada, limitando a vazão sem necessitar de válvulas complexas","O choke filtra sólidos do fluido produzido","O choke aumenta a pressão de fundo do poço"],
    correta:1, explicacao:"Chokes são orifícios de diâmetro variável (ajustável) ou fixo que criam queda de pressão controlada. Permitem regular a vazão do poço e são a primeira linha de controle de produção na árvore de natal." },
  { id:198, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"difícil",
    pergunta:"O sistema de detecção de vazamento de oleodutos submarinos baseado em PIG instrumentado realiza:",
    opcoes:["Apenas limpeza mecânica da linha","Inspeção em linha (ILI) mapeando com sensores de fluxo magnético ou ultrassom a espessura da parede e anomalias que indicam corrosão ou defeitos","Medição de pressão apenas nos extremos do duto","Análise química do fluido transportado"],
    correta:1, explicacao:"PIGs inteligentes percorrem o interior da tubulação equipados com sensores (MFL — Magnetic Flux Leakage, UT — Ultrassom) que mapeiam variações de espessura, indicando corrosão interna/externa e defeitos." },
  { id:199, bloco:"Mat", assunto:"Matemática", dificuldade:"média",
    pergunta:"A taxa de declínio hiperbólico de um poço de petróleo é descrita por q = q₀/(1+bD_i×t)^(1/b). Para b=0, essa equação se reduz ao declínio:",
    opcoes:["Linear","Exponencial q = q₀e^(-D_i×t)","Harmônico","Polinomial"],
    correta:1, explicacao:"Quando b→0, q_hiperbólico → q_exponencial = q₀e^(-Dt). Para b=1: harmônico. 0 < b < 1: hiperbólico. O declínio exponencial (b=0) é o mais conservador e o mais usado para análise de reservatórios." },
  { id:200, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O processo de separação criogênica do gás natural (NGL recovery) opera a temperaturas muito baixas para:",
    opcoes:["Remover apenas o H₂S","Liquefazer e recuperar os hidrocarbonetos pesados (etano, propano, butano, gasolina natural) que têm maior valor comercial que o metano como combustível","Aumentar a pressão do gás para exportação","Converter metano em hidrogênio"],
    correta:1, explicacao:"A separação criogênica (turboexpansores atingindo -100°C a -150°C) liquefaz C2+ enquanto o metano permanece gasoso. Os NGLs recuperados (etano, GLP, gasolina natural) têm alto valor petroquímico e de mercado." },

  // ═══════════════════════════════════════════════════════
  // PROVAS REAIS — Cesgranrio · Eng. de Petróleo Júnior
  // ═══════════════════════════════════════════════════════

  // ── 2018 ─────────────────────────────────────────────
  { id:201, fonte:"prova_real", ano:2018, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"Uma tubulação horizontal de diâmetro interno D transporta óleo com vazão volumétrica Q. Para calcular a perda de carga distribuída, o número de Reynolds Re = ρVD/μ depende de:",
    opcoes:["Apenas da vazão e do diâmetro","Da densidade, velocidade média, diâmetro interno e viscosidade dinâmica do fluido","Apenas da viscosidade cinemática e da temperatura","Da rugosidade relativa da tubulação e da pressão de vapor"],
    correta:1, explicacao:"Re = ρVD/μ = VD/ν. Os quatro parâmetros — densidade ρ (ou viscosidade cinemática ν), velocidade V, diâmetro D e viscosidade dinâmica μ — são necessários para determinar o regime de escoamento (laminar Re<2300, turbulento Re>4000)." },

  { id:202, fonte:"prova_real", ano:2018, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"Em um separador trifásico (gás-óleo-água), a redução de pressão ao longo dos estágios de separação tem como objetivo principal:",
    opcoes:["Aumentar a temperatura do sistema para reduzir a viscosidade do óleo","Liberar progressivamente o gás dissolvido no óleo e promover a separação das fases por diferença de densidade","Aumentar a viscosidade do óleo para facilitar a decantação da água","Reduzir o volume de água produzida por dissolução"],
    correta:1, explicacao:"A separação em múltiplos estágios de pressão decrescente libera gás dissolvido gradualmente (flash controlado), otimizando a recuperação de óleo e a qualidade do gás. A separação de fases ocorre por diferença de densidade (gás < óleo < água)." },

  { id:203, fonte:"prova_real", ano:2018, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"O parâmetro 'skin' (S) em um poço produtor é positivo quando:",
    opcoes:["O poço foi estimulado por fraturamento hidráulico, aumentando a produtividade","Há dano de formação ao redor do poço (ex: invasão de filtrado, finos) que reduz a permeabilidade efetiva próxima ao poço","A pressão de reservatório é superior à pressão de bolha do óleo","O poço opera em regime estacionário e a pressão é estável"],
    correta:1, explicacao:"Skin S > 0: dano de formação (reduz produtividade). S < 0: estimulação (fratura, acidificação, que aumentam produtividade). S = 0: sem dano. A queda de pressão adicional por skin é ΔPskin = 141,2qμB/(kh) × S." },

  { id:204, fonte:"prova_real", ano:2018, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"difícil",
    pergunta:"O perfil sônico (Sonic Log) mede o tempo de trânsito Δt de ondas compressivas na formação. Segundo a equação de Wyllie (Δt = φ·Δtf + (1-φ)·Δtma), valores elevados de Δt indicam:",
    opcoes:["Formação densa com baixa porosidade e matriz carbonática","Alta porosidade ou fluido com maior compressibilidade nos poros (ex: gás tem maior Δt que óleo)","Presença exclusiva de água salgada com alta salinidade","Baixa temperatura de formação e rocha muito rígida"],
    correta:1, explicacao:"Maior Δt → mais tempo para a onda atravessar → maior porosidade ou fluido compressível. O efeito cruzado neutron-densidade (neutron alto, densidade baixa) e o Δt elevado identificam gás. Δtf(água) ≈ 189 μs/ft; Δtf(gás) > 300 μs/ft." },

  { id:205, fonte:"prova_real", ano:2018, bloco:"I", assunto:"Resistência dos Materiais", dificuldade:"difícil",
    pergunta:"Para verificar a resistência de um revestimento de poço sujeito a tensões biaxiais σ1 e σ2, o critério de von Mises estabelece que a ruptura não ocorre quando:",
    opcoes:["σ_VM = √(σ1² + σ1σ2 + σ2²) ≤ σ_y","σ_VM = √(σ1² - σ1σ2 + σ2²) ≤ σ_y","σ_VM = (σ1 + σ2)/2 ≤ σ_y","σ_VM = σ1 × σ2 ≤ σ_y"],
    correta:1, explicacao:"Critério de von Mises (energia de distorção): σ_VM = √(σ1² - σ1σ2 + σ2²) ≤ σ_y. Amplamente utilizado para aços dúcteis. Para o revestimento, σ1 é a tensão tangencial (hoop) e σ2 é a tensão axial. Garante que a energia de deformação cisalhante não supere o limite de escoamento." },

  { id:206, fonte:"prova_real", ano:2018, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"difícil",
    pergunta:"O fenômeno de 'severe slugging' (golfada severa) em risers catenária ocorre principalmente quando:",
    opcoes:["A velocidade do gás supera a velocidade sônica na base do riser","Em regime de baixas vazões com padrão golfada, o líquido acumula na base do riser bloqueando o gás, causando ciclos de pressão e expulsão violenta de líquido","A temperatura do fluido excede o ponto de bolha no topo do riser","A rugosidade interna do riser gera vibrações ressonantes"],
    correta:1, explicacao:"Severe slugging: (1) acúmulo de líquido bloqueia a base do riser; (2) pressão a montante aumenta comprimindo gás; (3) gás penetra subitamente expulsando slug de líquido em alta velocidade; (4) ciclo se repete. Causa danos mecânicos e instabilidade de processo. Combatido com gas lift, choke control ou slug catcher." },

  { id:207, fonte:"prova_real", ano:2018, bloco:"I", assunto:"Termodinâmica", dificuldade:"média",
    pergunta:"A eficiência do Ciclo de Brayton (turbina a gás) é expressa por η = 1 - r_p^(-(γ-1)/γ), onde r_p é a razão de compressão. Para aumentar a eficiência, deve-se:",
    opcoes:["Reduzir a razão de compressão r_p e a temperatura de entrada na turbina","Aumentar a razão de compressão r_p e a temperatura máxima de entrada na turbina (T_max)","Operar com baixa razão de compressão e sem intercooling","Reduzir a temperatura dos gases de exaustão apenas, sem alterar r_p"],
    correta:1, explicacao:"Maior r_p → maior η (ex: r_p=10, γ=1.4 → η≈48%). Aumentar T_max aumenta o trabalho líquido por ciclo. Na prática, há limite metalúrgico (~1700K). Regeneração, reaquecimento e intercooling também aumentam η." },

  { id:208, fonte:"prova_real", ano:2018, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"Na recuperação terciária por injeção de surfactante (chemical EOR), o mecanismo principal de mobilização do óleo residual é:",
    opcoes:["Redução da viscosidade do óleo por aquecimento gerado pela reação química","Redução drástica da tensão interfacial óleo-água (de ~30 mN/m para ~10⁻³ mN/m), mobilizando o óleo preso por forças capilares (Sor)","Aumento da pressão de reservatório pela injeção de volume de fluido","Dissolução da rocha carbonática pela acidez do surfactante, criando canais de fluxo"],
    correta:1, explicacao:"O surfactante reduz a tensão interfacial (γ), diminuindo o número capilar crítico Nc = μv/γ. Quando Nc > 10⁻³, a saturação de óleo residual (Sor) cai significativamente. É o método EOR de maior potencial, mas de alto custo e complexidade de implementação." },

  { id:209, fonte:"prova_real", ano:2018, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"No teste de deliverabilidade de poços de gás (back-pressure test), a curva de desempenho de Rawlins-Schellhardt é construída plotando, em escala log-log:",
    opcoes:["Pressão estática vs. tempo de produção","(P²_r - P²_wf) vs. vazão q — a inclinação 1/n da reta indica o coeficiente de turbulência","Temperatura de cabeça vs. vazão de gás","Gradiente de pressão no riser vs. composição do gás"],
    correta:1, explicacao:"q = C(P²_r - P²_wf)^n. Em log-log: log(q) vs. log(P²_r - P²_wf) é uma reta com inclinação n (0,5 ≤ n ≤ 1). n=1: fluxo darcyano; n=0,5: turbulência máxima. O AOF é determinado para Pwf = pressão atmosférica." },

  { id:210, fonte:"prova_real", ano:2018, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"Para cimentação de poços em altas temperaturas (acima de 110°C), a classe de cimento API recomendada e o aditivo necessário são:",
    opcoes:["Classe A com acelerador (cloreto de cálcio) para pega rápida em baixas temperaturas","Classe G ou H com retardadores de pega, pois sem eles o cimento pega prematuramente antes de atingir o local","Classe C de alta resistência inicial, sem aditivos","Classe D com extensor de neoprene para alta pressão"],
    correta:1, explicacao:"Cimento Classe G/H é o padrão atual (substituiu A/B/C). Em altas temperaturas, o cimento pega muito rapidamente sem retardadores. Retardadores lignosulfonados, ácido tartárico ou AMPS-copolymers são utilizados para controlar o thickening time conforme a temperatura e profundidade." },

  // ── 2014 ─────────────────────────────────────────────
  { id:211, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"Na equação de Vogel para IPR abaixo do ponto de bolha: q/qmax = 1 - 0,2(Pwf/Pr) - 0,8(Pwf/Pr)². O valor máximo de produção (AOF — Absolute Open Flow) corresponde à condição:",
    opcoes:["Pwf = Pr (pressão de reservatório — sem produção)","Pwf = 0,5 Pr","Pwf = 0 (pressão de fundo nula — máximo diferencial de pressão)","Pwf = Pb (pressão de bolha)"],
    correta:2, explicacao:"Para Pwf = 0: q = qmax × (1 - 0 - 0) = qmax. O AOF é a vazão máxima teórica com Pwf = 0. Na prática, é impossível, mas define o potencial máximo do poço. Para Pwf = Pr: q = 0 (nenhuma produção). A equação de Vogel é usada para poços produzindo abaixo do ponto de bolha." },

  { id:212, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"O fator volume de formação do gás Bg = 0,02829 × Z × T(K) / P(kPa). À medida que a pressão do reservatório decresce durante a produção, Bg:",
    opcoes:["Permanece constante, pois depende apenas da composição do gás","Diminui, pois o gás se comprime com a queda de pressão","Aumenta, pois com menor pressão o gás ocupa maior volume — é a principal força motriz de um reservatório de gás","Varia apenas com a temperatura, independendo da pressão"],
    correta:2, explicacao:"Bg é o volume que 1 m³ de gás nas condições de reservatório ocupa na superfície. Com P caindo, Bg aumenta (gás expande). Em um reservatório de gás com drive por expansão, a queda de pressão é a força motriz de produção. O gás produzido = VGPL × (1/Bg_i - 1/Bg_abanado)." },

  { id:213, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"Durante um DST (Drill Stem Test — Teste em Hastes), o período de 'buildup' (fechamento do poço) serve para:",
    opcoes:["Aumentar a pressão de injeção de lama durante a perfuração","Determinar a pressão estática do reservatório e a permeabilidade pelo retorno de pressão com o poço fechado e análise do gráfico de Horner","Circular o fluido de formação para a superfície e medir a sua composição","Medir a temperatura de fundo em condições dinâmicas de produção"],
    correta:1, explicacao:"No buildup, o poço é fechado e a pressão cresce (buildup) de Pwf em direção a P*. O gráfico de Horner (log de (tp+Δt)/Δt vs P) fornece: pressão estática (extrapolação para tempo infinito), permeabilidade k = 162,6qμB/(mh) e skin S. É a análise de pressão mais utilizada em DST." },

  { id:214, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"Na completação de poços por perforação com cargas moldadas (shaped charges), o parâmetro SPF (Shots Per Foot — disparos por pé) influencia principalmente:",
    opcoes:["A taxa de penetração da broca durante a perfuração do reservatório","A conectividade hidráulica entre o espaço anular cimentado e o reservatório — mais SPF aumenta a área de fluxo, mas pode comprometer a integridade do cimento e revestimento","O custo de cimentação da coluna de revestimento","A temperatura de fundo durante a completação"],
    correta:1, explicacao:"SPF típico: 4-12 disparos/pé. Mais shots aumentam a produtividade (menor skin de perforação) mas podem causar colapso do revestimento se excessivo. O projeto de perforação equilibra SPF, ângulo de fase (0°, 60°, 90°, 120°), comprimento e diâmetro dos perfuradores com a resistência do tubular." },

  { id:215, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"A principal vantagem de um poço horizontal em relação a um poço vertical no mesmo reservatório é:",
    opcoes:["Menor custo de perfuração em qualquer cenário geológico","Maior área de contato com o reservatório, interceptando mais fraturas e aumentando a produtividade — especialmente em reservatórios de baixa permeabilidade ou fraturados","Ausência total de problemas com irrupção de gás e água (coning)","Maior facilidade de completação e sempre menor skin"],
    correta:1, explicacao:"Um poço horizontal com seção horizontal de 1000m tem comprimento efetivo de reservatório 10-30× maior que um vertical. Em reservatórios de baixa permeabilidade (pré-sal, shale), isso é decisivo. Porém, o custo é 2-3× maior e os desafios de completação e medição são maiores." },

  { id:216, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"O VOPL é calculado por: VOPL = (A × h × φ × (1-Swi)) / Bo. Mantendo A, h, Swi e Bo constantes, se a porosidade aumenta de 15% para 20%, o VOPL aumenta em aproximadamente:",
    opcoes:["5 pontos percentuais (aumento absoluto)","25% (1/4 a mais)","33% (de 0,15 para 0,20 = fator 1,333)","50% (a porosidade aumentou 5 de 10)"],
    correta:2, explicacao:"VOPL ∝ φ. Razão: 0,20/0,15 = 1,333... → aumento de 33,3%. Cuidado: não é o aumento absoluto de 5 pontos (5/15=33%). Um erro comum é confundir aumento absoluto com aumento percentual. Este tipo de cálculo proporcional é frequente nas provas Cesgranrio." },

  { id:217, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Elevação e Escoamento", dificuldade:"média",
    pergunta:"Para um poço offshore de alta produção (> 2.000 m³/d de fluido total) com alta RGO e presença de sólidos em suspensão, o método de elevação artificial mais indicado é:",
    opcoes:["Bomba centrífuga submersa (BCS) — alta capacidade, mas muito sensível a sólidos e gás livre","Gas lift contínuo — tolerante a sólidos, gás e sólidos, alta confiabilidade e adequado para grandes vazões offshore","Bombeio mecânico (sucker rod) — para alta produção com restrição de inclinação","Bomba de cavidade progressiva (BCP) — indicada especificamente para alta RGO"],
    correta:1, explicacao:"Gas lift usa gás comprimido injetado no anular para reduzir a densidade da coluna e elevar o fluido. Vantagens: sem partes móveis subterrâneas, tolerante a sólidos, gás e corrosão, fácil ajuste da vazão, adequado para grandes volumes e poços inclinados. É o método dominante em plataformas offshore." },

  { id:218, fonte:"prova_real", ano:2014, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"difícil",
    pergunta:"A correlação de Kozeny-Carman relaciona permeabilidade absoluta k e porosidade φ por: k ∝ φ³/(1-φ)². Isso implica que:",
    opcoes:["A permeabilidade é independente da porosidade — depende apenas da tortuosidade","A permeabilidade cresce mais que proporcionalmente com φ — pequenas variações em φ causam grandes mudanças em k","A permeabilidade é linearmente proporcional a φ","A permeabilidade diminui quando φ aumenta acima de 20%"],
    correta:1, explicacao:"Para φ = 20%: fator = 0,2³/0,8² = 0,008/0,64 = 0,0125. Para φ = 25%: fator = 0,25³/0,75² = 0,0156/0,5625 = 0,0278. Aumento de φ de 20% para 25% (25% de aumento) causa aumento de k de ~122%. Essa sensibilidade explica por que pequenas variações de cimentação/compactação impactam enormemente a produção." },

  { id:219, fonte:"prova_real", ano:2014, bloco:"Mat", assunto:"Matemática", dificuldade:"fácil",
    pergunta:"Uma plataforma produz 15.000 m³/dia de fluido total com BSW (Basic Sediment & Water) de 70%. A produção diária de óleo é:",
    opcoes:["10.500 m³/dia","4.500 m³/dia","1.500 m³/dia","7.500 m³/dia"],
    correta:1, explicacao:"Produção de óleo = Fluido total × (1 - BSW) = 15.000 × (1 - 0,70) = 15.000 × 0,30 = 4.500 m³/dia. BSW = 70% significa que 70% do fluido produzido é água e sedimentos; apenas 30% é óleo. À medida que o campo matura, o BSW aumenta, tornando a produção menos eficiente." },

  { id:220, fonte:"prova_real", ano:2014, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"Uma lama de perfuração com densidade 1,45 g/cm³ gera pressão hidrostática a 3.500 m de profundidade vertical (TVD) de aproximadamente:",
    opcoes:["50,8 MPa","14,2 MPa","49,8 kPa","5,08 MPa"],
    correta:0, explicacao:"P = ρgh = 1450 kg/m³ × 9,81 m/s² × 3500 m = 49.785.750 Pa ≈ 49,8 MPa ≈ 50,8 MPa. Em campo: P(psi) = 0,052 × ρ(lb/gal) × TVD(ft). 1,45 g/cm³ = 12,1 lb/gal → 0,052 × 12,1 × 11.483 ft ≈ 7.224 psi ≈ 49,8 MPa. A opção A (50,8 MPa) é a mais próxima fisicamente correta." },

  // ── 2012 ─────────────────────────────────────────────
  { id:221, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"fácil",
    pergunta:"O perfil de raios gama (GR — Gamma Ray) é utilizado para identificar litologia porque:",
    opcoes:["Folhelhos têm alto GR (ricos em argila e K, U, Th radioativos) enquanto arenitos e carbonatos puros têm baixo GR","Arenitos têm GR mais alto que carbonatos por conterem quartzo","O GR mede a radioatividade do fluido nos poros, identificando óleo e gás","Carbonatos têm sempre o maior GR por terem calcita radioativa"],
    correta:0, explicacao:"GR alto → folhelho (argilominerais concentram K⁴⁰, U²³⁸, Th²³²). GR baixo → arenito limpo, calcário puro ou sal. Folhelhos são selantes; arenitos/carbonatos limpos são potenciais reservatórios. O GR é o log mais usado para correlação de poços e identificação de intervalos-alvo." },

  { id:222, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"Em fraturamento hidráulico, a pressão mínima necessária para propagar a fratura (pressão de fraturamento) é determinada principalmente por:",
    opcoes:["A viscosidade do fluido de fratura — mais viscoso exige maior pressão","A tensão horizontal mínima (σ_h_min) que deve ser vencida para abrir a fratura no plano perpendicular a essa tensão","A permeabilidade da matriz — reservatórios mais permeáveis fraturam mais facilmente","A profundidade do poço exclusivamente, sem relação com o campo de tensões"],
    correta:1, explicacao:"Pressão de fraturamento P_f = σ_h_min + T (tensão de tração da rocha). A fratura se propaga no plano perpendicular à tensão mínima, portanto paralela às tensões máximas. Em regimes normais de falha, σ_h_min é a tensão mínima. A análise de LOT/FIT fornece σ_h_min in situ. Isso é fundamental para o design de estimulação." },

  { id:223, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"Um reservatório 'undersaturated' (subsaturado) é aquele em que a pressão P é:",
    opcoes:["Menor que a pressão de bolha Pb — gás livre já está presente","Igual à pressão de bolha Pb — início da liberação de gás","Maior que a pressão de bolha Pb — todo o gás está dissolvido no óleo","Igual à pressão capilar de entrada — água ainda não entrou no reservatório"],
    correta:2, explicacao:"P > Pb: undersaturated (subsaturado) — gás 100% dissolvido, óleo é monofásico. P = Pb: ponto de bolha — surge a primeira bolha de gás. P < Pb: saturado — gás livre forma uma fase gasosa que cresce com a queda de pressão. A distinção é crítica para calcular o comportamento do reservatório e projetar a produção." },

  { id:224, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"Em um projeto de injeção de água, a razão de mobilidade M = λ_água/λ_óleo = (k_rw/μ_w)/(k_ro/μ_o). Para um deslocamento estável (sem fingering viscoso), M deve ser:",
    opcoes:["M >> 10 — água muito mais móvel que óleo garante varredura uniforme","M > 1 — alguma mobilidade maior da água é aceitável","M ≤ 1 — água menos móvel que óleo garante frente de deslocamento estável e pistão","M = 0 — sem deslocamento de água"],
    correta:2, explicacao:"M ≤ 1: frente de deslocamento estável (piston-like). M > 1: instabilidade — 'fingering' viscoso, onde canais de água de alta permeabilidade breakthrough precocemente, deixando óleo não varrido. Polímeros aumentam μ_w (reduzem M). M > 10 é desastroso para a eficiência de varredura." },

  { id:225, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"fácil",
    pergunta:"A Árvore de Natal Molhada (ANM ou Wet Christmas Tree) no contexto de completação de poços submarinos tem como função principal:",
    opcoes:["Armazenar o óleo produzido no fundo do mar até o FPSO solicitar transferência","Controlar o fluxo de produção e injeção de um poço submarino através de válvulas operadas remotamente (ROV ou controle eletro-hidráulico)","Separar gás e óleo no fundo do mar para otimizar o transporte via riser","Fornecer energia elétrica para equipamentos de controle de poço submarinos"],
    correta:1, explicacao:"A ANM é instalada na cabeça do poço submarino e contém: válvula mestra de produção (PMV), válvula de fluxo cruzado (XOV), válvulas de injeção de inibidor e de gas lift, sensores de pressão/temperatura e conexões para linhas de controle umbilical. É operada remotamente pelo SCM (Subsea Control Module) ou por ROV." },

  { id:226, fonte:"prova_real", ano:2012, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"Em escoamento multifásico gás-líquido em tubulações verticais, o padrão de escoamento 'slug flow' (golfada) é caracterizado por:",
    opcoes:["Gás e líquido escoando em camadas horizontais separadas por uma interface plana","Alternância de bolhas grandes de gás (Taylor bubbles) que ocupam quase toda a seção transversal e slugs de líquido entre elas","Escoamento de gás com gotículas de líquido em suspensão (mist flow)","Gás finamente disperso como pequenas bolhas no líquido contínuo (bubble flow)"],
    correta:1, explicacao:"Golfada (slug flow): Taylor bubbles de gás (velocidade > líquido) se alternam com slugs de líquido. Causa vibrações, problemas operacionais e é o padrão mais problemático em risers. Os mapas de padrão de escoamento (Taitel-Dukler) definem as fronteiras entre padrões em função das velocidades superficiais de gás e líquido." },

  { id:227, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"média",
    pergunta:"A curva de declínio exponencial de um poço de gás é descrita por q = q₀ × e^(-D×t). Se a taxa de declínio anual D = 20%, a produção no final de 5 anos em relação à inicial será:",
    opcoes:["Aproximadamente 36,8% (e^(-1))","Aproximadamente 13,5% (e^(-2))","Aproximadamente 36,8% da inicial (e^(-5×0,2) = e^(-1))","Aproximadamente 20% da inicial"],
    correta:2, explicacao:"q₅/q₀ = e^(-D×t) = e^(-0,20×5) = e^(-1,0) ≈ 0,368. Ou seja, após 5 anos com declínio de 20%/ano exponencial, a vazão cai para ~37% da inicial. O declínio exponencial é conservador (subestima produção) — o hiperbólico é mais realista para muitos reservatórios." },

  { id:228, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"Os reservatórios do pré-sal brasileiro (Bacia de Santos, ex: Lula, Búzios) são predominantemente:",
    opcoes:["Arenitos turbidíticos de alta porosidade e permeabilidade","Carbonatos microbianos (coquinas e estromatólitos) com porosidade vugular/fissural, formados em ambiente lacustre de água doce no Cretáceo Inferior","Evaporitos com alta permeabilidade explorada diretamente","Folhelhos ricos em querogênio tipo II fraturados hidraulicamente"],
    correta:1, explicacao:"O pré-sal da Bacia de Santos é um sistema petrolífero único: reservatórios carbonáticos microbianos (construções orgânicas — mounds e biohermas) formados em lago de água doce no Cretáceo Inferior (~120 Ma), sob 2km de espessa camada de sal (halita e taquidrita). Possuem porosidade 5-25% e permeabilidade 1-1000 mD. São cobertos pelo sal que forma tanto a rocha selante quanto a armadilha." },

  { id:229, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"média",
    pergunta:"A principal diferença entre um riser flexível e um SCR (Steel Catenary Riser) é:",
    opcoes:["O riser flexível é mais barato e pode ser usado em qualquer lâmina d'água sem restrição","O riser flexível tem maior flexibilidade e absorve movimentos da plataforma sem fadiga nas conexões de topo, mas tem limite de pressão/temperatura e custo elevado; o SCR é mais rígido, sujeito à fadiga no toque de fundo (TDP), mas suporta maiores pressões e temperaturas","O SCR é sempre preferido pois tem custo menor e melhor desempenho em todas as condições","O riser flexível não pode transportar gás, apenas óleo e água"],
    correta:1, explicacao:"Riser flexível: estrutura multicamadas (carcaça, camadas poliméricas, arames de tração), alta flexibilidade, limites de P (~690 bar) e T (~130°C), custo elevado. SCR: tubo de aço em catenária, mais barato para grandes diâmetros e profundidades, mas o ponto de toque no fundo (TDP) sofre fadiga por movimentos da plataforma — exige design cuidadoso e inspeção periódica." },

  { id:230, fonte:"prova_real", ano:2012, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"difícil",
    pergunta:"Os 'breakouts' em poços (colapso das paredes opostas no plano de tensão mínima) são usados para determinar:",
    opcoes:["A composição química das formações adjacentes ao poço","A direção e magnitude das tensões horizontais in situ — breakouts ocorrem na direção da tensão horizontal mínima (σ_h_min)","A temperatura da formação ao longo do poço","A permeabilidade da rocha através da análise do colapso local"],
    correta:1, explicacao:"Breakouts são ovalamentos do poço que ocorrem no plano da tensão mínima horizontal (σ_h_min) pois a concentração de tensão compressiva nesse plano excede a resistência da rocha. Analisados por caliper ou imagem de poço (FMI), determinam σ_H (máxima) e σ_h (mínima) direction — dado fundamental para design de revestimento, janela de lama e fraturamento hidráulico." },

  // ── 2011 ─────────────────────────────────────────────
  { id:231, fonte:"prova_real", ano:2011, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"A Bacia de Santos é destacada por ser a maior bacia sedimentar da margem continental brasileira em volume de óleo descoberto. Suas principais descobertas de pré-sal (ex: Lula/Tupi) ocorreram em:",
    opcoes:["Arenitos do Cretáceo Superior em águas rasas (< 500m de lâmina d'água)","Carbonatos microbianos do Cretáceo Inferior em águas ultra-profundas (2000-3000m LDA), sob camadas de sal de 1-2 km de espessura","Folhelhos do Paleoceno fraturados por tectônica extensional","Conglomerados do Eoceno em lâmina d'água de 300-500m"],
    correta:1, explicacao:"As descobertas do pré-sal da Bacia de Santos (Lula, Búzios, Sapinhoá, etc.) ocorrem em carbonatos lacustres do Barremiano-Aptiano (Cretáceo Inferior), em lâminas d'água de 2000-3000m, com o reservatório a profundidades de 5000-7000m (abaixo do nível do mar), sob camada de sal de 1-2 km. São os maiores campos do Brasil." },

  { id:232, fonte:"prova_real", ano:2011, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"Em simulação numérica de reservatórios pelo método de diferenças finitas, o modelo de grade (grid) mais usado para reservatórios com geometria complexa como falhas e dobras é:",
    opcoes:["Grade cartesiana regular (corner-point grid retangular) — simples mas não captura geometrias complexas","Corner-point grid (CPG) ou 'pillar grid' — permite representar falhas, inclinações e contatos irregulares adaptando os blocos à geometria da rocha","Grade radial cilíndrica — usada para simular todo o reservatório","Grade 1D vertical — suficiente para qualquer reservatório heterogêneo"],
    correta:1, explicacao:"O corner-point grid (grid de cantos) define blocos por 8 cantos interligados por pilares verticais ou inclinados. Permite: representar falhas sem aproximações excessivas, ajustar blocos à geometria estratigráfica e modelar reservatórios inclinados. Simuladores como ECLIPSE (SLB) e Intersect usam CPG como padrão. É muito mais flexível que grades cartesianas regulares." },

  { id:233, fonte:"prova_real", ano:2011, bloco:"I", assunto:"Mecânica dos Fluidos", dificuldade:"média",
    pergunta:"O modelo reológico de Bingham Plástico para fluidos de perfuração é caracterizado por:",
    opcoes:["Ser um fluido newtoniano com viscosidade constante em qualquer taxa de cisalhamento","Apresentar tensão limite de escoamento (yield point — YP) abaixo da qual o fluido não flui, e viscosidade plástica (PV) acima desse limite","Ter viscosidade que diminui com o aumento da taxa de cisalhamento sem tensão limite (Power Law)","Ser puramente elástico sem comportamento viscoso"],
    correta:1, explicacao:"Bingham Plástico: τ = YP + PV × dγ/dt. Abaixo do yield point (YP), o fluido se comporta como sólido (não flui). Acima, flui com viscosidade plástica (PV) constante. Os parâmetros PV (em cP) e YP (em lb/100ft²) são medidos com viscosímetro Fann rotacional. Controlam a capacidade de suspensão de cascalho e a pressão de circulação." },

  { id:234, fonte:"prova_real", ano:2011, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O BOP (Blowout Preventer) do tipo 'pipe ram' tem como função específica:",
    opcoes:["Selar completamente o poço sem tubulação de perfuração, funcionando como tampão total","Selar o espaço anular ao redor de uma coluna de perfuração de diâmetro específico, mantendo o poço fechado com a coluna no interior","Controlar a direção do poço durante a perfuração direcional","Medir a pressão hidrostática da lama durante a circulação"],
    correta:1, explicacao:"Pipe rams: blocos de borracha que fecham o espaço anular ao redor de uma coluna de tamanho específico (ex: 5\" DP). Para fechar o poço sem tubulação: blind/shear ram (cega ou cisalhadora). O BOP anular (preventer esférico) fecha ao redor de qualquer diâmetro (mais versátil). O conjunto tipicamente tem: 1 esférico + 2-4 rams em série." },

  { id:235, fonte:"prova_real", ano:2011, bloco:"II", assunto:"Geologia do Petróleo", dificuldade:"média",
    pergunta:"O regime contratual de Partilha de Produção (Production Sharing Agreement — PSA), adotado no Brasil para o pré-sal após 2010, difere da Concessão porque:",
    opcoes:["Na concessão o Estado fica com todo o petróleo; na partilha o concessionário fica com tudo","Na partilha, o Estado (por meio da Petrobras e PPSA) recebe uma parcela do 'petróleo-lucro' após o concessionário recuperar seus custos ('cost oil'); na concessão, o operador paga royalties e participações mas retém a propriedade da produção","Na partilha, não há pagamento de royalties ou bônus de assinatura","Na concessão, a Petrobras é obrigatoriamente operadora com 30% mínimo de participação"],
    correta:1, explicacao:"PSA: concessionário assume o risco exploratório; em caso de descoberta, produz e 'recupera' seus custos (cost oil = custo/preço); o restante (profit oil) é dividido entre concessionário e Estado (% definido no contrato). Na concessão, o concessionário paga royalties (5-15%) e participações especiais, mas retém a produção menos esses encargos. O PSA maximiza a participação estatal em grandes descobertas." },

  { id:236, fonte:"prova_real", ano:2011, bloco:"Mat", assunto:"Matemática Financeira", dificuldade:"média",
    pergunta:"Um projeto de desenvolvimento de campo tem os seguintes fluxos de caixa (MM$): Ano 0: -500; Ano 1: +100; Ano 2: +200; Ano 3: +300; Ano 4: +200. Com taxa de desconto de 10% ao ano, o VPL (Valor Presente Líquido) é aproximadamente:",
    opcoes:["-500 + 91 + 165 + 225 + 137 = +118 MM$ (VPL > 0 — projeto viável)","-500 + 100 + 200 + 300 + 200 = +300 MM$ (soma sem desconto)","+100 MM$ (sem calcular o desconto temporal)","-500 MM$ (apenas o investimento)"],
    correta:0, explicacao:"VPL = -500 + 100/1,1 + 200/1,1² + 300/1,1³ + 200/1,1⁴ = -500 + 90,9 + 165,3 + 225,4 + 136,6 = +118,2 MM$. VPL > 0 indica que o projeto cria valor acima da taxa de retorno exigida de 10%. Se VPL < 0, o projeto destrói valor. TIR é a taxa que zera o VPL (~19% neste caso)." },

  { id:237, fonte:"prova_real", ano:2011, bloco:"II", assunto:"Reservatórios de Petróleo", dificuldade:"difícil",
    pergunta:"A equação de Archie para determinar a saturação de água em reservatórios é: Sw^n = (a × Rw) / (φ^m × Rt). Nessa equação, 'Rt' representa:",
    opcoes:["A resistividade da água de formação (Rw) corrigida pela temperatura","A resistividade verdadeira da formação medida pelo perfil de resistividade profunda (ILD/ILM/RILM)","A resistividade da lama de perfuração que invadiu a zona","A resistividade da rocha matriz seca (sem fluido)"],
    correta:1, explicacao:"Rt = resistividade verdadeira da formação (zone not flushed by mud). Medida pelo perfil de indução profunda (ILD) ou laterolog (LLD). Rw = resistividade da água de formação (obtida de amostras ou correlações com salinidade/temperatura). φ = porosidade; m = expoente de cimentação (≈2); n = expoente de saturação (≈2); a = constante (≈1). Para Sw=1: Rt = F×Rw = Ro." },

  { id:238, fonte:"prova_real", ano:2011, bloco:"II", assunto:"Sistemas Submarinos", dificuldade:"difícil",
    pergunta:"A completação inteligente (intelligent/smart completion) com válvulas de controle de fluxo (ICV — Inflow Control Valve) permite:",
    opcoes:["Substituir o BOP em emergências de controle de poço","Controlar individualmente a produção de diferentes zonas ou trechos horizontais sem intervenção no poço, otimizando a produção e retardando o breakthrough de água ou gás","Medir a composição química do fluido produzido em tempo real","Automatizar apenas a injeção de inibidores de corrosão e parafinas"],
    correta:1, explicacao:"ICVs são válvulas instaladas no completamento que permitem controlar o fluxo zona a zona (ou segmento a segmento em poços horizontais) remotamente da superfície. Benefícios: equilibrar contribuições de diferentes zonas, isolar zonas com água ou gás precocemente, maximizar a recuperação. Combinadas com sensores de pressão/temperatura (PDG), formam a base do monitoramento em tempo real de reservatórios (smart fields)." },

  // ── 2010 ─────────────────────────────────────────────
  { id:239, fonte:"prova_real", ano:2010, bloco:"II", assunto:"Perfuração de Poços", dificuldade:"média",
    pergunta:"O fenômeno de 'diferencial de prisão' (differential sticking) em perfuração ocorre quando:",
    opcoes:["A coluna de perfuração perde circulação por excesso de pressão na lama","A coluna fica presa contra a parede do poço devido à diferença de pressão entre a coluna de lama (P_lama > P_formação), forçando o tubo contra o reboco da lama com grande força de atrito","A broca fratura a formação ao encontrar altas temperaturas de reservatório","A rotação da coluna gera vibração ressonante com a formação"],
    correta:1, explicacao:"Differential sticking: ocorre em formações permeáveis onde o filtrado da lama forma reboco (filter cake). A diferença P_lama - P_formação (overbalance) empurra a coluna contra o reboco com força: F = ΔP × A_contato. Prevenção: manter overbalance mínimo, usar lama com baixo filtrado, lubrificantes. Liberação: reduzir densidade da lama (se seguro), aplicar torque/peso, spotting fluids." },

  { id:240, fonte:"prova_real", ano:2010, bloco:"II", assunto:"Processamento Primário", dificuldade:"média",
    pergunta:"O processo de dessalgação do petróleo (desalting) antes do refino tem como objetivo principal:",
    opcoes:["Remover o H₂S e mercaptanas para atender às especificações de enxofre","Remover cloretos de sódio, magnésio e cálcio dissolvidos na água de formação emulsionada no óleo, evitando corrosão e envenenamento de catalisadores na refinaria","Reduzir o teor de metais pesados (Ni, V) do petróleo pesado","Ajustar o °API do óleo para atender às especificações de exportação"],
    correta:1, explicacao:"Sais de Na, Mg e Ca emulsionados no óleo (tipicamente 5-200 PTB) causam: corrosão nos fornos de destilação (NaCl + vapor → HCl), envenenamento de catalisadores de craqueamento (Na, Ca) e formação de depósitos. O dessalgador usa água de lavagem + campo elétrico (eletrostático) para coalescer gotículas de água salgada, que se depositam e são drenadas. Meta: < 0,5 PTB na saída." },
];

const STORAGE_KEY = "petrobras_quiz_progress";
const FC_STORAGE_KEY = "petrobras_fc_progress";

const FLASHCARDS_DB = [
  // ── FÓRMULAS ─────────────────────────────────────────
  { id:"f01", categoria:"Fórmulas", frente:"Lei de Darcy — escoamento em meios porosos", verso:"q = (k × A × ΔP) / (μ × L)\n\nOnde:\n• q = vazão volumétrica (m³/s)\n• k = permeabilidade (m² ou Darcy)\n• A = área de seção transversal (m²)\n• ΔP = diferencial de pressão (Pa)\n• μ = viscosidade dinâmica (Pa·s)\n• L = comprimento (m)\n\nAplica-se a fluxo monofásico laminar em meio poroso. Base de toda a engenharia de reservatórios." },
  { id:"f02", categoria:"Fórmulas", frente:"Número de Reynolds", verso:"Re = ρVD/μ = VD/ν\n\nOnde:\n• ρ = densidade do fluido (kg/m³)\n• V = velocidade média (m/s)\n• D = diâmetro característico (m)\n• μ = viscosidade dinâmica (Pa·s)\n• ν = viscosidade cinemática (m²/s)\n\nInterpretação:\n• Re < 2.300 → laminar\n• Re > 4.000 → turbulento\n• 2.300-4.000 → transição" },
  { id:"f03", categoria:"Fórmulas", frente:"Equação de Bernoulli (fluido ideal)", verso:"P + ½ρV² + ρgz = constante\n\nOu entre pontos 1 e 2:\nP₁ + ½ρV₁² + ρgz₁ = P₂ + ½ρV₂² + ρgz₂\n\nTermos:\n• P = pressão estática (Pa)\n• ½ρV² = pressão dinâmica (Pa)\n• ρgz = pressão potencial (Pa)\n\nAplica-se a fluido ideal, incompressível, em regime permanente ao longo de uma linha de corrente." },
  { id:"f04", categoria:"Fórmulas", frente:"Gravidade API (°API)", verso:"°API = 141,5 / SG₆₀°F − 131,5\n\nOnde SG = gravidade específica a 60°F (em relação à água)\n\nClassificação:\n• Óleo leve: °API > 31\n• Óleo médio: 22 ≤ °API ≤ 31\n• Óleo pesado: °API < 22\n• Óleo extra-pesado: °API < 10\n\nMaior °API → menos denso → mais leve → geralmente mais valioso." },
  { id:"f05", categoria:"Fórmulas", frente:"ECD — Equivalent Circulating Density", verso:"ECD = ρ_estático + ΔP_anular / (g × TVD)\n\nOu em unidades práticas (ppg):\nECD (ppg) = MW (ppg) + ΔP_anular (psi) / (0,052 × TVD (ft))\n\nOnde:\n• MW = peso da lama estática\n• ΔP_anular = perda de pressão por atrito no espaço anular\n• TVD = profundidade vertical verdadeira\n\nECD > pressão de fraturamento → perde circulação\nECD < pressão de formação → kick" },
  { id:"f06", categoria:"Fórmulas", frente:"IPR de Vogel (poço com gás em solução)", verso:"q / q_max = 1 − 0,2(P_wf/P_r) − 0,8(P_wf/P_r)²\n\nOnde:\n• q = vazão na pressão de fundo P_wf\n• q_max = AOF (Absolute Open Flow) quando P_wf = 0\n• P_r = pressão média de reservatório\n• P_wf = pressão de fundo fluxente\n\nAplica-se a P_r < P_b (abaixo do ponto de bolha). Para P_r > P_b, usa-se a equação linear de Darcy combinada." },
  { id:"f07", categoria:"Fórmulas", frente:"Fator Volume de Formação do Óleo (Bo)", verso:"Bo = Volume do óleo NAS CONDIÇÕES DE RESERVATÓRIO / Volume do óleo NA SUPERFÍCIE\n\nCaracterísticas:\n• Bo > 1 sempre (óleo no reservatório contém gás dissolvido, é mais volumoso)\n• Bo aumenta com pressão acima de P_b (expansão)\n• Bo máximo em P = P_b\n• Abaixo de P_b: Bo cai (gás sai de solução, óleo encolhe)\n\nUnidade: bbl/STB ou m³/m³\nValores típicos: 1,05 a 2,0 para óleos leves" },
  { id:"f08", categoria:"Fórmulas", frente:"VOPL — Volume Original de Petróleo no Lugar", verso:"VOPL = (A × h × φ × (1 − Swi)) / Bo\n\nOnde:\n• A = área do reservatório (m² ou acres)\n• h = espessura líquida permoporosa (m ou ft)\n• φ = porosidade fracional\n• Swi = saturação de água irredutível (fração)\n• Bo = fator volume de formação do óleo (m³/m³ ou bbl/STB)\n\nVOPL em STB: VOPL = 7758 × A(acres) × h(ft) × φ × (1−Swi) / Bo\nFator de recuperação (FR) típico: 20–50%" },
  { id:"f09", categoria:"Fórmulas", frente:"Fator Volume de Formação do Gás (Bg)", verso:"Bg = 0,02829 × Z × T(K) / P(kPa)\n\nOu em unidades oilfield:\nBg = 0,00504 × Z × T(°R) / P(psia)  [em ft³/scf]\n\nCaracterísticas:\n• Z = fator de compressibilidade do gás\n• Bg aumenta com queda de pressão (gás expande)\n• É a força motriz de produção em reservatórios de gás\n\nVGPL (Volume de Gás Produzível):\nGp = VGPL × (1/Bg_i − 1/Bg_abandono)" },
  { id:"f10", categoria:"Fórmulas", frente:"Equação de Archie — Saturação de Água", verso:"Sw^n = (a × Rw) / (φ^m × Rt)\n\nParametros tipicos:\n• a ≈ 1 (constante de tortuosidade)\n• m ≈ 2 (expoente de cimentação)\n• n ≈ 2 (expoente de saturação)\n\nOnde:\n• Sw = saturação de água (fração)\n• Rw = resistividade da água de formação\n• φ = porosidade\n• Rt = resistividade verdadeira da formação\n\nFator de formação: F = Ro/Rw = a/φ^m\nÍndice de resistividade: RI = Rt/Ro = 1/Sw^n" },
  { id:"f11", categoria:"Fórmulas", frente:"Gradiente de Pressão Hidrostática", verso:"G (kPa/m) = ρ (kg/m³) × g (m/s²) / 1000\nG (psi/ft) = 0,433 × SG\n\nExemplos:\n• Água doce (SG=1,00): 9,81 kPa/m = 0,433 psi/ft\n• Água salgada (SG=1,03): 10,1 kPa/m = 0,446 psi/ft\n• Lama 1,2 g/cm³: 11,77 kPa/m = 0,520 psi/ft\n\nPressão hidrostática: P = G × TVD\nOverbalance = P_lama − P_formação > 0 (para evitar kick)" },
  { id:"f12", categoria:"Fórmulas", frente:"Equação de Darcy-Weisbach (perda de carga em tubulação)", verso:"ΔP = f × (L/D) × (ρV²/2)\n\nOnde:\n• f = fator de atrito de Darcy-Weisbach\n• L = comprimento da tubulação (m)\n• D = diâmetro interno (m)\n• ρ = densidade do fluido (kg/m³)\n• V = velocidade média (m/s)\n\nFator f:\n• Laminar: f = 64/Re\n• Turbulento: diagrama de Moody / Colebrook-White\n\nNota: Fanning friction factor = f/4" },
  { id:"f13", categoria:"Fórmulas", frente:"Eficiência de Carnot", verso:"η_Carnot = 1 − T_c / T_h\n\nOnde:\n• T_c = temperatura da fonte fria (K)\n• T_h = temperatura da fonte quente (K)\n• Temperaturas SEMPRE em Kelvin\n\nÉ a máxima eficiência teórica possível para qualquer máquina térmica operando entre T_c e T_h.\n\nExemplo: ciclo operando entre 500K e 300K:\nη = 1 − 300/500 = 0,40 = 40%\n\nNenhuma máquina real atinge η_Carnot." },
  { id:"f14", categoria:"Fórmulas", frente:"Critério de Von Mises (tensão equivalente)", verso:"σ_VM = √(σ₁² − σ₁σ₂ + σ₂²) ≤ σ_y\n\nOu em tensão principal geral (3D):\nσ_VM = √[(½)((σ₁−σ₂)² + (σ₂−σ₃)² + (σ₃−σ₁)²)]\n\nConceito: escoamento ocorre quando a energia de deformação distorcional atinge o valor crítico.\n\nUsado para: verificação de revestimentos de poço, tubulações de pressão, estruturas offshore.\n\nContraste: critério de Tresca (tensão máxima de cisalhamento) é mais conservador." },
  { id:"f15", categoria:"Fórmulas", frente:"Equação de Euler para Turbomáquinas", verso:"W/ṁ = u₁Vu₁ − u₂Vu₂\n\nOnde:\n• W = trabalho da máquina (W)\n• ṁ = vazão mássica (kg/s)\n• u = velocidade tangencial do rotor (m/s)\n• Vu = componente tangencial da velocidade absoluta do fluido (m/s)\n\nPara bomba centrífuga: W/ṁ = u₂Vu₂ − u₁Vu₁ > 0 (adiciona energia)\nPara turbina: W/ṁ = u₁Vu₁ − u₂Vu₂ > 0 (extrai energia)" },
  { id:"f16", categoria:"Fórmulas", frente:"Razão de Mobilidade na Injeção de Água (M)", verso:"M = λ_água / λ_óleo = (k_rw/μ_w) / (k_ro/μ_o)\n\nInterpretação:\n• M ≤ 1: deslocamento estável (piston-like) — ideal\n• M > 1: fingering viscoso — água rompe prematuramente pelos caminhos mais permeáveis\n• M >> 1: varredura muito ineficiente\n\nMétodos para reduzir M:\n• Injeção de polímero: aumenta μ_w, reduz M\n• Controle de injeção (profile modification)\n\nEficiência de varredura depende fortemente de M." },
  { id:"f17", categoria:"Fórmulas", frente:"Declínio Exponencial de Produção", verso:"q(t) = q₀ × e^(−D × t)\n\nOnde:\n• q₀ = vazão inicial\n• D = taxa de declínio (1/tempo, ex: ano⁻¹)\n• t = tempo\n\nProdução acumulada:\nNp = (q₀ − q) / D\n\nRelação com declínio hiperbólico (b=0):\n• b = 0 → exponencial (mais conservador)\n• 0 < b < 1 → hiperbólico\n• b = 1 → harmônico (mais otimista)\n\nO exponencial é o mais usado em relatórios de reserva." },
  { id:"f18", categoria:"Fórmulas", frente:"Balanço de Energia (1ª Lei — Volume de Controle)", verso:"Q̇ − Ẇ = ṁ[(h₂ − h₁) + (V₂² − V₁²)/2 + g(z₂ − z₁)]\n\nPara compressor/turbina adiabático em regime permanente:\nẆ = ṁ(h₂ − h₁)\n\nPara bomba (fluido incompressível):\nẆ = ṁ[(P₂ − P₁)/ρ + (V₂² − V₁²)/2 + g(z₂ − z₁)]\n\nNota: usa entalpia (h) — não energia interna (u) — porque inclui trabalho de fluxo PV. Fundamental para dimensionar compressores, turbinas e trocadores de calor." },
  { id:"f19", categoria:"Fórmulas", frente:"Permeabilidade Relativa e Saturação", verso:"k_ro + k_rw < 1 (sistema bifásico)\n\nPontos chave:\n• k_ro máxima quando Sw = Swi (sem água livre)\n• k_rw máxima quando So = Sor (sem óleo livre)\n• Ponto de cruzamento tipicamente em Sw ≈ 50-70%\n\nCurvas de Corey:\nk_ro = k_ro_max × ((1 − Sw − Sor)/(1 − Swi − Sor))^n_o\nk_rw = k_rw_max × ((Sw − Swi)/(1 − Swi − Sor))^n_w\n\nAs curvas são obtidas de testes de fluxo em laboratório (experimentos de deslocamento)." },
  { id:"f20", categoria:"Fórmulas", frente:"Pressão de Capilaridade em Reservatórios", verso:"Pc = P_não-molhante − P_molhante = 2γ cosθ / r\n\nOnde:\n• γ = tensão interfacial fluido-fluido (N/m)\n• θ = ângulo de contato (molhabilidade)\n• r = raio do poro (m)\n\nConsequências:\n• Em poros menores → Pc maior → água irredutível (Swi)\n• Pc > 0 em zona de transição\n• Ponto de entrada (entry pressure) determina eficiência do selo\n\nAlturas da zona de transição:\nh = Pc / (ρ_água − ρ_óleo) × g" },
  { id:"f21", categoria:"Fórmulas", frente:"Número de Nusselt e Transferência de Calor", verso:"Nu = h × L / k_f = f(Re, Pr)\n\nOnde:\n• h = coeficiente de transferência de calor convectivo (W/m²K)\n• L = comprimento característico (m)\n• k_f = condutividade térmica do fluido (W/mK)\n\nNú de Prandtl: Pr = μ × cp / k_f (≈ 7 para água, ≈ 0,71 para ar)\n\nCorrelações:\n• Dutos turbulentos: Nu = 0,023 Re^0,8 Pr^0,4 (Dittus-Boelter)\n• Placas: Nu = 0,332 Re^0,5 Pr^(1/3) (laminar)\n\nLei de Fourier (condução): q = −kA(dT/dx)" },
  { id:"f22", categoria:"Fórmulas", frente:"BSW — Cálculo de Produção de Óleo", verso:"BSW (%) = (V_água / V_fluido_total) × 100\n\nProdução de óleo:\nq_óleo = q_total × (1 − BSW/100)\n\nExemplo:\nq_total = 10.000 m³/d, BSW = 80%\nq_óleo = 10.000 × 0,20 = 2.000 m³/d\nq_água = 10.000 × 0,80 = 8.000 m³/d\n\nImpacto:\n• BSW alto → alto OPEX (tratamento de água)\n• Limite de processamento de água → restrição de produção\n• BSW tipicamente aumenta com o tempo de produção" },
  { id:"f23", categoria:"Fórmulas", frente:"RGO — Razão Gás-Óleo de Produção", verso:"RGO = q_gás (scf ou m³) / q_óleo (STB ou m³)\n\nUnidades:\n• Sistema americano: scf/STB\n• Sistema SI: m³/m³\n\nInterpretação:\n• RGO crescente → drenagem da capa de gás ou abaixo do ponto de bolha\n• RGO = Rs (em solução) → óleo saturado produzindo apenas gás dissolvido\n• RGO alto em poços com capa de gás → problema de cusping\n\nGás associado total:\nq_gás = q_óleo × RGO\n\nGLR (Gas-Liquid Ratio) é similar mas inclui água." },
  { id:"f24", categoria:"Fórmulas", frente:"Equação de VPL (Valor Presente Líquido)", verso:"VPL = Σ[FC_t / (1 + i)^t] − I₀\n\nOnde:\n• FC_t = fluxo de caixa no período t\n• i = taxa de desconto (WACC ou TMA)\n• I₀ = investimento inicial\n• t = período de tempo\n\nRegra de decisão:\n• VPL > 0 → projeto viável (cria valor)\n• VPL = 0 → retorno exatamente = taxa exigida\n• VPL < 0 → projeto não viável\n\nTIR = taxa que torna VPL = 0\nPayback = tempo para recuperar I₀" },
  { id:"f25", categoria:"Fórmulas", frente:"Fórmula de Hazen-Williams (água em tubulações)", verso:"V = 0,8492 × C × R^0,63 × S^0,54\n\nOnde:\n• V = velocidade (m/s)\n• C = coeficiente de Hazen-Williams (100-150 para tubos novos)\n• R = raio hidráulico = A/P (m)\n• S = gradiente hidráulico = hf/L\n\nAlternativa com vazão:\nQ = 0,2785 × C × D^2,63 × hf^0,54 / L^0,54\n\nUsada para água em regime turbulento. Mais simples que Darcy-Weisbach mas aplicável apenas para água em condições normais de temperatura." },

  // ── SIGLAS ───────────────────────────────────────────
  { id:"s01", categoria:"Siglas", frente:"ANM", verso:"Árvore de Natal Molhada (Wet Christmas Tree)\n\nEquipamento instalado no topo do poço submarino que controla o fluxo de produção e injeção. Contém válvulas de produção, injeção de inibidores, sensores de pressão/temperatura e conexões umbilicais.\n\nOperada remotamente pelo SCM ou por ROV.\nContraposição: ANS = Árvore de Natal Seca (seco = na superfície)." },
  { id:"s02", categoria:"Siglas", frente:"FPSO", verso:"Floating Production Storage and Offloading\n(Unidade Flutuante de Produção, Armazenamento e Transferência)\n\nEmbarcação (geralmente navio convertido) que:\n• Produz e processa o petróleo e gás\n• Armazena o óleo produzido nos tanques do casco\n• Transfere o óleo para navios aliviadores (offloading) por transferência ship-to-ship\n\nAmplamente usado no pré-sal. Ex: FPSO Cidade de Angra dos Reis, FPSO P-70.\nVantagem: pode ser relocado ao fim do campo." },
  { id:"s03", categoria:"Siglas", frente:"BCS", verso:"Bomba Centrífuga Submersa (Electric Submersible Pump — ESP)\n\nMétodo de elevação artificial composto por:\n• Bomba centrífuga multistágio submersa no poço\n• Motor elétrico submerso\n• Cabo elétrico de potência (power cable)\n• Transformador de superfície e VSD (Variable Speed Drive)\n\nVantagens: alta produtividade, grande faixa de operação\nDesvantagens: sensível a gás livre e sólidos, difícil manutenção\nUso típico: poços de alta produção com baixo GOR." },
  { id:"s04", categoria:"Siglas", frente:"DST", verso:"Drill Stem Test — Teste de Formação em Hastes\n\nTeste realizado durante a perfuração para avaliar o potencial de produção de uma formação. Etapas:\n1. Fixação de packers acima e abaixo da zona de interesse\n2. Abertura para produção (flow period)\n3. Fechamento para recuperação de pressão (buildup)\n4. Análise de Horner para obter k, S e P*\n\nFornece: pressão estática do reservatório, permeabilidade, skin, e amostra de fluido." },
  { id:"s05", categoria:"Siglas", frente:"MWD", verso:"Measurement While Drilling\n(Medição Durante a Perfuração)\n\nSistema integrado à coluna de perfuração que transmite dados em tempo real para a superfície via mud pulse telemetry ou eletromagnético:\n\nMede:\n• Inclinação e azimute do poço (direcional)\n• Peso sobre a broca (WOB), torque, rotação (RPM)\n• Temperatura de fundo, pressão de circulação\n\nUsado para: guiar poços direcionais e horizontais em tempo real." },
  { id:"s06", categoria:"Siglas", frente:"LWD", verso:"Logging While Drilling\n(Perfilagem Durante a Perfuração)\n\nExtensão do MWD que inclui sensores de perfilagem geofísica na BHA (Bottom Hole Assembly):\n\nMedições típicas:\n• Resistividade (azimuthal)\n• GR (Raios Gama)\n• Densidade / Nêutron (porosidade)\n• Sônico\n• Imagem de poço\n\nVantagem: avalia a formação antes de entrar em contato com filtrado da lama. Crucial para ajuste em tempo real (geosteering) de poços horizontais." },
  { id:"s07", categoria:"Siglas", frente:"ROV", verso:"Remotely Operated Vehicle\n(Veículo Operado Remotamente)\n\nSubmarino não tripulado com manipuladores mecânicos, câmeras e ferramentas especializadas, operado da superfície via cabo umbilical.\n\nFunções:\n• Inspeção visual e por sonar de equipamentos submarinos\n• Operação de válvulas na ANM e manifolds\n• Instalação/conexão de equipamentos\n• Coleta de amostras e medições\n\nClassificações: Work ROV (heavy work), Observation ROV, WROV." },
  { id:"s08", categoria:"Siglas", frente:"SCM", verso:"Subsea Control Module\n(Módulo de Controle Submarino)\n\nUnidade instalada na ANM ou manifold que recebe comandos elétricos e distribui fluido hidráulico para atuar as válvulas do poço.\n\nComponentes:\n• Eletrônica de controle (MCS — Master Control Station na superfície)\n• Válvulas solenóides\n• Conexões hidráulicas e elétricas do umbilical\n\nFaz parte do SCSSV (Surface Controlled Subsurface Safety Valve) e sistema de safety shutdown." },
  { id:"s09", categoria:"Siglas", frente:"GLP", verso:"Gás Liquefeito de Petróleo\n(LPG — Liquefied Petroleum Gas)\n\nMistura de propano (C₃) e butano (C₄) produzida no refino do petróleo ou processamento do gás natural.\n\nCaracterísticas:\n• Armazenado sob pressão (~8 bar) em estado líquido\n• Libera-se como gás ao ser despressurizado\n\nUsos:\n• Uso doméstico (botijão de gás)\n• Combustível automotivo (GLP automotivo)\n• Matéria-prima petroquímica\n• Propelente e refrigeração\n\nAlternativa ao gás natural encanado em regiões remotas." },
  { id:"s10", categoria:"Siglas", frente:"VOPL", verso:"Volume Original de Petróleo no Lugar\n(OOIP — Original Oil In Place)\n\nVolume total de óleo existente no reservatório antes de qualquer produção, nas condições de superfície.\n\nFórmula:\nVOPL = (A × h × φ × (1 − Swi)) / Bo\n\nDistinção importante:\n• VOPL ≠ reserva (apenas uma fração é recuperável)\n• Reserva = VOPL × Fator de Recuperação (FR)\n• FR típico: 20–50%\n\nEquivalente em inglês: STOIIP (Stock Tank Original Oil In Place)." },
  { id:"s11", categoria:"Siglas", frente:"EOR", verso:"Enhanced Oil Recovery\n(Recuperação Avançada de Petróleo)\n\nMétodos para aumentar a produção além da recuperação primária e secundária:\n\nTipos:\n• Térmicos: injeção de vapor, SAGD, combustão in situ\n• Químicos: polímeros (↑μ_água), surfactantes (↓tensão interfacial), álcali\n• Miscíveis: CO₂ miscível, injeção de GLP, nitrogênio\n• Microbianos: MEOR\n\nMeta: mobilizar o óleo residual (Sor) que permanece após waterflood.\nFR com EOR pode atingir 60–70%." },
  { id:"s12", categoria:"Siglas", frente:"PDC", verso:"Polycrystalline Diamond Compact\n(Broca de Diamante Policristalino Compacto)\n\nBroca de perfuração com pastilhas de diamante sintético (PDC cutters) fixadas em um corpo de tungstênio.\n\nCaracterísticas:\n• Sem peças móveis (diferente da tricone)\n• Alta taxa de penetração (ROP) em formações médias a duras\n• Longa vida em formações uniformes\n• Sensível a formações muito abrasivas ou intercaladas\n\nDomina o mercado atual (60-70% das brocas usadas).\nExemplos de fornecedores: Smith Bits, Reed Hycalog, Hughes Christensen." },
  { id:"s13", categoria:"Siglas", frente:"WOB", verso:"Weight on Bit\n(Peso Sobre a Broca)\n\nForça compressiva aplicada sobre a broca durante a perfuração, expressa em toneladas-força (tf) ou kN.\n\nFunção: forçar a broca contra a formação para promover corte da rocha.\n\nEfeitos:\n• WOB maior → maior ROP (taxa de penetração) até um limite\n• WOB excessivo → deflexão da coluna, desvio do poço, desgaste prematuro da broca\n• WOB insuficiente → broca 'surfando' sem penetração efetiva\n\nMedido pelo MWD ou por peso suspenso − peso indicado." },
  { id:"s14", categoria:"Siglas", frente:"BOP", verso:"Blowout Preventer\n(Preventor de Erupção)\n\nEquipamento de segurança instalado na boca do poço para controlar kicks e prevenir blowouts.\n\nTipos de rams:\n• Pipe ram: sela ao redor de uma coluna de diâmetro específico\n• Blind ram: fecha completamente o poço sem tubulação\n• Shear/blind ram: cisalha a coluna e fecha o poço\n\nPreventor esférico (anular): fecha ao redor de qualquer diâmetro.\n\nEmpilhamento típico: 1 esférico + 2-4 rams (configuração BOP stack)." },
  { id:"s15", categoria:"Siglas", frente:"ANP", verso:"Agência Nacional do Petróleo, Gás Natural e Biocombustíveis\n\nÓrgão regulador federal brasileiro criado pela Lei nº 9.478/1997 (Lei do Petróleo).\n\nCompetências:\n• Regular as atividades de E&P, refino, transporte e distribuição\n• Conceder, prorrogar e revogar licenças e autorizações\n• Realizar licitações de blocos exploratórios (rodadas de licitação)\n• Fiscalizar o cumprimento das obrigações contratuais\n• Definir preços de referência e especificações de qualidade\n\nVinculada ao Ministério de Minas e Energia (MME)." },
  { id:"s16", categoria:"Siglas", frente:"CAPEX / OPEX", verso:"CAPEX = Capital Expenditure (Despesas de Capital)\n• Investimentos em ativos: plataformas, poços, dutos, equipamentos\n• Acontece principalmente na fase de desenvolvimento do campo\n• Amortizado/depreciado ao longo do tempo\n\nOPEX = Operational Expenditure (Despesas Operacionais)\n• Custos de operação contínua: manutenção, pessoal, químicos, energia\n• Custo por barril produzido ($/bbl)\n• Determina a rentabilidade em períodos de baixo preço do petróleo\n\nTiping point: campo é viável quando preço_barril > OPEX/barril." },
  { id:"s17", categoria:"Siglas", frente:"TLP", verso:"Tension Leg Platform\n(Plataforma de Pernas Tensionadas)\n\nEstrutura flutuante para produção offshore em lâminas d'água de 300-1.500m.\n\nCaracterísticas:\n• Casco semi-submersível ancorado por tendões verticais de aço (tensionados pela flutuabilidade)\n• Movimentos verticais (heave, pitch, roll) muito restritos pelos tendões\n• Permite drilling e completação diretamente da plataforma\n• Risers rígidos verticais (TTR — Top Tensioned Risers)\n\nExemplos no Brasil: P-19 (Bacia de Campos).\nAlternativas: SPAR, Semi-sub, FPSO." },
  { id:"s18", categoria:"Siglas", frente:"PIG (Pipeline)", verso:"Pipeline Inspection Gauge\n(também: Pipeline Inspection Gadget)\n\nDispositivo lançado no interior de tubulações para:\n\nPIGs de limpeza:\n• Remoção de parafinas, hidratos, depósitos\n• Separação de produtos em batching\n\nPIGs inteligentes (Smart PIGs / ILI):\n• MFL (Magnetic Flux Leakage): detecta corrosão e defeitos na parede\n• Ultrassom (UT): mede espessura da parede com precisão\n• Geometria: detecta amassamentos e ovalamentos\n• Inspeciona centenas de km de duto sem parar a produção" },
  { id:"s19", categoria:"Siglas", frente:"ECD (perfuração)", verso:"Equivalent Circulating Density\n(Densidade Equivalente de Circulação)\n\nA pressão total exercida no fundo do poço durante a circulação, expressa como densidade equivalente.\n\nECD = ρ_lama + ΔP_anular / (g × TVD)\n\nPor que importa:\n• ECD > Pressão de fraturamento → perda de circulação (lost circulation)\n• ECD < Pressão de formação → kick ou blowout\n• Janela de operação estreita: ECD deve estar entre P_formação e P_fratura\n\nControlado por: densidade da lama, vazão de bombeamento, viscosidade do fluido." },
  { id:"s20", categoria:"Siglas", frente:"HIPPS", verso:"High Integrity Pressure Protection System\n(Sistema de Proteção de Alta Integridade contra Sobrepressão)\n\nSistema de segurança ativo que protege equipamentos de baixa pressão a jusante de fontes de alta pressão.\n\nComponentes:\n• Transmissores de pressão redundantes (2oo3 ou 1oo2)\n• Válvulas de bloqueio rápido (SDV — Shut-Down Valve)\n• Lógica de controle de segurança (SIL 2 ou 3)\n\nAplicação em petróleo: proteger separadores e risers contra overpressure vindo de poços de alta pressão.\nAlternativa mais compacta e rápida que PSVs (válvulas de alívio)." },
  { id:"s21", categoria:"Siglas", frente:"SCR", verso:"Steel Catenary Riser\n(Riser Catenary de Aço)\n\nTubulação de aço em forma de catenária que conecta o poço/manifold no fundo do mar à plataforma flutuante.\n\nVantagens:\n• Custo menor que riser flexível (especialmente em grandes diâmetros)\n• Suporta alta pressão e temperatura\n• Facilidade de inspeção\n\nDesafios:\n• TDP (Touch Down Point): região de fadiga onde o riser toca no fundo\n• Movimentos da plataforma induzem fadiga nas conexões\n• VIV (Vortex Induced Vibration): correntes oceânicas causam oscilações\n\nUsado em FPSOs, semi-subs e SPARs." },
  { id:"s22", categoria:"Siglas", frente:"PLEM / PLET", verso:"PLEM = Pipeline End Manifold\nPLET = Pipeline End Termination\n\nEstruturas submarinas instaladas no final de dutos:\n\nPLEM:\n• Distribui fluxo de um duto principal para múltiplas linhas\n• Contém válvulas de bloqueio e conexões para PIGs\n• Permite pig launching/receiving submerso\n\nPLET:\n• Conecta o duto ao equipamento final (ex: manifold, ANM)\n• Suporte mecânico e alinhamento de conexões\n\nAmbas são estruturas fixas no leito oceânico, instaladas por navios de lançamento ou guindastes." },
  { id:"s23", categoria:"Siglas", frente:"SAGD", verso:"Steam Assisted Gravity Drainage\n(Drenagem por Gravidade Assistida a Vapor)\n\nMétodo de EOR térmico para óleos ultra-pesados e betuminosos.\n\nProcesso:\n• Dois poços horizontais paralelos verticalmente (1 acima do outro, ~5m)\n• Poço superior: injeta vapor contínuo → câmara de vapor se expande\n• Calor reduz drasticamente a viscosidade do óleo\n• Óleo e condensado drenam por gravidade para o poço inferior\n• Poço inferior: produz óleo e água de condensação\n\nUsado amplamente nas areias betuminosas do Alberta, Canadá.\nFR pode atingir 60-70% para betuminosos." },
  { id:"s24", categoria:"Siglas", frente:"BSW", verso:"Basic Sediment & Water\n(Água e Sedimentos Básicos)\n\nFração volumétrica de água e sólidos no fluido produzido pelo poço:\n\nBSW (%) = (V_água + V_sólidos) / V_total_fluido × 100\n\nPor que importa:\n• Indica maturidade do campo (BSW cresce com o tempo)\n• Limita a produção quando a capacidade de tratamento de água é atingida\n• Impacta OPEX (tratamento de água produzida tem custo elevado)\n• Especificação de exportação: BSW < 0,5% (BS&W)\n\nBSW = 80% → apenas 20% do fluido é óleo." },
  { id:"s25", categoria:"Siglas", frente:"GOR / RGO", verso:"GOR = Gas-Oil Ratio / RGO = Razão Gás-Óleo\n\nVolume de gás produzido por volume de óleo:\n• GOR = q_gás / q_óleo (scf/STB ou m³/m³)\n\nInterpretação:\n• GOR = Rs (gás em solução) → óleo operando em P = Pb\n• GOR crescente → indício de drenagem da capa de gás\n• GOR alto com óleo pesado → possível invasão de capa\n\nValores típicos:\n• Óleos pesados: < 50 m³/m³\n• Óleos leves: 50-500 m³/m³\n• Condensados: > 1000 m³/m³\n\nGLR (Gas-Liquid Ratio) = GOR + GWR (gas-water ratio)." },
  { id:"s26", categoria:"Siglas", frente:"UEP / FPS", verso:"UEP = Unidade Estacionária de Produção (Brasil)\nFPS = Floating Production System (internacional)\n\nTermos genéricos para plataformas flutuantes de produção:\n\nTipos de UEP/FPS:\n• FPSO: navio com armazenamento\n• Semi-submersível: colunas e pontoons\n• TLP: Tension Leg Platform\n• SPAR: coluna vertical ancorada\n• Monocoluna: versão simplificada do SPAR\n\nA escolha depende de:\n• Lâmina d'água (LDA)\n• Volume de produção e armazenamento\n• Condições metoceanográficas\n• Custo e disponibilidade" },
  { id:"s27", categoria:"Siglas", frente:"ILT / TLD", verso:"ILT = Isochronal Long-Term Test\nTLD = Teste de Longa Duração\n\nTestes de produção de longa duração realizados em poços para:\n\nTLD:\n• Confirmar produtividade de longo prazo\n• Coletar amostras de fluido para PVT\n• Avaliar comportamento do reservatório (limites, heterogeneidades)\n• Avaliar sistemas de separação e processamento\n• Duração: semanas a meses\n\nILT (gás):\n• Versão do isochronal test com período estendido de produção\n• Determina parâmetros de deliverabilidade (C, n da equação de back-pressure)\n• Mais preciso que o teste simples por eliminar efeito de armazenamento" },
  { id:"s28", categoria:"Siglas", frente:"SSIV", verso:"Subsea Isolation Valve\n(Válvula de Isolamento Submarino)\n\nVálvula de bloqueio instalada na base de risers ou em dutos submarinos, que pode ser fechada remotamente em emergências (ex: ruptura do riser, emergência na plataforma).\n\nFunção:\n• Isolar a coluna de hidrocarbonetos entre o fundo do mar e a superfície\n• Prevenir derramamentos em caso de ruptura do riser ou emergência operacional\n• Parte do sistema de ESD (Emergency Shutdown System)\n\nDesign: fail-safe closed (fecha em caso de falha de energia ou sinal).\nOperada pelo sistema de controle umbilical ou por ROV." },
  { id:"s29", categoria:"Siglas", frente:"MFL (inspeção de dutos)", verso:"MFL = Magnetic Flux Leakage\n(Vazamento de Fluxo Magnético)\n\nTécnica de inspeção em linha (ILI) para tubulações:\n\nPrincípio:\n• Magnetos de alta potência magnetizam a parede do tubo\n• Em regiões com corrosão, redução de espessura ou defeitos → o campo magnético 'vaza' para fora\n• Sensores (Hall sensors) detectam variações no campo magnético\n\nCapacidades:\n• Detecta corrosão interna e externa\n• Identifica defeitos de fabricação (laminações, trincas)\n• Mede perda de espessura de parede\n\nComplemento: Ultrassom (UT) para medições de precisão de espessura." },
  { id:"s30", categoria:"Siglas", frente:"VSD (ESP)", verso:"VSD = Variable Speed Drive\n(Inversor de Frequência / Drive de Velocidade Variável)\n\nEquipamento de superfície que controla a velocidade de rotação do motor da BCS (bomba centrífuga submersa).\n\nFunção:\n• Ajustar a frequência de alimentação do motor (Hz)\n• Controlar a vazão produzida sem usar chokes\n• Otimizar o ponto de operação conforme declínio do reservatório\n\nVantagens:\n• Maior eficiência energética\n• Proteção do motor (sobrecorrente, subtensão)\n• Diagnóstico em tempo real (monitoramento de corrente e vibração)\n\nFaixa típica: 30-60 Hz (50 Hz = nominal no Brasil)." },

  // ── CONCEITOS ────────────────────────────────────────
  { id:"c01", categoria:"Conceitos", frente:"Janela do Petróleo", verso:"Faixa de temperatura em que a matéria orgânica (querogênio) gera predominantemente óleo:\n\n• 60°C a 120°C → janela do petróleo (geração de óleo)\n• 120°C a 180°C → janela do gás úmido / condensado\n• > 180°C → janela do gás seco\n\nAbaixo de 60°C: imaturidade — matéria orgânica não sofreu conversão suficiente.\n\nO grau de maturidade é medido pela Reflectância de Vitrinita (Ro):\n• Ro < 0,5% → imaturo\n• 0,5% < Ro < 1,3% → janela do petróleo\n• Ro > 1,3% → janela do gás seco" },
  { id:"c02", categoria:"Conceitos", frente:"Skin Factor (Fator de Dano)", verso:"Parâmetro adimensional que quantifica o dano ou estimulação ao redor do poço:\n\n• S > 0: dano de formação (reduce produtividade)\n  - Invasão de filtrado de lama\n  - Finos mobilizados\n  - Incrustações (scale, parafina)\n  - Skin de perforação inadequada\n\n• S = 0: sem dano (condição ideal)\n\n• S < 0: estimulação (aumenta produtividade)\n  - Fraturamento hidráulico: S ≈ -3 a -7\n  - Acidificação matricial: S ≈ -2 a -4\n\nQueda de pressão adicional: ΔP_skin = 141,2qμB/(kh) × S" },
  { id:"c03", categoria:"Conceitos", frente:"Ponto de Bolha (Bubble Point)", verso:"Pressão à qual o primeiro volume de gás se separa do óleo saturado:\n\n• P > Pb: óleo undersaturated (subsaturado) — gás 100% dissolvido, fluido monofásico\n• P = Pb: ponto de bolha — surge a primeira bolha de gás\n• P < Pb: óleo saturated (saturado) — duas fases coexistem (gás livre + óleo)\n\nAbaixo de Pb:\n• Bo começa a cair (óleo perde gás dissolvido)\n• RGO começa a subir\n• k_ro cai (gás livre reduz permeabilidade relativa ao óleo)\n\nDeterminado experimentalmente por análise PVT (teste CCE)." },
  { id:"c04", categoria:"Conceitos", frente:"Mecanismo de Produção — Gás em Solução (Solution Gas Drive)", verso:"Mecanismo de produção onde a energia provém da expansão do gás dissolvido no óleo quando P cai abaixo de Pb:\n\nCaracterísticas:\n• Produção de GOR crescente ao longo do tempo\n• Queda de pressão rápida\n• Fator de recuperação típico: 5-30%\n• Não há suporte externo de energia (água ou capa de gás ativa)\n\nFases:\n1. P > Pb: produção com pressão declinante, GOR constante\n2. P < Pb: gás sai de solução, GOR aumenta, produção cai rapidamente\n\nSolução: injeção de água ou gás para manutenção de pressão." },
  { id:"c05", categoria:"Conceitos", frente:"Mecanismo de Produção — Drive por Capa de Gás", verso:"Mecanismo onde a capa de gás (gas cap) se expande, deslocando o óleo para baixo:\n\nCaracterísticas:\n• Reservatório com acumulação de gás no topo (capa de gás)\n• Pressão decai mais lentamente que no solution gas drive\n• GOR cresce à medida que a capa avança para os poços\n• FR típico: 20-40%\n\nEstrutura:\n• Gás: no topo (menor densidade)\n• Óleo: zona intermediária\n• Água: na base (maior densidade)\n\nGerenciamento: evitar cusping de gás (produção prematura de gás cap). Pode ser reforçado por reinjection do gás produzido." },
  { id:"c06", categoria:"Conceitos", frente:"Mecanismo de Produção — Drive por Água (Water Drive)", verso:"Mecanismo mais eficiente — aquífero adjacente fornece energia para produção:\n\nCaracterísticas:\n• Pressão declina lentamente ou se mantém (aquífero ativo)\n• GOR permanece baixo (gás não sai de solução)\n• BSW cresce com o tempo (avanço da frente de água)\n• FR mais alto: 35-60%\n\nTipos:\n• Edge water drive: aquífero lateral\n• Bottom water drive: aquífero abaixo do reservatório\n\nProblemas:\n• Coning de água (coning) em poços verticais\n• Fingering em heterogeneidades\n• Alta produção de água (alto OPEX)" },
  { id:"c07", categoria:"Conceitos", frente:"Armadilha Anticlinal (Structural Trap)", verso:"Tipo mais comum de armadilha estrutural:\n\nForma: dobramento côncavo para baixo (anticlinal)\n• Petróleo migra para o topo do anticlinal (menor densidade)\n• Rocha selante (impermeável) acima retém os HC\n• Geometria convexa cria fechamento em todas as direções\n\nRequisitos:\n• Rocha reservatório porosa e permeável\n• Rocha selante eficiente (folhelho, evaporito, sal)\n• Fechamento estrutural adequado (spill point)\n\nExemplos:\n• Campos do Oriente Médio (Ghawar, Burgan)\n• Campos em bacias foreland\n\nAlternativas: falha, estratigráfica, domo salino." },
  { id:"c08", categoria:"Conceitos", frente:"Armadilha Estratigráfica", verso:"Armadilha formada por variações laterais de fácies sedimentares (sem deformação estrutural):\n\nTipos principais:\n• Pinch-out: reservatório que afunila lateralmente até desaparecer (arenito que termina no folhelho)\n• Canal fluvial: arenito de canal isolado por folhelho\n• Recife (bioherm): carbonato orgânico circundado por folhelho\n• Variação diagenética: cimentação que reduz porosidade localmente\n\nDesafios:\n• Mais difícil de identificar por sísmica\n• Requer análise estratigráfica detalhada\n• Menor probabilidade de sucesso exploratório que traps estruturais\n\nExemplo brasileiro: campos eocênicos da Bacia de Campos." },
  { id:"c09", categoria:"Conceitos", frente:"Querogênio — Tipos e Maturação", verso:"Querogênio: matéria orgânica insolúvel precursora de HC, dispersa na rocha geradora.\n\nTipos:\n• Tipo I (algal): gerador de óleo de boa qualidade (ex: Green River)\n• Tipo II (marinhos): gerador de óleo e gás — mais comum (ex: pré-sal brasileiro)\n• Tipo III (terrestre, carvão): gerador de gás preferencialmente\n• Tipo IV (inerte): não gera HC\n\nMaturação:\n• Diagênese (< 60°C): compactação, biogás biogênico\n• Catagênese (60-180°C): janela do petróleo e gás\n• Metagênese (> 180°C): gás seco, grafitização\n\nQuantidade: expressa como COT (Carbono Orgânico Total, %)" },
  { id:"c10", categoria:"Conceitos", frente:"Saturação de Água Irredutível (Swi / Swc)", verso:"Saturação mínima de água que não pode ser deslocada por óleo — fica retida nos poros menores por forças capilares:\n\nCaracterísticas:\n• Swi típico: 10-40% (depende da rocha e do fluido)\n• Abaixo de Swi: k_ro = k_ro_max (máxima permeabilidade relativa ao óleo)\n• Acima de Swi: k_ro diminui à medida que mais água entra\n\nDeterminação:\n• Curvas de pressão capilar (laboratório)\n• Perfis de poço (resistividade + Archie)\n• Testes de produção\n\nRelevância:\n• Define o óleo inicialmente no lugar: VOPL ∝ (1 − Swi)\n• Influencia a eficiência de recuperação" },
  { id:"c11", categoria:"Conceitos", frente:"Saturação de Óleo Residual (Sor) — Alvo do EOR", verso:"Saturação de óleo que permanece no reservatório após varredura por água (waterflood):\n\n• Sor típico: 20-40% (óleo preso por forças capilares em poros menores)\n• Alvo dos métodos EOR: mobilizar esse óleo residual\n\nMetodologias EOR para reduzir Sor:\n• Surfactante: reduz tensão interfacial (γ) → óleo se move\n• CO₂ miscível: dissolve no óleo, reduz viscosidade e tensão superficial\n• Injeção de vapor: reduz viscosidade de óleos pesados\n• Polímero: melhora varredura (reduz Sor indiretamente)\n\nPotencial EOR no Brasil:\n• Petrobras estima >30 bilhões de barris de óleo residual nos campos maduros de Campos." },
  { id:"c12", categoria:"Conceitos", frente:"Análise de Horner (Pressure Buildup)", verso:"Método de interpretação de testes de pressão (buildup) para determinar propriedades do reservatório:\n\nGráfico de Horner:\n• Eixo X (log): (tp + Δt) / Δt, onde tp = tempo de produção, Δt = tempo fechado\n• Eixo Y (linear): pressão P_ws\n• Reta de Horner: inclinação m → permeabilidade k\n\nEquações:\n• k = 162,6 × q × μ × B / (m × h)\n• Skin: S = 1,1513 × [(P_1h − Pwf) / m − log(k/φμct_rw²) + 3,2275]\n• Extrapolação para (tp+Δt)/Δt → 1: pressão média P*\n\nLimites identificados: barreiras de pressão (dobramento da reta), aquífero ativo." },
  { id:"c13", categoria:"Conceitos", frente:"Wellbore Storage (Armazenamento do Poço)", verso:"Efeito que distorce o início de testes de pressão (buildup e drawdown):\n\nCausa:\n• Após fechar o poço, fluido no interior do revestimento continua a comprimir ou expandir\n• O poço 'vê' pressão do fluido interno, não do reservatório\n• Mascara o sinal do reservatório no início do teste\n\nPeríodo afetado: primeira fase do buildup (diagonal de 45° no log-log)\n\nÍndice de Wellbore Storage:\nC = V_poço × c_fluido (bbl/psi)\n\nIdentificação:\n• Gráfico log-log: derivada e ΔP se sobrepõem (unitslope)\n• Hump da derivada: sinal do skin\n• Platô da derivada: regime radial (onde se lê k e S)" },
  { id:"c14", categoria:"Conceitos", frente:"Geosteering (Guiagem em Tempo Real)", verso:"Técnica de ajuste da trajetória de poços direcionais/horizontais com base em dados em tempo real da formação:\n\nObjetivo:\n• Manter o poço dentro da janela-alvo do reservatório\n• Maximizar o comprimento efetivo no intervalo de melhor qualidade\n\nFerramientas utilizadas:\n• LWD (Logging While Drilling): GR, resistividade azimuthal, densidade, imagem\n• MWD: inclinação e azimute\n• Sísmica de superfície (correlação com modelo geológico)\n\nDesafio: decidir em tempo real se o poço saiu do reservatório por:\n• Variação faciológica lateral\n• Falha não mapeada\n• Espessamento/adelgaçamento do reservatório" },
  { id:"c15", categoria:"Conceitos", frente:"Fratura Hidráulica — Princípios", verso:"Técnica de estimulação que cria fraturas artificiais no reservatório para aumentar a produtividade:\n\nProcesso:\n• Injeção de fluido (water-frac ou gel) a pressão > P_fraturamento\n• Propagação da fratura no plano perpendicular à tensão mínima horizontal\n• Bombeamento de propante (areia, cerâmica ou bauxita) para manter a fratura aberta\n\nParâmetros:\n• Half-length (xf): comprimento da semiefratura (m)\n• Condutividade: k_fratura × apertura (mD·m)\n• Frações sem dimensões: Fcd = k_f × w / (k_matrix × xf)\n\nAplicação:\n• Shale gas/oil (multiple fracturing em poços horizontais)\n• Reservatórios de baixa permeabilidade (tight gas)" },
  { id:"c16", categoria:"Conceitos", frente:"Coning de Água e Gás", verso:"Fenômeno indesejável em poços produtores:\n\nConing de água:\n• Depressão ao redor do poço atrai a interface óleo-água (COA)\n• O cone de água rompe (breakthrough) para o poço\n• Produção de água aumenta rapidamente\n\nConing de gás:\n• Análogo, mas com interface óleo-gás (COG)\n• Produção de gás da capa aumenta inesperadamente\n\nFatores que favorecem:\n• Altas vazões de produção\n• Grande anisotropia kv/kh\n• Pequena distância entre o intervalo produtor e o contato\n\nSoluções:\n• Reduzir vazão de produção\n• Completar o poço apenas na parte superior do reservatório\n• Barreira de gel (conformance)\n• Poço horizontal (reduz gradiente de pressão vertical)" },
  { id:"c17", categoria:"Conceitos", frente:"Flow Assurance — Garantia de Escoamento", verso:"Disciplina que garante o escoamento contínuo e seguro dos fluidos do reservatório até a superfície:\n\nPrincipais ameaças:\n\n1. Hidratos de gás:\n• Formação em alta P e baixa T (linhas submarinas)\n• Prevenção: injeção de MEG/metanol, inibidores termodinâmicos, riser aquecido\n\n2. Parafinas (wax):\n• Deposição em T < WAT (Wax Appearance Temperature)\n• Prevenção: pigging, inibidores de parafina, aquecimento\n\n3. Asfaltenos:\n• Precipitação por mudança de pressão/temperatura/composição\n• Difícil de remover; usa-se dispersantes\n\n4. Incrustações (scale):\n• CaCO₃, BaSO₄, SrSO₄ — incompatibilidade de águas\n• Prevenção: inibidores de scale via umbilical" },
  { id:"c18", categoria:"Conceitos", frente:"Petrofísica — Porosidade Primária vs. Secundária", verso:"Porosidade Primária:\n• Formada durante a deposição e litificação dos sedimentos\n• Intergranular (entre os grãos)\n• Intracristalina (dentro dos cristais)\n• Controlada pelo sorting, forma dos grãos e grau de cimentação\n• φ típico: 20-35% em arenitos bem selecionados\n\nPorosidade Secundária:\n• Criada por processos pós-deposicionais (diagênese)\n• Dissolução (vugular): água ácida dissolve carbonatos (poços cársticos)\n• Fraturamento tectônico: fraturas abertas\n• Dolomitização: substituição Ca→Mg cria espaço\n• Φ pode variar de < 5% a > 30%\n\nCarbonatos: dominância de porosidade secundária.\nArenitos: dominância de porosidade primária." },
  { id:"c19", categoria:"Conceitos", frente:"Simulação Numérica de Reservatórios", verso:"Modelo matemático computacional que simula o comportamento do reservatório ao longo do tempo:\n\nTipos de modelos:\n• Black oil: 3 componentes (óleo, gás, água) — mais simples\n• Composicional: composição completa de HC — para EOR, condensados\n• Dual porosity: matriz + fraturas (reservatórios naturalmente fraturados)\n\nEquações resolvidas:\n• Balanço de massa para cada fase (continuidade + Darcy)\n• Equilíbrio termodinâmico de fases\n• Balanço de energia (modelos térmicos)\n\nSoftware: ECLIPSE (SLB), CMG-GEM/STARS, Intersect, IMEX\n\nUso: previsão de produção, otimização de injeção, history matching, estratégia de desenvolvimento." },
  { id:"c20", categoria:"Conceitos", frente:"Equilíbrio de Fases — Diagramas P-T", verso:"Diagrama de fases P-T para sistemas de hidrocarbonetos:\n\nZonas:\n• Região de única fase líquida: P > Pdew, T < Tc (alto P, baixa T)\n• Região de única fase gasosa: P < Psat, T > Tc\n• Envelope bifásico: região entre a curva de bolha e a curva de orvalho\n\nPontos chave:\n• Ponto crítico: T_c e P_c — líquido e gás têm mesma densidade\n• Cricondentérmico: temperatura máxima do envelope bifásico\n• Cricondenbárico: pressão máxima do envelope bifásico\n\nFluidos:\n• Óleo volátil: ponto de operação próximo ao crítico\n• Condensado retrograde: ponto de orvalho (liquefaz com queda de P)\n• Gás seco: sempre fora do envelope nas T de operação" },
  { id:"c21", categoria:"Conceitos", frente:"Anisotropia de Permeabilidade (kv/kh)", verso:"Relação entre permeabilidade vertical (kv) e horizontal (kh):\n\nCausa:\n• Sedimentação em camadas horizontais cria preferência de fluxo lateral\n• kv < kh em quase todos os reservatórios clásticos\n\nValores típicos:\n• kv/kh = 0,1 a 0,01 (frequentemente 1:10 ou menos)\n• Arenitos com argilas laminadas: kv/kh < 0,01\n• Reservatórios fraturados verticalmente: kv/kh >> 1\n\nEfeitos:\n• kv/kh baixo → facilita coning (reduz drenagem vertical)\n• kv/kh baixo → poços horizontais não interceptam verticalmente\n• Importante para design de completação e simulação\n\nMedição: testes de poço com packer, análises de plug vertical em laboratório." },
  { id:"c22", categoria:"Conceitos", frente:"Módulo de Young, Poisson e Mecânica de Rochas", verso:"Módulo de Young (E):\n• E = σ/ε — rigidez do material (GPa)\n• Rochas: E = 10-100 GPa\n• Arenitos: 10-50 GPa; carbonatos: 30-100 GPa\n\nCoeficiente de Poisson (ν):\n• ν = −ε_transversal / ε_axial\n• Rochas: ν ≈ 0,1-0,4\n• ν = 0,5: fluido incompressível\n\nAplicações em petróleo:\n• Cálculo de tensões in situ (σ_h = ν/(1−ν) × σ_v + pressão tectônica)\n• Design de fraturamento hidráulico\n• Estabilidade de poços (janela de lama)\n• Compactação de reservatório (subsidence)\n\nMedição: ensaios triaxiais em laboratório ou perfis sônicos (E_dinâmico)." },
  { id:"c23", categoria:"Conceitos", frente:"Contratos de E&P no Brasil — Concessão vs. Partilha", verso:"Concessão (Lei 9.478/1997):\n• Operador assume risco exploratório\n• Paga: bônus de assinatura + royalties (5-15%) + participação especial\n• Retém a propriedade do petróleo produzido (menos encargos)\n• Modelo dominante nas rodadas 1-11 da ANP (1999-2013)\n\nPartilha de Produção (Lei 12.351/2010):\n• Adotada para o pré-sal e áreas estratégicas\n• Petrobras: operadora obrigatória com mínimo 30%\n• Divisão: cost oil (recuperação de custos) + profit oil (dividido entre concessionário e União via PPSA)\n• Estado maximiza receita em descobertas rentáveis\n\nCessão Onerosa (Lei 12.276/2010):\n• Contrato especial para 5 bilhões de barris do pré-sal entre Petrobras e União." },
  { id:"c24", categoria:"Conceitos", frente:"Métodos de Análise Sísmica — 3D e 4D", verso:"Sísmica 3D:\n• Levantamento volumétrico que cobre área em todas as direções\n• Gera cubo sísmico (inline, crossline, time slices)\n• Fundamental para mapeamento estrutural e estratigráfico\n• Resolução vertical: λ/4 ≈ 10-40 m (depende da frequência e velocidade)\n\nSísmica 4D (4D = 3D repetida no tempo):\n• Mesmo levantamento 3D repetido após anos de produção\n• Diferença entre levantamentos: variação de impedância acústica por mudança de fluido\n• Aplicações:\n  - Monitorar avanço de frentes de água/gás\n  - Identificar compartimentações não previstas\n  - Otimizar posicionamento de poços injetores/produtores\n• Pioneira: campo de Gullfaks (Noruega, 1995)" },
  { id:"c25", categoria:"Conceitos", frente:"Geomecânica de Reservatório — Compactação e Subsidência", verso:"Compactação do reservatório:\n• Redução do volume de poros com o declínio de pressão\n• Causada pela transferência de carga dos fluidos para a rocha\n• Pode contribuir para a produção (drive compactacional)\n• Maior em reservatórios de calcários e arenitos frouxos (ex: Ekofisk, North Sea)\n\nSubsidência:\n• Afundamento do fundo oceânico ou da superfície terrestre acima do reservatório\n• Consequências:\n  - Danos a equipamentos submarinos e risers\n  - Inundação costeira (ex: subsidência de Ekofisk: 9m em 40 anos)\n  - Necessidade de levantamento de plataformas\n\nMonitoramento: GPS, InSAR (satélite), markers de compactação em poços\n\nGerenciamento: injeção de água para manutenção de pressão minimiza compactação." },
  { id:"c26", categoria:"Conceitos", frente:"Teste de Pressão — Drawdown e Buildup", verso:"Drawdown test:\n• Poço aberto para produção a vazão constante\n• Pressão de fundo declina com o tempo\n• Análise: log-log de ΔP e derivada → identifica regime de fluxo\n\nRegimes de fluxo (sequência temporal):\n1. Wellbore storage: unitslope (ΔP ∝ t)\n2. Fluxo radial: derivada plana → permeabilidade k e skin S\n3. Fluxo em canal (linear): derivada com inclinação 1/2\n4. Pseudoestacionário: queda de pressão constante → volume de dreno\n5. Limite: barreira → derivada sobe (duplica)\n\nBuildup test:\n• Poço fechado — pressão se recupera\n• Análise de Horner → P*, k, S\n• Mais preciso que drawdown (vazão constante garantida)" },
  { id:"c27", categoria:"Conceitos", frente:"Diagênese e Qualidade do Reservatório", verso:"Diagênese: conjunto de processos físicos e químicos que alteram sedimentos após deposição:\n\nProcessos que REDUZEM qualidade:\n• Compactação mecânica: reduz porosidade primária com soterramento\n• Cimentação: quartzo, calcita, argilomineral preenchem poros\n• Argilização: alteração de feldspatos em argilominerais (ilita, caulinita)\n\nProcessos que AUMENTAM qualidade:\n• Dissolução: óxidos, feldspatos e carbonatos se dissolvem (chuvas ácidas diagenéticas)\n• Dolomitização: substituição de calcita por dolomita (redução de volume)\n• Fraturamento: tensões tectônicas criam fraturas abertas\n\nDiagênese controla a distribuição de porosidade e permeabilidade no reservatório — determinante para o FES (Fator de Engorda do Reservatório)." },
  { id:"c28", categoria:"Conceitos", frente:"Integridade de Poço (Well Integrity)", verso:"Conjunto de barreiras e práticas que garantem a contenção dos fluidos do reservatório ao longo da vida do poço:\n\nBarreiras primárias:\n• Colunas de revestimento cimentadas (anular)\n• Equipamentos de segurança de poço (SCSSV, PSV)\n• Fluido de perfuração e completação (pressão hidrostática)\n\nBarreiras secundárias:\n• BOP (durante perfuração)\n• ANM/Árvore de Natal (produção)\n• Cimento no espaço anular externo\n\nRiscos de falha:\n• Vazamento de cimento → comunicação entre formações\n• Corrosão dos tubulares\n• Canhoneamento inadequado\n\nNorma de referência: NORSOK D-010 (integridade de poço)\nLição: Macondo/BP Deepwater Horizon (2010) — falha de múltiplas barreiras" },
  { id:"c29", categoria:"Conceitos", frente:"Estimativa de Reservas (1P, 2P, 3P)", verso:"Classificação de reservas pela probabilidade de recuperação:\n\n• 1P (Proved, P90): reservas provadas com 90% de probabilidade de serem iguais ou maiores\n  - Desenvolvidas: produção já iniciada ou infraestrutura instalada\n  - Subdesenvolvidas: aprovadas para desenvolvimento futuro\n\n• 2P (P50): melhor estimativa — inclui 1P + reservas prováveis\n  - 50% de chance de ser igual ou maior\n\n• 3P (P10): inclui 1P + 2P + reservas possíveis\n  - 10% de chance de ser igual ou maior\n\nRecursos:\n• Contingente: descobertos mas não aprovados para desenvolvimento\n• Prospectivo: não descobertos (expectativa estatística)\n\nPadrão: SPE-PRMS (Society of Petroleum Engineers — Petroleum Resources Management System)" },
  { id:"c30", categoria:"Conceitos", frente:"Pressão Anormal — Sobrepressão e Subpressão", verso:"Pressão Normal:\n• Gradiente hidrostático de água salgada ≈ 10,5 kPa/m (0,46 psi/ft)\n\nSobrepressão (Geopressão):\n• Pressão de poros > pressão hidrostática normal\n• Causas:\n  - Compactação insuficiente (shale undercompaction)\n  - Geração rápida de HC em rochas lacradas\n  - Aquecimento de fluidos confinados\n  - Tectônica (falhas selos)\n• Risco: kick e blowout se lama subestimada\n\nSubpressão:\n• Pressão de poros < pressão hidrostática\n• Causas: depleção por produção, erosão da coluna sobrejacente\n• Risco: perda de circulação em reservatórios depletados\n\nMapeamento: análise de velocidade sísmica, perfis de sônico/densidade." },
];

const BLOCOS = {
  "II": { nome: "Petróleo", cor: "#0f4c81", fundo: "#e8f0f7" },
  "I": { nome: "Eng. Básica", cor: "#1a6b3c", fundo: "#e8f5ee" },
  "Mat": { nome: "Matemática", cor: "#7b3800", fundo: "#fdf0e6" },
  "III": { nome: "Português", cor: "#4a1a6b", fundo: "#f3e8fd" },
};

export default function QuizPetrobras() {
  // ── MODO ──────────────────────────────────────────────────
  const [modo, setModo] = useState("quiz"); // "quiz" | "flashcard"

  // ── QUIZ STATE ────────────────────────────────────────────
  const [tela, setTela] = useState("menu");
  const [filtroBloco, setFiltroBloco] = useState("TODOS");
  const [filtroAssunto, setFiltroAssunto] = useState("TODOS");
  const [filtroFonte, setFiltroFonte] = useState("simulado"); // "simulado" | "prova_real"
  const [modoRevisao, setModoRevisao] = useState(false);
  const [questoes, setQuestoes] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selecionada, setSelecionada] = useState(null);
  const [mostrarResposta, setMostrarResposta] = useState(false);
  const [progresso, setProgresso] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
  });
  const [tempo, setTempo] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [sessaoAcertos, setSessaoAcertos] = useState(0);
  const [sessaoTotal, setSessaoTotal] = useState(0);
  const [novaQ, setNovaQ] = useState({ pergunta:"", opcoes:["","","",""], correta:0, bloco:"II", assunto:"", explicacao:"" });

  // ── FLASHCARD STATE ────────────────────────────────────────
  const [fcFiltroCategoria, setFcFiltroCategoria] = useState("TODOS");
  const [fcQueue, setFcQueue] = useState([]);
  const [fcIdx, setFcIdx] = useState(0);
  const [fcRevelado, setFcRevelado] = useState(false);
  const [fcProgresso, setFcProgresso] = useState(() => {
    try { return JSON.parse(localStorage.getItem(FC_STORAGE_KEY)) || {}; } catch { return {}; }
  });
  const [fcSessaoStats, setFcSessaoStats] = useState({ naolembrei: 0, dificil: 0, facil: 0 });

  const timerRef = useRef(null);

  useEffect(() => {
    if (rodando) {
      timerRef.current = setInterval(() => setTempo(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [rodando]);

  const salvarProgresso = useCallback((p) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    setProgresso(p);
  }, []);

  const salvarFcProgresso = useCallback((p) => {
    localStorage.setItem(FC_STORAGE_KEY, JSON.stringify(p));
    setFcProgresso(p);
  }, []);

  const formatarTempo = (s) => {
    const m = Math.floor(s/60); const ss = s%60;
    return `${String(m).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
  };

  // ── QUIZ ──────────────────────────────────────────────────
  const iniciarQuiz = () => {
    let pool = filtroFonte === "prova_real"
      ? QUESTIONS_DB.filter(q => q.fonte === "prova_real")
      : QUESTIONS_DB.filter(q => !q.fonte || q.fonte !== "prova_real");
    if (modoRevisao) pool = pool.filter(q => progresso[q.id] === "errada");
    if (filtroBloco !== "TODOS") pool = pool.filter(q => q.bloco === filtroBloco);
    if (filtroAssunto !== "TODOS") pool = pool.filter(q => q.assunto === filtroAssunto);
    const embaralhadas = [...pool].sort(() => Math.random() - 0.5);
    setQuestoes(embaralhadas);
    setIdx(0); setSelecionada(null); setMostrarResposta(false);
    setSessaoAcertos(0); setSessaoTotal(0);
    setTempo(0); setRodando(true);
    setTela("quiz");
  };

  // ── FLASHCARD ──────────────────────────────────────────────
  const iniciarFlashcards = () => {
    let pool = fcFiltroCategoria === "TODOS"
      ? FLASHCARDS_DB
      : FLASHCARDS_DB.filter(f => f.categoria === fcFiltroCategoria);
    // Repetição espaçada: prioridade = naolembrei*3 + dificil - facil
    const sorted = [...pool].sort((a, b) => {
      const pa = fcProgresso[a.id];
      const pb = fcProgresso[b.id];
      const sa = pa ? pa.naolembrei * 3 + pa.dificil - pa.facil : 1;
      const sb = pb ? pb.naolembrei * 3 + pb.dificil - pb.facil : 1;
      if (sb !== sa) return sb - sa;
      return Math.random() - 0.5;
    });
    setFcQueue(sorted);
    setFcIdx(0);
    setFcRevelado(false);
    setFcSessaoStats({ naolembrei: 0, dificil: 0, facil: 0 });
    setTela("flashcard");
  };

  const avaliarCard = (rating) => {
    const card = fcQueue[fcIdx];
    const prev = fcProgresso[card.id] || { naolembrei: 0, dificil: 0, facil: 0, visto: 0 };
    const np = {
      ...fcProgresso,
      [card.id]: {
        ...prev,
        visto: (prev.visto || 0) + 1,
        naolembrei: prev.naolembrei + (rating === "naolembrei" ? 1 : 0),
        dificil: prev.dificil + (rating === "dificil" ? 1 : 0),
        facil: prev.facil + (rating === "facil" ? 1 : 0),
      }
    };
    salvarFcProgresso(np);
    setFcSessaoStats(s => ({ ...s, [rating]: s[rating] + 1 }));
    if (fcIdx + 1 >= fcQueue.length) {
      setTela("fc_resultado");
    } else {
      setFcIdx(i => i + 1);
      setFcRevelado(false);
    }
  };

  const responder = (i) => {
    if (mostrarResposta) return;
    setSelecionada(i);
    setMostrarResposta(true);
    setSessaoTotal(t => t + 1);
    const q = questoes[idx];
    const ok = i === q.correta;
    if (ok) setSessaoAcertos(a => a + 1);
    const np = { ...progresso, [q.id]: ok ? "certa" : "errada" };
    salvarProgresso(np);
  };

  const proxima = () => {
    if (idx + 1 >= questoes.length) { setRodando(false); setTela("resultado"); return; }
    setIdx(i => i + 1); setSelecionada(null); setMostrarResposta(false);
  };

  const adicionarQuestao = () => {
    const id = Math.max(...QUESTIONS_DB.map(q=>q.id), 200) + 1;
    QUESTIONS_DB.push({ ...novaQ, id, dificuldade: "média" });
    setNovaQ({ pergunta:"", opcoes:["","","",""], correta:0, bloco:"II", assunto:"", explicacao:"" });
    alert(`Questão #${id} adicionada com sucesso!`);
  };

  const poolAtual = filtroFonte === "prova_real"
    ? QUESTIONS_DB.filter(q => q.fonte === "prova_real")
    : QUESTIONS_DB.filter(q => !q.fonte || q.fonte !== "prova_real");

  const assuntos = [...new Set(
    (filtroBloco === "TODOS" ? poolAtual : poolAtual.filter(q=>q.bloco===filtroBloco))
    .map(q=>q.assunto)
  )].sort();

  const simuladoQs = QUESTIONS_DB.filter(q => !q.fonte || q.fonte !== "prova_real");
  const provaRealQs = QUESTIONS_DB.filter(q => q.fonte === "prova_real");

  const totalCertas = Object.values(progresso).filter(v=>v==="certa").length;
  const totalErradas = Object.values(progresso).filter(v=>v==="errada").length;
  const totalRespondidas = totalCertas + totalErradas;
  const pct = totalRespondidas > 0 ? Math.round(totalCertas/totalRespondidas*100) : 0;

  const fcTotalCards = FLASHCARDS_DB.length;
  const fcTotalVisto = Object.keys(fcProgresso).length;

  const q = questoes[idx];
  const bInfo = q ? BLOCOS[q.bloco] : null;
  const fcCard = fcQueue[fcIdx];

  // ── MENU ──────────────────────────────────────────────
  if (tela === "menu") return (
    <div style={{ minHeight:"100vh", background:"#0a1628", fontFamily:"'Georgia', serif", padding:"24px 16px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:20 }}>
          <div style={{ fontSize:13, color:"#4a9eff", letterSpacing:4, fontFamily:"monospace", marginBottom:8 }}>
            PETROBRAS · ÊNFASE 16
          </div>
          <h1 style={{ fontSize:28, color:"#fff", margin:0, fontWeight:700 }}>SISTEMA DE ESTUDOS</h1>
          <div style={{ fontSize:13, color:"#8a9bb5", marginTop:6 }}>Padrão Cesgranrio · Engenharia de Petróleo</div>
        </div>

        {/* Toggle QUIZ / FLASHCARD */}
        <div style={{ display:"flex", background:"#111d30", borderRadius:14, padding:6, marginBottom:20, border:"1px solid #1e3050", gap:6 }}>
          {[["quiz","📝 MODO QUIZ"],["flashcard","🃏 MODO FLASHCARD"]].map(([m, label]) => (
            <button key={m} onClick={() => setModo(m)}
              style={{ flex:1, padding:"13px", borderRadius:10, border:"none", cursor:"pointer", fontSize:14, fontWeight:700,
                background: modo === m ? "linear-gradient(135deg, #1a5fa8, #4a9eff)" : "transparent",
                color: modo === m ? "#fff" : "#5a7a9a", transition:"all .2s" }}>
              {label}
            </button>
          ))}
        </div>

        {modo === "quiz" ? (<>
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:20 }}>
            {[["RESPONDIDAS",totalRespondidas,"#4a9eff"],["CERTAS",totalCertas,"#22c55e"],["ERRADAS",totalErradas,"#ef4444"],
              ["APROVEIT.",pct+"%",pct>=60?"#22c55e":pct>=40?"#f59e0b":"#ef4444"]].map(([l,v,c]) => (
              <div key={l} style={{ background:"#111d30", borderRadius:10, padding:"14px 8px", textAlign:"center", border:"1px solid #1e3050" }}>
                <div style={{ fontSize:20, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:10, color:"#5a7a9a", letterSpacing:1, marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Filtros */}
          <div style={{ background:"#111d30", borderRadius:14, padding:20, marginBottom:20, border:"1px solid #1e3050" }}>
            <div style={{ color:"#8a9bb5", fontSize:12, letterSpacing:2, marginBottom:14 }}>⚙️ FILTROS</div>

            {/* Fonte */}
            <div style={{ marginBottom:14 }}>
              <div style={{ color:"#cdd7e5", fontSize:13, marginBottom:8 }}>Banco de Questões</div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={() => { setFiltroFonte("simulado"); setFiltroBloco("TODOS"); setFiltroAssunto("TODOS"); }}
                  style={{ flex:1, padding:"10px 8px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                    background: filtroFonte==="simulado" ? "#1a5fa8" : "#1e3050",
                    color: filtroFonte==="simulado" ? "#fff" : "#8a9bb5" }}>
                  📚 Simulado ({simuladoQs.length})
                </button>
                <button onClick={() => { setFiltroFonte("prova_real"); setFiltroBloco("TODOS"); setFiltroAssunto("TODOS"); }}
                  style={{ flex:1, padding:"10px 8px", borderRadius:8, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                    background: filtroFonte==="prova_real" ? "#d97706" : "#1e3050",
                    color: filtroFonte==="prova_real" ? "#fff" : "#8a9bb5" }}>
                  🏆 Provas Reais ({provaRealQs.length})
                </button>
              </div>
            </div>

            {/* Bloco */}
            <div style={{ marginBottom:14 }}>
              <div style={{ color:"#cdd7e5", fontSize:13, marginBottom:8 }}>Bloco</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["TODOS","II","I","Mat","III"].map(b => (
                  <button key={b} onClick={() => { setFiltroBloco(b); setFiltroAssunto("TODOS"); }}
                    style={{ padding:"7px 14px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                      background: filtroBloco===b ? "#4a9eff" : "#1e3050",
                      color: filtroBloco===b ? "#fff" : "#8a9bb5" }}>
                    {b==="TODOS" ? "Todos" : `Bloco ${b} · ${BLOCOS[b]?.nome||b}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Assunto */}
            <div style={{ marginBottom:14 }}>
              <div style={{ color:"#cdd7e5", fontSize:13, marginBottom:8 }}>Assunto</div>
              <select value={filtroAssunto} onChange={e => setFiltroAssunto(e.target.value)}
                style={{ width:"100%", padding:"9px 12px", borderRadius:8, background:"#1e3050", border:"1px solid #2e4570", color:"#cdd7e5", fontSize:13 }}>
                <option value="TODOS">Todos os assuntos</option>
                {assuntos.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            {/* Modo Revisão */}
            <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", userSelect:"none" }}>
              <div onClick={() => setModoRevisao(!modoRevisao)}
                style={{ width:40, height:22, borderRadius:11, background: modoRevisao?"#ef4444":"#1e3050",
                  position:"relative", transition:"background .2s", cursor:"pointer", border:"1px solid #2e4570", flexShrink:0 }}>
                <div style={{ position:"absolute", top:2, left: modoRevisao?19:2, width:16, height:16,
                  borderRadius:"50%", background:"#fff", transition:"left .2s" }} />
              </div>
              <span style={{ color:"#cdd7e5", fontSize:13 }}>Modo Revisão — só questões erradas ({totalErradas})</span>
            </label>
          </div>

          {/* Contagem */}
          <div style={{ textAlign:"center", color:"#5a7a9a", fontSize:13, marginBottom:16 }}>
            {(() => {
              let pool = filtroFonte==="prova_real"
                ? QUESTIONS_DB.filter(q=>q.fonte==="prova_real")
                : QUESTIONS_DB.filter(q=>!q.fonte||q.fonte!=="prova_real");
              if (modoRevisao) pool = pool.filter(q=>progresso[q.id]==="errada");
              if (filtroBloco!=="TODOS") pool = pool.filter(q=>q.bloco===filtroBloco);
              if (filtroAssunto!=="TODOS") pool = pool.filter(q=>q.assunto===filtroAssunto);
              return `${pool.length} questões na seleção atual`;
            })()}
          </div>

          {/* Botões principais */}
          <div style={{ display:"flex", gap:12, marginBottom:20 }}>
            <button onClick={iniciarQuiz}
              style={{ flex:1, padding:"16px", borderRadius:12, border:"none", cursor:"pointer",
                background:"linear-gradient(135deg, #1a5fa8, #4a9eff)", color:"#fff", fontSize:16, fontWeight:700, letterSpacing:1 }}>
              ▶ INICIAR QUIZ
            </button>
            <button onClick={() => setTela("adicionar")}
              style={{ padding:"16px 20px", borderRadius:12, border:"1px solid #2e4570", cursor:"pointer",
                background:"#111d30", color:"#4a9eff", fontSize:13, fontWeight:600 }}>
              + Adicionar
            </button>
          </div>

          {/* Distribuição */}
          <div style={{ background:"#111d30", borderRadius:14, padding:20, border:"1px solid #1e3050" }}>
            <div style={{ color:"#8a9bb5", fontSize:12, letterSpacing:2, marginBottom:14 }}>📊 DISTRIBUIÇÃO</div>
            {Object.entries(BLOCOS).map(([bloco, info]) => {
              const total = QUESTIONS_DB.filter(q=>q.bloco===bloco).length;
              const certas = QUESTIONS_DB.filter(q=>q.bloco===bloco && progresso[q.id]==="certa").length;
              const p = total>0 ? Math.round(certas/total*100) : 0;
              return (
                <div key={bloco} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ color:"#cdd7e5", fontSize:13 }}>Bloco {bloco} — {info.nome}</span>
                    <span style={{ color:"#8a9bb5", fontSize:12 }}>{certas}/{total} ({p}%)</span>
                  </div>
                  <div style={{ height:6, borderRadius:3, background:"#1e3050", overflow:"hidden" }}>
                    <div style={{ width:`${p}%`, height:"100%", background:info.cor, borderRadius:3, transition:"width .5s" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </>) : (<>
          {/* FLASHCARD MODE */}
          {/* Stats FC */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
            {[["CARTÕES",fcTotalCards,"#4a9eff"],["VISTOS",fcTotalVisto,"#22c55e"],["RESTANTES",fcTotalCards-fcTotalVisto,"#f59e0b"]].map(([l,v,c]) => (
              <div key={l} style={{ background:"#111d30", borderRadius:10, padding:"14px 8px", textAlign:"center", border:"1px solid #1e3050" }}>
                <div style={{ fontSize:20, fontWeight:700, color:c }}>{v}</div>
                <div style={{ fontSize:10, color:"#5a7a9a", letterSpacing:1, marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>

          {/* Categoria */}
          <div style={{ background:"#111d30", borderRadius:14, padding:20, marginBottom:20, border:"1px solid #1e3050" }}>
            <div style={{ color:"#8a9bb5", fontSize:12, letterSpacing:2, marginBottom:14 }}>🃏 CATEGORIA</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["TODOS","Fórmulas","Siglas","Conceitos"].map(cat => {
                const count = cat==="TODOS" ? FLASHCARDS_DB.length : FLASHCARDS_DB.filter(f=>f.categoria===cat).length;
                return (
                  <button key={cat} onClick={() => setFcFiltroCategoria(cat)}
                    style={{ padding:"8px 16px", borderRadius:20, border:"none", cursor:"pointer", fontSize:13, fontWeight:600,
                      background: fcFiltroCategoria===cat ? "#4a9eff" : "#1e3050",
                      color: fcFiltroCategoria===cat ? "#fff" : "#8a9bb5" }}>
                    {cat} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progresso por categoria */}
          <div style={{ background:"#111d30", borderRadius:14, padding:20, marginBottom:20, border:"1px solid #1e3050" }}>
            <div style={{ color:"#8a9bb5", fontSize:12, letterSpacing:2, marginBottom:14 }}>📈 PROGRESSO</div>
            {["Fórmulas","Siglas","Conceitos"].map(cat => {
              const cards = FLASHCARDS_DB.filter(f=>f.categoria===cat);
              const vistos = cards.filter(f=>fcProgresso[f.id]).length;
              const dominados = cards.filter(f=>{ const p=fcProgresso[f.id]; return p && p.facil > p.naolembrei; }).length;
              const pctV = Math.round(vistos/cards.length*100);
              const cor = cat==="Fórmulas"?"#4a9eff":cat==="Siglas"?"#22c55e":"#f59e0b";
              return (
                <div key={cat} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ color:"#cdd7e5", fontSize:13 }}>{cat} ({cards.length})</span>
                    <span style={{ color:"#8a9bb5", fontSize:12 }}>{vistos} vistos · {dominados} dominados</span>
                  </div>
                  <div style={{ height:6, borderRadius:3, background:"#1e3050", overflow:"hidden" }}>
                    <div style={{ width:`${pctV}%`, height:"100%", background:cor, borderRadius:3, transition:"width .5s" }} />
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={iniciarFlashcards}
            style={{ width:"100%", padding:"16px", borderRadius:12, border:"none", cursor:"pointer",
              background:"linear-gradient(135deg, #0f4c81, #4a9eff)", color:"#fff", fontSize:16, fontWeight:700, letterSpacing:1 }}>
            🃏 INICIAR FLASHCARDS
          </button>
        </>)}
      </div>
    </div>
  );

  // ── FLASHCARD ──────────────────────────────────────────────
  if (tela === "flashcard" && fcCard) {
    const fcTotal = fcQueue.length;
    const fcProg = fcProgresso[fcCard.id] || { naolembrei:0, dificil:0, facil:0, visto:0 };
    const catCor = fcCard.categoria==="Fórmulas"?"#4a9eff":fcCard.categoria==="Siglas"?"#22c55e":"#f59e0b";
    return (
      <div style={{ minHeight:"100vh", background:"#0a1628", fontFamily:"'Georgia', serif", padding:"16px" }}>
        <div style={{ maxWidth:740, margin:"0 auto" }}>
          {/* Barra superior */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <button onClick={() => { setTela("menu"); setModo("flashcard"); }}
              style={{ background:"none", border:"1px solid #2e4570", color:"#8a9bb5", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:13 }}>
              ← Menu
            </button>
            <span style={{ color:"#8a9bb5", fontSize:13 }}>{fcIdx+1} / {fcTotal}</span>
            <div style={{ display:"flex", gap:10, fontSize:12 }}>
              <span style={{ color:"#22c55e" }}>✓ {fcSessaoStats.facil}</span>
              <span style={{ color:"#f59e0b" }}>~ {fcSessaoStats.dificil}</span>
              <span style={{ color:"#ef4444" }}>✗ {fcSessaoStats.naolembrei}</span>
            </div>
          </div>

          {/* Barra de progresso */}
          <div style={{ height:4, borderRadius:2, background:"#1e3050", marginBottom:20 }}>
            <div style={{ width:`${(fcIdx/fcTotal)*100}%`, height:"100%", background:"#4a9eff", borderRadius:2, transition:"width .3s" }} />
          </div>

          {/* Card */}
          <div style={{ background:"#111d30", borderRadius:20, padding:"32px 24px", marginBottom:16,
            border:`2px solid ${catCor}40`, minHeight:280,
            display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center" }}>
            <div style={{ marginBottom:16 }}>
              <span style={{ background:catCor, color:"#fff", borderRadius:20, padding:"4px 16px", fontSize:11, fontWeight:700, letterSpacing:1 }}>
                {fcCard.categoria.toUpperCase()}
              </span>
            </div>
            <div style={{ color:"#e8eef5", fontSize:19, fontWeight:700, lineHeight:1.5 }}>
              {fcCard.frente}
            </div>
            {fcRevelado && (
              <div style={{ borderTop:`1px solid ${catCor}40`, paddingTop:20, marginTop:20, width:"100%", textAlign:"left" }}>
                <div style={{ color:catCor, fontSize:11, fontWeight:700, marginBottom:10, letterSpacing:1 }}>RESPOSTA</div>
                <div style={{ color:"#cdd7e5", fontSize:14, lineHeight:1.7, whiteSpace:"pre-line" }}>
                  {fcCard.verso}
                </div>
              </div>
            )}
          </div>

          {/* Histórico */}
          {fcProg.visto > 0 && (
            <div style={{ textAlign:"center", color:"#5a7a9a", fontSize:12, marginBottom:12 }}>
              Visto {fcProg.visto}x · ✓{fcProg.facil} ~{fcProg.dificil} ✗{fcProg.naolembrei}
            </div>
          )}

          {/* Botões */}
          {!fcRevelado ? (
            <button onClick={() => setFcRevelado(true)}
              style={{ width:"100%", padding:"16px", borderRadius:12, border:"none", cursor:"pointer",
                background:"linear-gradient(135deg, #1a5fa8, #4a9eff)", color:"#fff", fontSize:15, fontWeight:700 }}>
              REVELAR RESPOSTA
            </button>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
              <button onClick={() => avaliarCard("naolembrei")}
                style={{ padding:"14px 6px", borderRadius:12, border:"2px solid #ef4444", cursor:"pointer",
                  background:"#200a0a", color:"#ef4444", fontSize:13, fontWeight:700 }}>
                ✗ Não lembrei
              </button>
              <button onClick={() => avaliarCard("dificil")}
                style={{ padding:"14px 6px", borderRadius:12, border:"2px solid #f59e0b", cursor:"pointer",
                  background:"#201500", color:"#f59e0b", fontSize:13, fontWeight:700 }}>
                ~ Com dificuldade
              </button>
              <button onClick={() => avaliarCard("facil")}
                style={{ padding:"14px 6px", borderRadius:12, border:"2px solid #22c55e", cursor:"pointer",
                  background:"#0a2010", color:"#22c55e", fontSize:13, fontWeight:700 }}>
                ✓ Lembrei fácil
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── FC RESULTADO ──────────────────────────────────────────
  if (tela === "fc_resultado") {
    const total = fcQueue.length;
    const { facil, dificil, naolembrei } = fcSessaoStats;
    const pctFacil = total > 0 ? Math.round(facil/total*100) : 0;
    return (
      <div style={{ minHeight:"100vh", background:"#0a1628", fontFamily:"'Georgia', serif", padding:"24px 16px", display:"flex", alignItems:"center" }}>
        <div style={{ maxWidth:500, margin:"0 auto", width:"100%", textAlign:"center" }}>
          <div style={{ fontSize:56, marginBottom:16 }}>🃏</div>
          <h2 style={{ color:"#fff", fontSize:26, marginBottom:8 }}>Sessão Concluída!</h2>
          <div style={{ fontSize:44, fontWeight:700, color: pctFacil>=70?"#22c55e":pctFacil>=40?"#f59e0b":"#ef4444", marginBottom:16 }}>
            {pctFacil}% dominado
          </div>
          <div style={{ background:"#111d30", borderRadius:14, padding:20, marginBottom:24, border:"1px solid #1e3050" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
              {[["✓ Fácil",facil,"#22c55e"],["~ Dificuldade",dificil,"#f59e0b"],["✗ Não lembrei",naolembrei,"#ef4444"]].map(([l,v,c]) => (
                <div key={l}>
                  <div style={{ fontSize:24, fontWeight:700, color:c }}>{v}</div>
                  <div style={{ fontSize:11, color:"#5a7a9a", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
            {naolembrei > 0 && (
              <p style={{ color:"#cdd7e5", fontSize:13, marginTop:16, marginBottom:0, lineHeight:1.5 }}>
                {naolembrei} cartão(ões) com "Não lembrei" terão prioridade na próxima sessão.
              </p>
            )}
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={iniciarFlashcards}
              style={{ flex:1, padding:"14px", borderRadius:12, border:"none", cursor:"pointer",
                background:"linear-gradient(135deg, #1a5fa8, #4a9eff)", color:"#fff", fontSize:14, fontWeight:700 }}>
              REPETIR
            </button>
            <button onClick={() => { setTela("menu"); setModo("flashcard"); }}
              style={{ flex:1, padding:"14px", borderRadius:12, border:"1px solid #2e4570", cursor:"pointer",
                background:"#111d30", color:"#4a9eff", fontSize:14, fontWeight:600 }}>
              MENU
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── QUIZ ──────────────────────────────────────────────
  if (tela === "quiz" && q) {
    const pct_sess = sessaoTotal > 0 ? Math.round(sessaoAcertos/sessaoTotal*100) : 0;
    return (
      <div style={{ minHeight:"100vh", background:"#0a1628", fontFamily:"'Georgia', serif", padding:"16px" }}>
        <div style={{ maxWidth:740, margin:"0 auto" }}>
          {/* Barra superior */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <button onClick={() => { setRodando(false); setTela("menu"); }}
              style={{ background:"none", border:"1px solid #2e4570", color:"#8a9bb5", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:13 }}>
              ← Menu
            </button>
            <div style={{ display:"flex", gap:16, alignItems:"center" }}>
              <div style={{ fontFamily:"monospace", fontSize:18, color: tempo > 1800 ? "#ef4444" : "#4a9eff" }}>
                ⏱ {formatarTempo(tempo)}
              </div>
              <div style={{ color:"#22c55e", fontSize:13, fontWeight:600 }}>
                ✓ {sessaoAcertos}/{sessaoTotal} ({pct_sess}%)
              </div>
            </div>
          </div>

          {/* Progresso */}
          <div style={{ marginBottom:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
              <span style={{ color:"#5a7a9a", fontSize:12 }}>Questão {idx+1} de {questoes.length}</span>
              <span style={{ color:"#5a7a9a", fontSize:12 }}>{q.bloco} · {q.assunto}</span>
            </div>
            <div style={{ height:4, borderRadius:2, background:"#1e3050" }}>
              <div style={{ width:`${((idx+1)/questoes.length)*100}%`, height:"100%", background:"#4a9eff", borderRadius:2, transition:"width .3s" }} />
            </div>
          </div>

          {/* Card da questão */}
          <div style={{ background:"#111d30", borderRadius:16, padding:"24px", marginBottom:16, border:"1px solid #1e3050" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <span style={{ background: bInfo?.cor || "#333", color:"#fff", borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700 }}>
                BLOCO {q.bloco}
              </span>
              <span style={{ color: q.dificuldade==="fácil" ? "#22c55e" : q.dificuldade==="média" ? "#f59e0b" : "#ef4444", fontSize:12, fontWeight:600 }}>
                {q.dificuldade.toUpperCase()}
              </span>
            </div>
            <p style={{ color:"#e8eef5", fontSize:16, lineHeight:1.6, margin:0 }}>
              {q.pergunta}
            </p>
          </div>

          {/* Opções */}
          <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:16 }}>
            {q.opcoes.map((op, i) => {
              let bg = "#111d30", border = "#1e3050", cor = "#cdd7e5";
              if (mostrarResposta) {
                if (i === q.correta) { bg = "#0f3020"; border = "#22c55e"; cor = "#4ade80"; }
                else if (i === selecionada) { bg = "#300f0f"; border = "#ef4444"; cor = "#fca5a5"; }
              } else if (selecionada === i) { bg = "#1a2d50"; border = "#4a9eff"; }
              return (
                <button key={i} onClick={() => responder(i)}
                  style={{ padding:"14px 18px", borderRadius:12, border:`2px solid ${border}`,
                    background:bg, color:cor, textAlign:"left", cursor:"pointer", fontSize:14, lineHeight:1.5,
                    display:"flex", alignItems:"flex-start", gap:12, transition:"all .15s" }}>
                  <span style={{ minWidth:26, height:26, borderRadius:13, border:`2px solid ${border}`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700,
                    background: mostrarResposta && i===q.correta ? "#22c55e" : mostrarResposta && i===selecionada ? "#ef4444" : "transparent" }}>
                    {mostrarResposta && i===q.correta ? "✓" : mostrarResposta && i===selecionada ? "✗" : ["A","B","C","D"][i]}
                  </span>
                  <span>{op}</span>
                </button>
              );
            })}
          </div>

          {/* Explicação */}
          {mostrarResposta && (
            <div style={{ background: selecionada===q.correta ? "#0a2010" : "#200a0a",
              border:`1px solid ${selecionada===q.correta ? "#22c55e" : "#ef4444"}`,
              borderRadius:12, padding:"16px 20px", marginBottom:16 }}>
              <div style={{ color: selecionada===q.correta ? "#22c55e" : "#ef4444", fontWeight:700, marginBottom:8, fontSize:14 }}>
                {selecionada===q.correta ? "✓ CORRETO!" : "✗ INCORRETO"}
              </div>
              <p style={{ color:"#cdd7e5", margin:0, fontSize:14, lineHeight:1.6 }}>{q.explicacao}</p>
            </div>
          )}

          {mostrarResposta && (
            <button onClick={proxima}
              style={{ width:"100%", padding:"16px", borderRadius:12, border:"none", cursor:"pointer",
                background:"linear-gradient(135deg, #1a5fa8, #4a9eff)", color:"#fff", fontSize:15, fontWeight:700 }}>
              {idx+1 >= questoes.length ? "VER RESULTADO FINAL" : "PRÓXIMA QUESTÃO →"}
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── RESULTADO ─────────────────────────────────────────
  if (tela === "resultado") {
    const pct_fin = sessaoTotal > 0 ? Math.round(sessaoAcertos/sessaoTotal*100) : 0;
    const aprovado = pct_fin >= 60;
    return (
      <div style={{ minHeight:"100vh", background:"#0a1628", fontFamily:"'Georgia', serif", padding:"24px 16px", display:"flex", alignItems:"center" }}>
        <div style={{ maxWidth:500, margin:"0 auto", width:"100%", textAlign:"center" }}>
          <div style={{ fontSize:60, marginBottom:16 }}>{aprovado ? "🏆" : "📚"}</div>
          <h2 style={{ color:"#fff", fontSize:26, marginBottom:8 }}>Sessão Concluída</h2>
          <div style={{ fontSize:48, fontWeight:700, color: pct_fin>=70?"#22c55e":pct_fin>=60?"#f59e0b":"#ef4444", marginBottom:8 }}>
            {pct_fin}%
          </div>
          <div style={{ color:"#8a9bb5", marginBottom:24, fontSize:15 }}>
            {sessaoAcertos} acertos em {sessaoTotal} questões · {formatarTempo(tempo)}
          </div>
          <div style={{ background:"#111d30", borderRadius:14, padding:20, marginBottom:24, border:"1px solid #1e3050" }}>
            <p style={{ color:"#cdd7e5", fontSize:14, lineHeight:1.6, margin:0 }}>
              {pct_fin >= 70 ? "Excelente desempenho! Continue com esse ritmo — você está no caminho certo para a aprovação." :
               pct_fin >= 50 ? "Bom resultado! Revise as questões erradas e foque nos pontos fracos identificados." :
               "Continue estudando. Use o modo revisão para focar nas questões que errou."}
            </p>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <button onClick={() => { iniciarQuiz(); }}
              style={{ flex:1, padding:"14px", borderRadius:12, border:"none", cursor:"pointer",
                background:"linear-gradient(135deg, #1a5fa8, #4a9eff)", color:"#fff", fontSize:14, fontWeight:700 }}>
              NOVO QUIZ
            </button>
            <button onClick={() => setTela("menu")}
              style={{ flex:1, padding:"14px", borderRadius:12, border:"1px solid #2e4570", cursor:"pointer",
                background:"#111d30", color:"#4a9eff", fontSize:14, fontWeight:600 }}>
              MENU
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── ADICIONAR QUESTÃO ─────────────────────────────────
  if (tela === "adicionar") return (
    <div style={{ minHeight:"100vh", background:"#0a1628", fontFamily:"'Georgia', serif", padding:"16px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
          <button onClick={() => setTela("menu")}
            style={{ background:"none", border:"1px solid #2e4570", color:"#8a9bb5", borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:13 }}>
            ← Voltar
          </button>
          <h2 style={{ color:"#fff", margin:0, fontSize:18 }}>Adicionar Nova Questão</h2>
        </div>

        <div style={{ background:"#111d30", borderRadius:14, padding:24, border:"1px solid #1e3050" }}>
          {[
            ["Pergunta", "pergunta", "textarea"],
            ["Assunto", "assunto", "text"],
          ].map(([label, field, type]) => (
            <div key={field} style={{ marginBottom:16 }}>
              <label style={{ color:"#8a9bb5", fontSize:12, letterSpacing:1 }}>{label.toUpperCase()}</label>
              {type === "textarea" ? (
                <textarea value={novaQ[field]} onChange={e=>setNovaQ({...novaQ,[field]:e.target.value})}
                  style={{ width:"100%", marginTop:6, padding:"10px 12px", borderRadius:8, background:"#1e3050",
                    border:"1px solid #2e4570", color:"#cdd7e5", fontSize:14, resize:"vertical", minHeight:80, boxSizing:"border-box" }} />
              ) : (
                <input type="text" value={novaQ[field]} onChange={e=>setNovaQ({...novaQ,[field]:e.target.value})}
                  style={{ width:"100%", marginTop:6, padding:"10px 12px", borderRadius:8, background:"#1e3050",
                    border:"1px solid #2e4570", color:"#cdd7e5", fontSize:14, boxSizing:"border-box" }} />
              )}
            </div>
          ))}

          <div style={{ marginBottom:16 }}>
            <label style={{ color:"#8a9bb5", fontSize:12, letterSpacing:1 }}>BLOCO</label>
            <select value={novaQ.bloco} onChange={e=>setNovaQ({...novaQ,bloco:e.target.value})}
              style={{ width:"100%", marginTop:6, padding:"10px 12px", borderRadius:8, background:"#1e3050",
                border:"1px solid #2e4570", color:"#cdd7e5", fontSize:14 }}>
              <option value="II">Bloco II — Petróleo</option>
              <option value="I">Bloco I — Eng. Básica</option>
              <option value="Mat">Matemática</option>
              <option value="III">Bloco III — Português</option>
            </select>
          </div>

          <div style={{ marginBottom:16 }}>
            <label style={{ color:"#8a9bb5", fontSize:12, letterSpacing:1 }}>OPÇÕES (A/B/C/D)</label>
            {novaQ.opcoes.map((op, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginTop:8 }}>
                <input type="radio" checked={novaQ.correta===i} onChange={()=>setNovaQ({...novaQ,correta:i})}
                  style={{ accentColor:"#22c55e" }} />
                <input type="text" value={op} placeholder={`Opção ${["A","B","C","D"][i]}`}
                  onChange={e=>{const o=[...novaQ.opcoes];o[i]=e.target.value;setNovaQ({...novaQ,opcoes:o})}}
                  style={{ flex:1, padding:"9px 12px", borderRadius:8, background:"#1e3050",
                    border:`1px solid ${novaQ.correta===i?"#22c55e":"#2e4570"}`, color:"#cdd7e5", fontSize:13 }} />
              </div>
            ))}
            <div style={{ color:"#5a7a9a", fontSize:11, marginTop:6 }}>Selecione o rádio ao lado da opção correta</div>
          </div>

          <div style={{ marginBottom:20 }}>
            <label style={{ color:"#8a9bb5", fontSize:12, letterSpacing:1 }}>EXPLICAÇÃO</label>
            <textarea value={novaQ.explicacao} onChange={e=>setNovaQ({...novaQ,explicacao:e.target.value})}
              placeholder="Explique por que a resposta está correta..."
              style={{ width:"100%", marginTop:6, padding:"10px 12px", borderRadius:8, background:"#1e3050",
                border:"1px solid #2e4570", color:"#cdd7e5", fontSize:14, resize:"vertical", minHeight:80, boxSizing:"border-box" }} />
          </div>

          <button onClick={adicionarQuestao}
            style={{ width:"100%", padding:"14px", borderRadius:12, border:"none", cursor:"pointer",
              background:"linear-gradient(135deg, #0f3020, #22c55e)", color:"#fff", fontSize:15, fontWeight:700 }}>
            ✓ ADICIONAR QUESTÃO
          </button>
        </div>
      </div>
    </div>
  );

  return null;
}
