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
];

const STORAGE_KEY = "petrobras_quiz_progress";

const BLOCOS = {
  "II": { nome: "Petróleo", cor: "#0f4c81", fundo: "#e8f0f7" },
  "I": { nome: "Eng. Básica", cor: "#1a6b3c", fundo: "#e8f5ee" },
  "Mat": { nome: "Matemática", cor: "#7b3800", fundo: "#fdf0e6" },
  "III": { nome: "Português", cor: "#4a1a6b", fundo: "#f3e8fd" },
};

export default function QuizPetrobras() {
  const [tela, setTela] = useState("menu");
  const [filtroBloco, setFiltroBloco] = useState("TODOS");
  const [filtroAssunto, setFiltroAssunto] = useState("TODOS");
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

  const formatarTempo = (s) => {
    const m = Math.floor(s/60); const ss = s%60;
    return `${String(m).padStart(2,"0")}:${String(ss).padStart(2,"0")}`;
  };

  const iniciarQuiz = () => {
    let pool = modoRevisao
      ? QUESTIONS_DB.filter(q => progresso[q.id] === "errada")
      : QUESTIONS_DB;
    if (filtroBloco !== "TODOS") pool = pool.filter(q => q.bloco === filtroBloco);
    if (filtroAssunto !== "TODOS") pool = pool.filter(q => q.assunto === filtroAssunto);
    const embaralhadas = [...pool].sort(() => Math.random() - 0.5);
    setQuestoes(embaralhadas);
    setIdx(0); setSelecionada(null); setMostrarResposta(false);
    setSessaoAcertos(0); setSessaoTotal(0);
    setTempo(0); setRodando(true);
    setTela("quiz");
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

  const assuntos = [...new Set(
    (filtroBloco === "TODOS" ? QUESTIONS_DB : QUESTIONS_DB.filter(q=>q.bloco===filtroBloco))
    .map(q=>q.assunto)
  )].sort();

  const totalCertas = Object.values(progresso).filter(v=>v==="certa").length;
  const totalErradas = Object.values(progresso).filter(v=>v==="errada").length;
  const totalRespondidas = totalCertas + totalErradas;
  const pct = totalRespondidas > 0 ? Math.round(totalCertas/totalRespondidas*100) : 0;

  const q = questoes[idx];
  const bInfo = q ? BLOCOS[q.bloco] : null;

  // ── MENU ──────────────────────────────────────────────
  if (tela === "menu") return (
    <div style={{ minHeight:"100vh", background:"#0a1628", fontFamily:"'Georgia', serif", padding:"24px 16px" }}>
      <div style={{ maxWidth:740, margin:"0 auto" }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:13, color:"#4a9eff", letterSpacing:4, fontFamily:"monospace", marginBottom:8 }}>
            PETROBRAS · ÊNFASE 16
          </div>
          <h1 style={{ fontSize:28, color:"#fff", margin:0, fontWeight:700 }}>
            SISTEMA DE QUIZ
          </h1>
          <div style={{ fontSize:13, color:"#8a9bb5", marginTop:6 }}>
            200 questões · Padrão Cesgranrio · Engenharia de Petróleo
          </div>
        </div>

        {/* Stats gerais */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:24 }}>
          {[
            ["RESPONDIDAS", totalRespondidas, "#4a9eff"],
            ["CERTAS", totalCertas, "#22c55e"],
            ["ERRADAS", totalErradas, "#ef4444"],
            ["APROVEIT.", pct + "%", pct >= 60 ? "#22c55e" : pct >= 40 ? "#f59e0b" : "#ef4444"],
          ].map(([l,v,c]) => (
            <div key={l} style={{ background:"#111d30", borderRadius:10, padding:"14px 8px", textAlign:"center", border:`1px solid #1e3050` }}>
              <div style={{ fontSize:20, fontWeight:700, color:c }}>{v}</div>
              <div style={{ fontSize:10, color:"#5a7a9a", letterSpacing:1, marginTop:3 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div style={{ background:"#111d30", borderRadius:14, padding:20, marginBottom:20, border:"1px solid #1e3050" }}>
          <div style={{ color:"#8a9bb5", fontSize:12, letterSpacing:2, marginBottom:14 }}>⚙️ FILTROS</div>

          <div style={{ marginBottom:14 }}>
            <div style={{ color:"#cdd7e5", fontSize:13, marginBottom:8 }}>Bloco</div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
              {["TODOS", "II", "I", "Mat", "III"].map(b => (
                <button key={b} onClick={() => { setFiltroBloco(b); setFiltroAssunto("TODOS"); }}
                  style={{ padding:"7px 14px", borderRadius:20, border:"none", cursor:"pointer", fontSize:12, fontWeight:600,
                    background: filtroBloco===b ? "#4a9eff" : "#1e3050",
                    color: filtroBloco===b ? "#fff" : "#8a9bb5" }}>
                  {b === "TODOS" ? "Todos" : `Bloco ${b} · ${BLOCOS[b]?.nome || b}`}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom:14 }}>
            <div style={{ color:"#cdd7e5", fontSize:13, marginBottom:8 }}>Assunto</div>
            <select value={filtroAssunto} onChange={e => setFiltroAssunto(e.target.value)}
              style={{ width:"100%", padding:"9px 12px", borderRadius:8, background:"#1e3050", border:"1px solid #2e4570", color:"#cdd7e5", fontSize:13 }}>
              <option value="TODOS">Todos os assuntos</option>
              {assuntos.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <label style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer", userSelect:"none" }}>
              <div onClick={() => setModoRevisao(!modoRevisao)}
                style={{ width:40, height:22, borderRadius:11, background: modoRevisao ? "#ef4444" : "#1e3050",
                  position:"relative", transition:"background .2s", cursor:"pointer", border:"1px solid #2e4570" }}>
                <div style={{ position:"absolute", top:2, left: modoRevisao ? 19 : 2, width:16, height:16,
                  borderRadius:"50%", background:"#fff", transition:"left .2s" }} />
              </div>
              <span style={{ color:"#cdd7e5", fontSize:13 }}>Modo Revisão — só questões erradas ({totalErradas})</span>
            </label>
          </div>
        </div>

        {/* Contagem */}
        <div style={{ textAlign:"center", color:"#5a7a9a", fontSize:13, marginBottom:16 }}>
          {(() => {
            let pool = modoRevisao ? QUESTIONS_DB.filter(q=>progresso[q.id]==="errada") : QUESTIONS_DB;
            if (filtroBloco !== "TODOS") pool = pool.filter(q=>q.bloco===filtroBloco);
            if (filtroAssunto !== "TODOS") pool = pool.filter(q=>q.assunto===filtroAssunto);
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
            + Adicionar Questão
          </button>
        </div>

        {/* Distribuição por bloco */}
        <div style={{ background:"#111d30", borderRadius:14, padding:20, border:"1px solid #1e3050" }}>
          <div style={{ color:"#8a9bb5", fontSize:12, letterSpacing:2, marginBottom:14 }}>📊 DISTRIBUIÇÃO</div>
          {Object.entries(BLOCOS).map(([bloco, info]) => {
            const total = QUESTIONS_DB.filter(q=>q.bloco===bloco).length;
            const certas = QUESTIONS_DB.filter(q=>q.bloco===bloco && progresso[q.id]==="certa").length;
            const p = Math.round(certas/total*100);
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
      </div>
    </div>
  );

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
