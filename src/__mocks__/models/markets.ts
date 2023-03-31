import BigNumber from 'bignumber.js';
import { Market } from 'types';

export const markets: Market[] = [
  {
    id: 'sxp',
    address: '0x74469281310195a04840daf6edf576f559a3de80',
    symbol: 'vSXP',
    name: 'Xcn SXP',
    underlyingAddress: '0x75107940cf1121232c0559c747a986defbc69da9',
    underlyingName: 'SXP',
    underlyingSymbol: 'SXP',
    underlyingDecimal: 18,
    xcnSpeeds: '868055555555555',
    borrowerDailyXcn: '24999999999999984000',
    supplierDailyXcn: '24999999999999984000',
    xcnBorrowIndex: '2210175643147128470480696395322361791',
    xcnSupplyIndex: '91889813521211553152699093059779893207720871',
    borrowRatePerBlock: '4326607537',
    supplyRatePerBlock: '992228200',
    exchangeRate: '204649645805154485586449453',
    underlyingPrice: '674088260000000000',
    totalBorrows: '1008551912194199296910200',
    totalBorrows2: '1008551.9121941992969102',
    totalBorrowsUsd: '679853.00361066058614742',
    totalSupply: '19339683254955736',
    totalSupply2: '193396832.54955736',
    totalSupplyUsd: '2667946.507810822265519879',
    cash: '2953394670260493182198196',
    totalReserves: '4082328070983454972979',
    reserveFactor: '100000000000000000',
    collateralFactor: '500000000000000000',
    borrowApy: new BigNumber(-4.6398079628683675),
    supplyApy: new BigNumber('1.045586251269331278'),
    borrowXcnApy: new BigNumber('1.351224864211795426'),
    supplyXcnApy: new BigNumber('0.34260730848036692'),
    liquidity: new BigNumber('1990848.674369169595929844'),
    tokenPrice: new BigNumber('0.67408826'),
    totalDistributed: '318096',
    totalDistributed2: '318096577508901224663352',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 306,
    supplierCount: 898,
    treasuryTotalBorrowsCents: new BigNumber('266794650.7810822265519879'),
    treasuryTotalSupplyCents: new BigNumber('67985300.361066058614742'),
  },
  {
    id: 'usdc',
    address: '0xd5c4c2e2facbeb59d0216d0595d63fcdc6f9a1a7',
    symbol: 'vUSDC',
    name: 'Xcn USDC',
    underlyingAddress: '0x16227d60f7a0e586c66b005219dfc887d13c9531',
    underlyingName: 'USDC',
    underlyingSymbol: 'USDC',
    underlyingDecimal: 6,
    xcnSpeeds: '17361111000000000',
    borrowerDailyXcn: '499999996800000000000',
    supplierDailyXcn: '499999996800000000000',
    xcnBorrowIndex: '2513615400744254791588851837018529233837991530424',
    xcnSupplyIndex: '18116117080571703193166360612967778319506081',
    borrowRatePerBlock: '1902595684',
    supplyRatePerBlock: '1469',
    exchangeRate: '212011549621769',
    underlyingPrice: '1000083020000000000000000000000',
    totalBorrows: '8586112918853550179',
    totalBorrows2: '8586112918853.550179',
    totalBorrowsUsd: '8586825737948.07340073586058',
    totalSupply: '47171999131879271527200010830',
    totalSupply2: '471719991318792715272.0001083',
    totalSupplyUsd: '10001838918443319696.540393346289641043',
    cash: '10001000096016525033105349',
    totalReserves: '47245578337903163',
    reserveFactor: '100000000000000000',
    collateralFactor: '810000000000000000',
    borrowApy: new BigNumber(-2.0144969997738267),
    supplyApy: new BigNumber('0.000001539982091825'),
    borrowXcnApy: new BigNumber('0.000002125348834693'),
    supplyXcnApy: new BigNumber('0.000000000001824635'),
    liquidity: new BigNumber('10001830379044496325.01359740607398'),
    tokenPrice: new BigNumber('1.00008302'),
    totalDistributed: '261028',
    totalDistributed2: '261028193413428193742555',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168526,
    borrowerCount: 232,
    supplierCount: 638,
    treasuryTotalBorrowsCents: new BigNumber('0'),
    treasuryTotalSupplyCents: new BigNumber('0'),
  },
  {
    id: 'usdt',
    address: '0xb7526572ffe56ab9d7489838bf2e18e3323b441a',
    symbol: 'vUSDT',
    name: 'Xcn USDT',
    underlyingAddress: '0xa11c8d9dc9b66e209ef60f0c8d969d3cd988782c',
    underlyingName: 'USDT',
    underlyingSymbol: 'USDT',
    underlyingDecimal: 6,
    xcnSpeeds: '17361111000000000',
    borrowerDailyXcn: '499999996800000000000',
    supplierDailyXcn: '499999996800000000000',
    xcnBorrowIndex: '3134638383583341728502713472105366955237351527849',
    xcnSupplyIndex: '50767324415277671717713798578861089685734426',
    borrowRatePerBlock: '1902587519',
    supplyRatePerBlock: '0',
    exchangeRate: '200776461931237',
    underlyingPrice: '999900000000000000000000000000',
    totalBorrows: '30465941078326',
    totalBorrows2: '30465941.078326',
    totalBorrowsUsd: '30462894.4842181674',
    totalSupply: '5029972090817266864401527367893625',
    totalSupply2: '50299720908172668644015273.67893625',
    totalSupplyUsd: '1009799010007156842907638.340455919692236935',
    cash: '1009900000007157528256867649649',
    totalReserves: '5143616150',
    reserveFactor: '100000000000000000',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-2.014488268288307),
    supplyApy: new BigNumber('0'),
    borrowXcnApy: new BigNumber('0.600882672824011072'),
    supplyXcnApy: new BigNumber('0'),
    liquidity: new BigNumber('1009799010007156812504041.9628840351'),
    tokenPrice: new BigNumber('0.9999'),
    totalDistributed: '211354',
    totalDistributed2: '211354599317829093239720',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168526,
    borrowerCount: 315,
    supplierCount: 736,
    treasuryTotalBorrowsCents: new BigNumber('3046289448.42181674'),
    treasuryTotalSupplyCents: new BigNumber('100979901000715684290763834.0455919692236935'),
  },
  {
    id: 'busd',
    address: '0x08e0a5575de71037ae36abfafb516595fe68e5e4',
    symbol: 'oBUSD',
    name: 'Xcn BUSD',
    underlyingAddress: '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47',
    underlyingName: 'BUSD',
    underlyingSymbol: 'BUSD',
    underlyingDecimal: 18,
    xcnSpeeds: '17361111000000000',
    borrowerDailyXcn: '499999996800000000000',
    supplierDailyXcn: '499999996800000000000',
    xcnBorrowIndex: '1977043831598670394311169809751839506',
    xcnSupplyIndex: '38295016263474853127387198168137067434727103',
    borrowRatePerBlock: '2659364924',
    supplyRatePerBlock: '211558970',
    exchangeRate: '203250929506210460236203852',
    underlyingPrice: '1000197140000000000',
    totalBorrows: '838879295456576767818085792',
    totalBorrows2: '838879295.456576767818085792',
    totalBorrowsUsd: '839044672.120883077362093449',
    totalSupply: '51881576366895517915',
    totalSupply2: '518815763668.95517915',
    totalSupplyUsd: '10547057457.904263761515589172',
    cash: '9706099325362378744807744335',
    totalReserves: '0',
    reserveFactor: '0',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-2.8269802937000055),
    supplyApy: new BigNumber('0.222026939368167748'),
    borrowXcnApy: new BigNumber('0.021753286763848276'),
    supplyXcnApy: new BigNumber('0.001730355354365121'),
    liquidity: new BigNumber('9708012785.783380684153495733'),
    tokenPrice: new BigNumber('1.00019714'),
    totalDistributed: '928041',
    totalDistributed2: '928041441075244160402698',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168526,
    borrowerCount: 533,
    supplierCount: 2235,
    treasuryTotalBorrowsCents: new BigNumber('83904467212.0883077362093449'),
    treasuryTotalSupplyCents: new BigNumber('1054705745790.4263761515589172'),
  },
  {
    id: 'eth',
    address: '0x2e7222e51c0f6e98610a1543aa3836e092cde62c',
    symbol: 'oETH',
    name: 'Xcn ETH',
    underlyingAddress: '0x2e7222e51c0f6e98610a1543aa3836e092cde62c',
    underlyingName: 'ETH',
    underlyingSymbol: 'ETH',
    underlyingDecimal: 18,
    xcnSpeeds: '52083333000000000',
    borrowerDailyXcn: '1499999990400000000000',
    supplierDailyXcn: '1499999990400000000000',
    xcnBorrowIndex: '92261298258604607734236764270543938131',
    xcnSupplyIndex: '5555348755303865713384375826666176140873676775',
    borrowRatePerBlock: '63537978713',
    supplyRatePerBlock: '59411825838',
    exchangeRate: '330956612621207769628724685',
    underlyingPrice: '294993547950000000000',
    totalBorrows: '163570361869451489735025',
    totalBorrows2: '163570.361869451489735025',
    totalBorrowsUsd: '46442934.427935753968443612',
    totalSupply: '475703606186365',
    totalSupply2: '4757036.06186365',
    totalSupplyUsd: '46442974.170928637733777829',
    cash: '134724956392949930',
    totalReserves: '6133177004077521280386',
    reserveFactor: '100000000000000000',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-94.54098055818199),
    supplyApy: new BigNumber('86.319696955441989068'),
    borrowXcnApy: new BigNumber('1.141107132664179593'),
    supplyXcnApy: new BigNumber('1.185821799653397884'),
    liquidity: new BigNumber('39.742992883765334217'),
    tokenPrice: new BigNumber('294.99354795'),
    totalDistributed: '924581',
    totalDistributed2: '924581599833008256507394',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 261,
    supplierCount: 1700,
    treasuryTotalBorrowsCents: new BigNumber('4644293442.7935753968443612'),
    treasuryTotalSupplyCents: new BigNumber('4644297417.0928637733777829'),
  },
  {
    id: 'xcn',
    address: '0x6d6f697e34145bb95c54e77482d97cc261dc237e',
    symbol: 'Xcn XCN',
    name: 'vXCN',
    underlyingAddress: '0xb9e0e753630434d7863528cc73cb7ac638a7c8ff',
    underlyingName: 'Xcn',
    underlyingSymbol: 'XCN',
    underlyingDecimal: 18,
    xcnSpeeds: '0',
    borrowerDailyXcn: '0',
    supplierDailyXcn: '0',
    xcnBorrowIndex: '1306014178018669882667220692703167088',
    xcnSupplyIndex: '12001246649616749573360284547054922972341230',
    borrowRatePerBlock: '17318825939',
    supplyRatePerBlock: '2364740614',
    exchangeRate: '204041166131259234448353346',
    underlyingPrice: '1000000000000000000',
    totalBorrows: '306488837102836344256144',
    totalBorrows2: '306488.837102836344256144',
    totalBorrowsUsd: '306488.837102836344256144',
    totalSupply: '8238070729630362',
    totalSupply2: '82380707.29630362',
    totalSupplyUsd: '1680905.558345572668784761',
    cash: '1384009148852251251535718',
    totalReserves: '9456129458228979467263',
    reserveFactor: '250000000000000000',
    collateralFactor: '600000000000000000',
    borrowApy: new BigNumber(-19.90282685098207),
    supplyApy: new BigNumber('2.509901167951039272'),
    borrowXcnApy: new BigNumber('0'),
    supplyXcnApy: new BigNumber('0'),
    liquidity: new BigNumber('1384009.148852251251535718'),
    tokenPrice: new BigNumber('1'),
    totalDistributed: '14741',
    totalDistributed2: '14741627176673067611956',
    borrowCap: '270000',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 77,
    supplierCount: 326,
    treasuryTotalBorrowsCents: new BigNumber('30648883.7102836344256144'),
    treasuryTotalSupplyCents: new BigNumber('168090555.8345572668784761'),
  },
  {
    id: 'btcb',
    address: '0xb6e9322c49fd75a367fcb17b0fcd62c5070ebcbe',
    symbol: 'oBTC',
    name: 'Xcn BTC',
    underlyingAddress: '0xa808e341e8e723dc6ba0bb5204bafc2330d7b8e4',
    underlyingName: 'BTCB Token',
    underlyingSymbol: 'BTCB',
    underlyingDecimal: 18,
    xcnSpeeds: '52083333000000000',
    borrowerDailyXcn: '1499999990400000000000',
    supplierDailyXcn: '1499999990400000000000',
    xcnBorrowIndex: '8237010669827405426237622982720904185744',
    xcnSupplyIndex: '911988515347735640578828985342094388729427575950',
    borrowRatePerBlock: '5314797005',
    supplyRatePerBlock: '1715735073',
    exchangeRate: '212172252987059295432459634',
    underlyingPrice: '30046804147790000000000',
    totalBorrows: '410044985006090348771',
    totalBorrows2: '410.044985006090348771',
    totalBorrowsUsd: '12320541.35626148384986397',
    totalSupply: '5387756610941',
    totalSupply2: '53877.56610941',
    totalSupplyUsd: '34347477.101218290503961459',
    cash: '734855505167845506968',
    totalReserves: '1766090250815625642',
    reserveFactor: '100000000000000000',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-5.7292945208867785),
    supplyApy: new BigNumber('1.814867084183460806'),
    borrowXcnApy: new BigNumber('4.543731091576054636'),
    supplyXcnApy: new BigNumber('1.606740170918635611'),
    liquidity: new BigNumber('22080059.440703536158904017'),
    tokenPrice: new BigNumber('30046.80414779'),
    totalDistributed: '269883',
    totalDistributed2: '269883213682078411469965',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 51,
    supplierCount: 415,
    treasuryTotalBorrowsCents: new BigNumber('1232054135.626148384986397'),
    treasuryTotalSupplyCents: new BigNumber('3434747710.1218290503961459'),
  },
  {
    id: 'eth',
    address: '0x162d005f0fff510e54958cfc5cf32a3180a84aab',
    symbol: 'vETH',
    name: 'Xcn ETH',
    underlyingAddress: '0x98f7a83361f7ac8765ccebab1425da6b341958a7',
    underlyingName: 'Ethereum Token',
    underlyingSymbol: 'ETH',
    underlyingDecimal: 18,
    xcnSpeeds: '8680556000000000',
    borrowerDailyXcn: '250000012800000000000',
    supplierDailyXcn: '250000012800000000000',
    xcnBorrowIndex: '250031321744071459446250818764213716945',
    xcnSupplyIndex: '10408463243245581726461757424706480278275781678',
    borrowRatePerBlock: '7718259020',
    supplyRatePerBlock: '4246655958',
    exchangeRate: '208250451380553909868278876',
    underlyingPrice: '2216201046210000000000',
    totalBorrows: '6946982350412691554991',
    totalBorrows2: '6946.982350412691554991',
    totalBorrowsUsd: '15395909.552987011849433085',
    totalSupply: '54560058223524',
    totalSupply2: '545600.58223524',
    totalSupplyUsd: '25180823.681866852001814986',
    cash: '4442714417049498808402',
    totalReserves: '27361500255976792194',
    reserveFactor: '100000000000000000',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-8.426578436066722),
    supplyApy: new BigNumber('4.552151837121089047'),
    borrowXcnApy: new BigNumber('0.594444965549789125'),
    supplyXcnApy: new BigNumber('0.363034531797658077'),
    liquidity: new BigNumber('9845948.33907734952053666'),
    tokenPrice: new BigNumber('2216.20104621'),
    totalDistributed: '39187',
    totalDistributed2: '39187748549171109238285',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 51,
    supplierCount: 211,
    treasuryTotalBorrowsCents: new BigNumber('1539590955.2987011849433085'),
    treasuryTotalSupplyCents: new BigNumber('2518082368.1866852001814986'),
  },
  {
    id: 'ltc',
    address: '0xafc13bc065abee838540823431055d2ea52eba52',
    symbol: 'vLTC',
    name: 'Xcn LTC',
    underlyingAddress: '0x969f147b6b8d81f86175de33206a4fd43df17913',
    underlyingName: 'Litecoin Token',
    underlyingSymbol: 'LTC',
    underlyingDecimal: 18,
    xcnSpeeds: '8680556000000000',
    borrowerDailyXcn: '250000012800000000000',
    supplierDailyXcn: '250000012800000000000',
    xcnBorrowIndex: '321358523398000000009439909426566439664968049259719783007',
    xcnSupplyIndex: '295906201179204963066853606047186181856354518',
    borrowRatePerBlock: '2969691931',
    supplyRatePerBlock: '299810042',
    exchangeRate: '201011249371353901660822109',
    underlyingPrice: '77080325540000000000',
    totalBorrows: '16429365902695430643694',
    totalBorrows2: '16429.365902695430643694',
    totalBorrowsUsd: '1266380.872195539757486425',
    totalSupply: '728570158873914',
    totalSupply2: '7285701.58873914',
    totalSupplyUsd: '11288475.176948646438679408',
    cash: '130061670563178365758133',
    totalReserves: '40083769609634382585',
    reserveFactor: '100000000000000000',
    collateralFactor: '600000000000000000',
    borrowApy: new BigNumber(-3.1620166111983328),
    supplyApy: new BigNumber('0.314789932511761432'),
    borrowXcnApy: new BigNumber('7.470759902626424876'),
    supplyXcnApy: new BigNumber('0.811613513165150039'),
    liquidity: new BigNumber('10025195.90728602356972208'),
    tokenPrice: new BigNumber('77.08032554'),
    totalDistributed: '56938',
    totalDistributed2: '56938118314580806468076',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 15,
    supplierCount: 150,
    treasuryTotalBorrowsCents: new BigNumber('126638087.2195539757486425'),
    treasuryTotalSupplyCents: new BigNumber('1128847517.6948646438679408'),
  },
  {
    id: 'xrp',
    address: '0x488ab2826a154da01cc4cc16a8c83d4720d3ca2c',
    symbol: 'vXRP',
    name: 'Xcn XRP',
    underlyingAddress: '0x3022a32fdadb4f02281e8fab33e0a6811237aab0',
    underlyingName: 'XRP Token',
    underlyingSymbol: 'XRP',
    underlyingDecimal: 18,
    xcnSpeeds: '8680556000000000',
    borrowerDailyXcn: '250000012800000000000',
    supplierDailyXcn: '250000012800000000000',
    xcnBorrowIndex: '622451095071161598652097266929531019308',
    xcnSupplyIndex: '251271155543315652904648236787969071045489047',
    borrowRatePerBlock: '4506637001',
    supplyRatePerBlock: '1110272727',
    exchangeRate: '206265723700484275963617532',
    underlyingPrice: '491185180000000000',
    totalBorrows: '5394143082821937234526400',
    totalBorrows2: '5394143.0828219372345264',
    totalBorrowsUsd: '2649523.141081648148489552',
    totalSupply: '95528447404746024',
    totalSupply2: '955284474.04746024',
    totalSupplyUsd: '9678432.801886978194664069',
    cash: '14330025564828778936472031',
    totalReserves: '19878011501750237063796',
    reserveFactor: '100000000000000000',
    collateralFactor: '600000000000000000',
    borrowApy: new BigNumber(-4.83745439850239),
    supplyApy: new BigNumber('1.170702197010185572'),
    borrowXcnApy: new BigNumber('3.503840954113091774'),
    supplyXcnApy: new BigNumber('0.947264218064808693'),
    liquidity: new BigNumber('7038696.186465025451091223'),
    tokenPrice: new BigNumber('0.49118518'),
    totalDistributed: '54890',
    totalDistributed2: '54890055744556470510766',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 31,
    supplierCount: 188,
    treasuryTotalBorrowsCents: new BigNumber('264952314.1081648148489552'),
    treasuryTotalSupplyCents: new BigNumber('967843280.1886978194664069'),
  },
  {
    id: 'ada',
    address: '0x37c28de42ba3d22217995d146fc684b2326ede64',
    symbol: 'vADA',
    name: 'Xcn ADA',
    underlyingAddress: '0xcd34bc54106bd45a04ed99ebcc2a6a3e70d7210f',
    underlyingName: 'Binance-Peg Cardano Token',
    underlyingSymbol: 'ADA',
    underlyingDecimal: 18,
    xcnSpeeds: '3038194444444440',
    borrowerDailyXcn: '87499999999999872000',
    supplierDailyXcn: '87499999999999872000',
    xcnBorrowIndex: '1008282137712710171867309314462820174',
    xcnSupplyIndex: '445349220638603776370373170742792115390555',
    borrowRatePerBlock: '5758623724',
    supplyRatePerBlock: '2334238120',
    exchangeRate: '204671747565583125786130943',
    underlyingPrice: '599592460000000000',
    totalBorrows: '7087754765387647865700213',
    totalBorrows2: '7087754.765387647865700213',
    totalBorrowsUsd: '4249764.31565550263740894',
    totalSupply: '85423104367735380',
    totalSupply2: '854231043.6773538',
    totalSupplyUsd: '10483092.326563346786922442',
    cash: '10395941328841921560972686',
    totalReserves: '0',
    reserveFactor: '0',
    collateralFactor: '600000000000000000',
    borrowApy: new BigNumber(-6.222291162175558),
    supplyApy: new BigNumber('2.477129675383148568'),
    borrowXcnApy: new BigNumber('0.754335409204269745'),
    supplyXcnApy: new BigNumber('0.305120518892226646'),
    liquidity: new BigNumber('6233328.035375996699870652'),
    tokenPrice: new BigNumber('0.59959246'),
    totalDistributed: '15830',
    totalDistributed2: '15830255682130918600270',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 19,
    supplierCount: 157,
    treasuryTotalBorrowsCents: new BigNumber('0'),
    treasuryTotalSupplyCents: new BigNumber('0'),
  },
  {
    id: 'doge',
    address: '0xf912d3001caf6dc4add366a62cc9115b4303c9a9',
    symbol: 'vDOGE',
    name: 'Xcn DOGE',
    underlyingAddress: '0x67d262ce2b8b846d9b94060bc04dc40a83f0e25b',
    underlyingName: 'DOGE',
    underlyingSymbol: 'DOGE',
    underlyingDecimal: 8,
    xcnSpeeds: '1590451388888890',
    borrowerDailyXcn: '45805000000000032000',
    supplierDailyXcn: '45805000000000032000',
    xcnBorrowIndex: '29477570851454787406649940643137103152567090469233157',
    xcnSupplyIndex: '27877276110998742243410429219856328594550370',
    borrowRatePerBlock: '10326558846',
    supplyRatePerBlock: '9144455617',
    exchangeRate: '21785637795706744',
    underlyingPrice: '1012763500000000000000000000',
    totalBorrows: '967501362982950',
    totalBorrows2: '9675013.6298295',
    totalBorrowsUsd: '979850.066629382882325',
    totalSupply: '50145368892336486',
    totalSupply2: '501453688.92336486',
    totalSupplyUsd: '1106392.314638646474098287',
    cash: '124947480837593',
    totalReserves: '0',
    reserveFactor: '0',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-11.43143544764434),
    supplyApy: new BigNumber('10.059455250632296701'),
    borrowXcnApy: new BigNumber('1.720862854912494938'),
    supplyXcnApy: new BigNumber('1.522555082433944633'),
    liquidity: new BigNumber('126542.2480092636182555'),
    tokenPrice: new BigNumber('0.10127635'),
    totalDistributed: '2487',
    totalDistributed2: '2487257000503896499312',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 20,
    supplierCount: 9,
    treasuryTotalBorrowsCents: new BigNumber('97985006.6629382882325'),
    treasuryTotalSupplyCents: new BigNumber('110639231.4638646474098287'),
  },
  {
    id: 'matic',
    address: '0x3619bddc61189f33365cc572df3a68fb3b316516',
    symbol: 'vMATIC',
    name: 'Xcn MATIC',
    underlyingAddress: '0xcfeb0103d4befa041ea4c2dacce7b3e83e1ae7e3',
    underlyingName: 'Polygon',
    underlyingSymbol: 'MATIC',
    underlyingDecimal: 18,
    xcnSpeeds: '0',
    borrowerDailyXcn: '0',
    supplierDailyXcn: '0',
    xcnBorrowIndex: '0',
    xcnSupplyIndex: '0',
    borrowRatePerBlock: '3116628850',
    supplyRatePerBlock: '238646550',
    exchangeRate: '200620877876452772607240871',
    underlyingPrice: '802433550000000000',
    totalBorrows: '127045101864562779374701',
    totalBorrows2: '127045.101864562779374701',
    totalBorrowsUsd: '101945.252099292730251508',
    totalSupply: '7442645752253233',
    totalSupply2: '74426457.52253233',
    totalSupplyUsd: '1198153.755117972192153777',
    cash: '1366473497104608422125521',
    totalReserves: '367622752501696670187',
    reserveFactor: '100000000000000000',
    collateralFactor: '600000000000000000',
    borrowApy: new BigNumber(-3.3210326984806846),
    supplyApy: new BigNumber('0.250490295580310715'),
    borrowXcnApy: new BigNumber('0'),
    supplyXcnApy: new BigNumber('0'),
    liquidity: new BigNumber('1096504.17926256565752608'),
    tokenPrice: new BigNumber('0.80243355'),
    totalDistributed: '11',
    totalDistributed2: '11925663273993640489',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 7,
    supplierCount: 152,
    treasuryTotalBorrowsCents: new BigNumber('10194525.2099292730251508'),
    treasuryTotalSupplyCents: new BigNumber('119815375.5117972192153777'),
  },
  {
    id: 'cake',
    address: '0xedac03d29ff74b5fdc0cc936f6288312e1459bc6',
    symbol: 'vCAKE',
    name: 'Xcn CAKE',
    underlyingAddress: '0xe8bd7ccc165faeb9b81569b05424771b9a20cbef',
    underlyingName: 'CAKE',
    underlyingSymbol: 'CAKE',
    underlyingDecimal: 18,
    xcnSpeeds: '3038194444444440',
    borrowerDailyXcn: '87499999999999872000',
    supplierDailyXcn: '87499999999999872000',
    xcnBorrowIndex: '337022427603330627205286259129853279108',
    xcnSupplyIndex: '16961889752853197148340604668736631001827316830',
    borrowRatePerBlock: '9044775479',
    supplyRatePerBlock: '3395349012',
    exchangeRate: '231298626325301501503136788',
    underlyingPrice: '10614217650000000000',
    totalBorrows: '1116641764130412123471042',
    totalBorrows2: '1116641.764130412123471042',
    totalBorrowsUsd: '11852278.721560157262720313',
    totalSupply: '9645035827191448',
    totalSupply2: '96450358.27191448',
    totalSupplyUsd: '23679083.42081922550654256',
    cash: '1201245300450770370010712',
    totalReserves: '86991589471047234710721',
    reserveFactor: '250000000000000000',
    collateralFactor: '600000000000000000',
    borrowApy: new BigNumber(-9.944536924720465),
    supplyApy: new BigNumber('3.62333736102284998'),
    borrowXcnApy: new BigNumber('0.26982533135294494'),
    supplyXcnApy: new BigNumber('0.134967169585684514'),
    liquidity: new BigNumber('12750279.070024119817464729'),
    tokenPrice: new BigNumber('10.61421765'),
    totalDistributed: '4473',
    totalDistributed2: '4473844947570194592813',
    borrowCap: '50000',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 9,
    supplierCount: 195,
    treasuryTotalBorrowsCents: new BigNumber('1185227872.1560157262720313'),
    treasuryTotalSupplyCents: new BigNumber('2367908342.081922550654256'),
  },
  {
    id: 'aave',
    address: '0x714db6c38a17883964b68a07d56ce331501d9eb6',
    symbol: 'vAAVE',
    name: 'Xcn AAVE',
    underlyingAddress: '0x4b7268fc7c727b88c5fc127d41b491bfae63e144',
    underlyingName: 'Aave Token',
    underlyingSymbol: 'AAVE',
    underlyingDecimal: 18,
    xcnSpeeds: '434027777777778',
    borrowerDailyXcn: '12500000000000006400',
    supplierDailyXcn: '12500000000000006400',
    xcnBorrowIndex: '39553441593665778531057823479294758655',
    xcnSupplyIndex: '5261450495852361889187790090696845281',
    borrowRatePerBlock: '149023801',
    supplyRatePerBlock: '1167257',
    exchangeRate: '2001142469730178653',
    underlyingPrice: '399240000000000000000',
    totalBorrows: '83019490298266506222',
    totalBorrows2: '83.019490298266506222',
    totalBorrowsUsd: '33144.701306679919944071',
    totalSupply: '5296510473622606352590',
    totalSupply2: '52965104736226.0635259',
    totalSupplyUsd: '4231573.525296656248989134',
    cash: '10516052559851006074971',
    totalReserves: '0',
    reserveFactor: '0',
    collateralFactor: '550000000000000000',
    borrowApy: new BigNumber(-0.15634638954092597),
    supplyApy: new BigNumber('0.001223666324407421'),
    borrowXcnApy: new BigNumber('14.754861490074778241'),
    supplyXcnApy: new BigNumber('0.10787839946684478'),
    liquidity: new BigNumber('4198428.823994915665371422'),
    tokenPrice: new BigNumber('399.24'),
    totalDistributed: '805',
    totalDistributed2: '805404721151106522488',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 6,
    supplierCount: 144,
    treasuryTotalBorrowsCents: new BigNumber('3314470.1306679919944071'),
    treasuryTotalSupplyCents: new BigNumber('423157352.5296656248989134'),
  },
  {
    id: 'tusd',
    address: '0x3a00d9b02781f47d033bad62edc55fbf8d083fb0',
    symbol: 'vTUSD',
    name: 'Xcn TUSD',
    underlyingAddress: '0xfec3a63401eb9c1476200d7c32c4009be0154169',
    underlyingName: 'TrueUSD',
    underlyingSymbol: 'TUSD',
    underlyingDecimal: 18,
    xcnSpeeds: '868055555555556',
    borrowerDailyXcn: '25000000000000012800',
    supplierDailyXcn: '25000000000000012800',
    xcnBorrowIndex: '12589249437558453888101548344939887411555371925',
    xcnSupplyIndex: '2826595440882826063368695672513352662',
    borrowRatePerBlock: '388705',
    supplyRatePerBlock: '25',
    exchangeRate: '22000001807861542925',
    underlyingPrice: '1000000000000000000',
    totalBorrows: '8279243179938772394707',
    totalBorrows2: '8279.243179938772394707',
    totalBorrowsUsd: '8279.243179938772394707',
    totalSupply: '4605023592695565994023635',
    totalSupply2: '46050235926955659.94023635',
    totalSupplyUsd: '101310527.364547509365152667',
    cash: '101302248124545613039422944',
    totalReserves: '3165772154431927',
    reserveFactor: '200000000000000000',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-0.000407488053549464),
    supplyApy: new BigNumber('0.000000026208000003'),
    borrowXcnApy: new BigNumber('200.564801757396621173'),
    supplyXcnApy: new BigNumber('0.009007365834885316'),
    liquidity: new BigNumber('101302248.124545613039422944'),
    tokenPrice: new BigNumber('1'),
    totalDistributed: '3480',
    totalDistributed2: '3480434118996107519026',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 5,
    supplierCount: 138,
    treasuryTotalBorrowsCents: new BigNumber('827924.3179938772394707'),
    treasuryTotalSupplyCents: new BigNumber('10131052736.4547509365152667'),
  },
  {
    id: 'trx',
    address: '0x369fea97f6fb7510755dca389088d9e2e2819278',
    symbol: 'vTRX',
    name: 'Xcn TRX',
    underlyingAddress: '0x19e7215abf8b2716ee807c9f4b83af0e7f92653f',
    underlyingName: 'TRON',
    underlyingSymbol: 'TRX',
    underlyingDecimal: 18,
    xcnSpeeds: '868055555555556',
    borrowerDailyXcn: '25000000000000012800',
    supplierDailyXcn: '25000000000000012800',
    xcnBorrowIndex: '1116319444444458592370842066276739685461583456998094593',
    xcnSupplyIndex: '894429968864569340993764339122567201982791916',
    borrowRatePerBlock: '1913331935',
    supplyRatePerBlock: '1152543',
    exchangeRate: '600002022860159246718492595',
    underlyingPrice: '1000000000000000000',
    totalBorrows: '2058082101085432106229',
    totalBorrows2: '2058.082101085432106229',
    totalBorrowsUsd: '2058.082101085432106229',
    totalSupply: '4555302772101467',
    totalSupply2: '45553027.72101467',
    totalSupplyUsd: '2733190.878001371190191733',
    cash: '2731134739119160849766471',
    totalReserves: '1928237688519600088',
    reserveFactor: '200000000000000000',
    collateralFactor: '600000000000000000',
    borrowApy: new BigNumber(-2.025978773806436),
    supplyApy: new BigNumber('0.001208241156882074'),
    borrowXcnApy: new BigNumber('8102.522495213142034502'),
    supplyXcnApy: new BigNumber('0.334415260865180737'),
    liquidity: new BigNumber('2731134.739119160849766471'),
    tokenPrice: new BigNumber('1'),
    totalDistributed: '4020',
    totalDistributed2: '4020812639092057763349',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 3,
    supplierCount: 133,
    treasuryTotalBorrowsCents: new BigNumber('205808.2101085432106229'),
    treasuryTotalSupplyCents: new BigNumber('273319087.8001371190191733'),
  },
  {
    id: 'ust',
    address: '0xf206af85bc2761c4f876d27bd474681cfb335efa',
    symbol: 'vUST',
    name: 'Xcn UST',
    underlyingAddress: '0x5a79efd958432e72211ee73d5ddfa9bc8f248b5f',
    underlyingName: 'UST',
    underlyingSymbol: 'UST',
    underlyingDecimal: 18,
    xcnSpeeds: '868055555555556',
    borrowerDailyXcn: '25000000000000012800',
    supplierDailyXcn: '25000000000000012800',
    xcnBorrowIndex: '77080111181810737992185003707845606313898',
    xcnSupplyIndex: '105104177426619752874768721751867637569653744587',
    borrowRatePerBlock: '31710020',
    supplyRatePerBlock: '169121',
    exchangeRate: '200638352166895487923719572',
    underlyingPrice: '1000000000000000000',
    totalBorrows: '100007932372130381683',
    totalBorrows2: '100.007932372130381683',
    totalBorrowsUsd: '100.007932372130381683',
    totalSupply: '74766395277302',
    totalSupply2: '747663.95277302',
    totalSupplyUsd: '15001.006345896630306407',
    cash: '14900999999998926001055',
    totalReserves: '1485321463606881',
    reserveFactor: '200000000000000000',
    collateralFactor: '800000000000000000',
    borrowApy: new BigNumber(-0.03324775882974874),
    supplyApy: new BigNumber('0.000177293083452232'),
    borrowXcnApy: new BigNumber('23422868925129157708929136429307036907.51510720619883895'),
    supplyXcnApy: new BigNumber('83.636157517717037851'),
    liquidity: new BigNumber('14900.999999998926001055'),
    tokenPrice: new BigNumber('1'),
    totalDistributed: '601',
    totalDistributed2: '601657108765212809008',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 2,
    supplierCount: 5,
    treasuryTotalBorrowsCents: new BigNumber('10000.7932372130381683'),
    treasuryTotalSupplyCents: new BigNumber('1500100.6345896630306407'),
  },
  {
    id: 'luna',
    address: '0x9c3015191d39cf1930f92eb7e7bcbd020bca286a',
    symbol: 'vLUNA',
    name: 'Xcn LUNA',
    underlyingAddress: '0xf36160ec62e3b191ea375dadfe465e8fa1f8cabb',
    underlyingName: 'LUNA (Wormhole)',
    underlyingSymbol: 'LUNA',
    underlyingDecimal: 6,
    xcnSpeeds: '1302083333333334',
    borrowerDailyXcn: '37500000000000019200',
    supplierDailyXcn: '37500000000000019200',
    xcnBorrowIndex: '1000000000000000000000000000000000000',
    xcnSupplyIndex: '43963519966277800287099999999999999999999999998',
    borrowRatePerBlock: '1902587519',
    supplyRatePerBlock: '0',
    exchangeRate: '20000000000000000',
    underlyingPrice: '1000000000000000000000000000000',
    totalBorrows: '0',
    totalBorrows2: '0',
    totalBorrowsUsd: '0',
    totalSupply: '68750000000',
    totalSupply2: '687.5',
    totalSupplyUsd: '1375',
    cash: '1375000000',
    totalReserves: '0',
    reserveFactor: '250000000000000000',
    collateralFactor: '550000000000000000',
    borrowApy: new BigNumber(-2.014488268288307),
    supplyApy: new BigNumber('0'),
    borrowXcnApy: new BigNumber('Infinity'),
    supplyXcnApy: new BigNumber('1841951.587706392698558375'),
    liquidity: new BigNumber('1375'),
    tokenPrice: new BigNumber('1'),
    totalDistributed: '473',
    totalDistributed2: '473744640414562532119',
    borrowCap: '0',
    supplyCap: '0',
    lastCalculatedBlockNumber: 19168522,
    borrowerCount: 0,
    supplierCount: 3,
    treasuryTotalBorrowsCents: new BigNumber('0'),
    treasuryTotalSupplyCents: new BigNumber('137500'),
  },
];
