import { HistoryItem, HistoryItemType } from 'utilities/getHistorySubGraph';

export const historyItems: HistoryItem[] = [
  {
    amount: String(121321),
    blockNumber: String(19636734),
    type: HistoryItemType.TRANSFER,
    from: '0x08e0A5575De71037aE36AbfAfb516595fE68e5e4',
    id: '0x6b8f0ebd99034cf5bec250a2e14b1d594e85be39a2cecd1193536e9576897800',
    blockTimestamp: String(Math.floor(Date.now() / 1000)),
    to: '0xD4aDbd5ed497c7720127Bfe9b05D725aC72ae2a9',
    transactionHash: '0x6b8f0ebd99034cf5bec250a2e14b1d594e85be39a2cecd1193536e9576897800',
  },
  {
    amount: String(121421),
    blockNumber: String(19636734),
    type: HistoryItemType.STAKE,
    from: '0x08e0A5575De71037aE36AbfAfb516595fE68e5e4',
    id: '0x6b8f0ebd99034cf5bec250a2e14b1d594e85be39a2cecd1193536e9576897801',
    blockTimestamp: String(Math.floor(Date.now() / 1000)),
    to: '0xD4aDbd5ed497c7720127Bfe9b05D725aC72ae2a9',
    transactionHash: '0x6b8f0ebd99034cf5bec250a2e14b1d594e85be39a2cecd1193536e9576897801',
  },
  {
    amount: String(1211),
    blockNumber: String(19636734),
    type: HistoryItemType.SUPPLY,
    from: '0x08e0A5575De71037aE36AbfAfb516595fE68e5e4',
    id: '0x6b8f0ebd99034cf5bec250a2e14b1d594e85be39a2cecd1193536e957689782',
    blockTimestamp: String(Math.floor(Date.now() / 1000)),
    to: '0xD4aDbd5ed497c7720127Bfe9b05D725aC72ae2a9',
    transactionHash: '0x6b8f0ebd99034cf5bec250a2e14b1d594e85be39a2cecd1193536e957689782',
  },
];

export default historyItems;
