"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.SupplyWithdrawContent = void 0;
/** @jsxImportSource @emotion/react */
var material_1 = require("@mui/material");
var bignumber_js_1 = require("bignumber.js");
var components_1 = require("components");
var errors_1 = require("errors");
var react_1 = require("react");
var translation_1 = require("translation");
var utilities_1 = require("utilities");
var baseURIs_1 = require("constants/baseURIs");
var AuthContext_1 = require("context/AuthContext");
var safeBorrowLimitPercentage_1 = require("constants/safeBorrowLimitPercentage");
var AmountForm_1 = require("containers/AmountForm");
var useDailyXcnDistributionInterests_1 = require("hooks/useDailyXcnDistributionInterests");
var styles_1 = require("../styles");
exports.SupplyWithdrawContent = function (_a) {
    var isNFTMarket = _a.isNFTMarket, asset = _a.asset, type = _a.type, tokenInfo = _a.tokenInfo, userTotalBorrowBalanceCents = _a.userTotalBorrowBalanceCents, userTotalBorrowLimitCents = _a.userTotalBorrowLimitCents, assets = _a.assets, maxInput = _a.maxInput, inputLabel = _a.inputLabel, enabledButtonKey = _a.enabledButtonKey, disabledButtonKey = _a.disabledButtonKey, calculateNewBalance = _a.calculateNewBalance, isTransactionLoading = _a.isTransactionLoading, isXcnEnabled = _a.isXcnEnabled, amountValue = _a.amountValue;
    var styles = styles_1.useStyles();
    var _b = translation_1.useTranslation(), t = _b.t, Trans = _b.Trans;
    var _c = react_1.useContext(AuthContext_1.AuthContext).account, _d = (_c === void 0 ? {} : _c).address, accountAddress = _d === void 0 ? '' : _d;
    var _e = react_1.useState([]), nfts = _e[0], setNFTs = _e[1];
    var _f = react_1.useState([]), nft = _f[0], setNFT = _f[1];
    var amount = new bignumber_js_1["default"](amountValue || 0);
    var validAmount = amount && !amount.isZero() && !amount.isNaN();
    var selection = nft.map(function (item) { return item.collectionTokenId; });
    var selectAvailable = nfts.filter(function (item) { return !item.nesting; }).length;
    react_1.useEffect(function () {
        if (!asset)
            return;
        if (asset.token.decimals === 0) {
            // const methods = {
            //   supply && {
            //     supply: library.methods.Market(library.Market(supply)),
            //     withdraw: library.methods.DToken(library.DToken(supply)),
            //   }
            // }
            var balance_1 = asset.walletBalance.toString();
            var promise = type === 'supply'
                ? Promise.all(new Array(Number(balance_1))
                    .fill(1)
                    .map(function (_, idx) { return methods[type].tokenOfOwnerByIndex(accountAddress, idx); }))
                : Promise.all(new Array(Number(current))
                    .fill(1)
                    .map(function (_, idx) { return methods[type].userTokens(accountAddress, idx); }));
            promise
                .then(function (tokenIds) {
                var baseURI = baseURIs_1.BaseURIs[asset.token.symbol];
                var fetchPromise = baseURI
                    ? new Promise(function (resolve) {
                        return fetch("https://test.dmxdao.com/onyx/api/user_nfts?account=" + (type === 'supply' ? accountAddress : market.id) + "&collections=" + [asset.token.address], {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(function (res) { return res.json(); })
                            .then(function (_a) {
                            var _b = _a.data[0], data = _b === void 0 ? { tokenIds: [] } : _b;
                            return resolve(tokenIds[0] === 0
                                ? data.tokenIds
                                    .map(function (item) { return [item.tokenId, item.tokenURI]; })
                                    .slice(0, balance_1)
                                : tokenIds.map(function (tokenId) {
                                    var _a;
                                    return [
                                        tokenId,
                                        ((_a = data.tokenIds.find(function (item) { return item.tokenId === tokenId; })) === null || _a === void 0 ? void 0 : _a.tokenURI) ||
                                            "/assets/cryptologos/" + asset.token.symbol.toLowerCase() + ".jpg",
                                    ];
                                }));
                        })["catch"](function (e) {
                            // console.log(e)
                            resolve(new Array(tokenIds.length)
                                .fill("/assets/cryptologos/" + asset.token.symbol.toLowerCase() + ".jpg")
                                .map(function (image, idx) { return [tokenIds[idx], image]; }));
                        });
                    })
                    : Promise.all(tokenIds.map(function (tokenId) {
                        return Promise.all([
                            Promise.resolve(tokenId),
                            library.contracts.FiPunk.methods.punkImageSvg(tokenId).call(),
                        ]);
                    }));
                fetchPromise
                    .then(function (tokenData) {
                    var fetchNesting = Promise.resolve(tokenData.map(function () { return [false]; }));
                    fetchNesting
                        .then(function (nestings) {
                        setNFTs(tokenData
                            .map(function (_a, index) {
                            var collectionTokenId = _a[0], image = _a[1];
                            return ({
                                index: index,
                                collectionTokenId: collectionTokenId,
                                collectionTokenContract: asset.token.address,
                                imageUrl: image.includes('sandbox.game')
                                    ? '/assets/cryptologos/land.jpg'
                                    : image
                                        .replace('ipfs://', 'https://ipfs.io/ipfs/')
                                        .replace('data:image/svg+xml;utf8,', ''),
                                nesting: nestings[index][0]
                            });
                        })
                            .sort(function (a, b) {
                            return b.nesting ? 1 : a.nesting ? -1 : a.index - b.index;
                        })
                            .filter(function (item) {
                            return market.projectId
                                ? Math.floor(item.collectionTokenId / 1000000) === market.projectId
                                : true;
                        }));
                    })["catch"](console.log);
                })["catch"](console.log);
            })["catch"](console.log);
        }
        else {
            setNFTs([]);
        }
    }, [type, asset, available]);
    var hypotheticalTokenSupplyBalance = amountValue
        ? calculateNewBalance(asset.supplyBalance, amount)
        : undefined;
    // TODO: handle loading state
    var dailyXcnDistributionInterestsCents = useDailyXcnDistributionInterests_1["default"]().dailyXcnDistributionInterestsCents;
    var hypotheticalBorrowLimitCents = react_1.useMemo(function () {
        var tokenPrice = utilities_1.getBigNumber(asset === null || asset === void 0 ? void 0 : asset.tokenPrice);
        var updateBorrowLimitCents;
        if (tokenPrice && validAmount) {
            var amountInCents = utilities_1.calculateCollateralValue({
                amountWei: utilities_1.convertTokensToWei({ value: amount, token: asset.token }),
                token: asset.token,
                tokenPriceTokens: asset.tokenPrice,
                collateralFactor: asset.collateralFactor
            }).times(100);
            var temp = calculateNewBalance(userTotalBorrowLimitCents, amountInCents);
            updateBorrowLimitCents = bignumber_js_1["default"].maximum(temp, 0);
        }
        return updateBorrowLimitCents;
    }, [amount, asset.token, userTotalBorrowBalanceCents, userTotalBorrowLimitCents]);
    var _g = react_1.useMemo(function () {
        var hypotheticalDailyEarningCentsValue;
        var hypotheticalAssets = __spreadArrays(assets);
        var yearlyEarningsCents = dailyXcnDistributionInterestsCents &&
            utilities_1.calculateYearlyEarningsForAssets({
                assets: assets,
                isXcnEnabled: isXcnEnabled,
                dailyXcnDistributionInterestsCents: dailyXcnDistributionInterestsCents
            });
        var dailyEarningsCentsValue = yearlyEarningsCents && utilities_1.calculateDailyEarningsCents(yearlyEarningsCents);
        // Modify asset with hypotheticalBalance
        if (validAmount) {
            var hypotheticalAsset = __assign(__assign({}, asset), { supplyBalance: calculateNewBalance(asset.supplyBalance, amount) });
            var currentIndex = assets.findIndex(function (a) { return a.token.address === asset.token.address; });
            hypotheticalAssets.splice(currentIndex, 1, hypotheticalAsset);
            var hypotheticalYearlyEarningsCents = dailyXcnDistributionInterestsCents &&
                utilities_1.calculateYearlyEarningsForAssets({
                    assets: hypotheticalAssets,
                    isXcnEnabled: isXcnEnabled,
                    dailyXcnDistributionInterestsCents: dailyXcnDistributionInterestsCents
                });
            hypotheticalDailyEarningCentsValue =
                hypotheticalYearlyEarningsCents &&
                    utilities_1.calculateDailyEarningsCents(hypotheticalYearlyEarningsCents);
        }
        return [dailyEarningsCentsValue, hypotheticalDailyEarningCentsValue];
    }, [amount, asset.token.address, isXcnEnabled, JSON.stringify(assets)]), dailyEarningsCents = _g[0], hypotheticalDailyEarningCents = _g[1];
    // Prevent users from supplying LUNA tokens. This is a temporary hotfix
    // following the crash of the LUNA token
    var isSupplyingLuna = type === 'supply' && asset.token.id === 'luna';
    var handleEnterNFT = function (nftIds) {
        if (nftIds === void 0) { nftIds = []; }
        setNFT(nfts.filter(function (item) { return nftIds.includes(item.collectionTokenId); }));
    };
    var renderNftSupply = function () { return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { css: styles.nftContent },
            react_1["default"].createElement("div", { css: styles.nftSelectionWrap }, (nfts || []).map(function (_nft) { return (react_1["default"].createElement("div", { className: "nftItem " + (selection.includes(_nft.collectionTokenId) ? 'selectedNft' : ''), key: _nft.collectionTokenId, onClick: function () {
                    return handleEnterNFT(selection.includes(_nft.collectionTokenId)
                        ? selection.filter(function (item) { return item != _nft.collectionTokenId; })
                        : _nft.nesting
                            ? [_nft.collectionTokenId]
                            : __spreadArrays(selection.filter(function (item) { var _a; return !((_a = nfts.find(function (n) { return n.collectionTokenId == item; })) === null || _a === void 0 ? void 0 : _a.nesting); }), [
                                _nft.collectionTokenId,
                            ]));
                } },
                selection.includes(_nft.collectionTokenId) && (react_1["default"].createElement("img", { className: "nftCheckMark", src: "/assets/nft_check.svg", alt: "check nft" })),
                _nft.imageUrl.startsWith('<svg') ? (react_1["default"].createElement("div", { className: "nftImg", dangerouslySetInnerHTML: {
                        __html: _nft.imageUrl
                    } })) : (react_1["default"].createElement("img", { className: "nftImg", src: _nft.imageUrl, alt: "nft" })),
                react_1["default"].createElement("div", { className: "tokenId" },
                    "Token #",
                    _nft.collectionTokenId,
                    _nft.nesting ? ' (Nested)' : ''))); }))),
        nfts.length > selectAvailable && react_1["default"].createElement("p", null, "Nested NFTs can only be supplied individually."),
        react_1["default"].createElement("div", { css: styles.nftConfirmBtnWrap },
            react_1["default"].createElement("span", { className: "lightgrey" },
                "Available to supply: ",
                react_1["default"].createElement("br", null),
                selectAvailable,
                " ",
                market.underlyingSymbol),
            react_1["default"].createElement("div", { className: "totalSelectedNft", onClick: function () {
                    return handleEnterNFT(nfts.filter(function (item) { return !item.nesting; }).map(function (item) { return item.collectionTokenId; }));
                } }, "Select all"),
            react_1["default"].createElement("div", { css: styles.nftConfirmBtnWrap },
                react_1["default"].createElement("span", { className: "lightgrey" },
                    "Selected: ",
                    selection.length,
                    "\u00A0",
                    market.underlyingSymbol,
                    react_1["default"].createElement("br", null),
                    react_1["default"].createElement("span", null,
                        "$",
                        selection.length * 1.0200034)),
                react_1["default"].createElement("div", { className: "totalSelectedNft", onClick: function () { return handleEnterNFT([]); } }, "Deselect all")),
            react_1["default"].createElement("button", { type: "button", disabled: nft.length === 0 }, "Supply")))); };
    var renderNftWithdraw = function () { return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { css: styles.nftContent },
            react_1["default"].createElement("div", { css: styles.nftSelectionWrap }, (nfts || []).map(function (_nft) { return (react_1["default"].createElement("div", { className: "nftItem " + (selection.includes(_nft.collectionTokenId) ? 'selectedNft' : ''), key: _nft.collectionTokenId, onClick: function () {
                    return handleEnterNFT(selection.includes(_nft.collectionTokenId)
                        ? selection.filter(function (item) { return item != _nft.collectionTokenId; })
                        : _nft.nesting
                            ? [_nft.collectionTokenId]
                            : __spreadArrays(selection.filter(function (item) { var _a; return !((_a = nfts.find(function (n) { return n.collectionTokenId == item; })) === null || _a === void 0 ? void 0 : _a.nesting); }), [
                                _nft.collectionTokenId,
                            ]));
                } },
                selection.includes(_nft.collectionTokenId) && (react_1["default"].createElement("img", { className: "nftCheckMark", src: "/assets/nft_check.svg", alt: "check nft" })),
                _nft.imageUrl.startsWith('<svg') ? (react_1["default"].createElement("div", { className: "nftImg", dangerouslySetInnerHTML: {
                        __html: _nft.imageUrl
                    } })) : (react_1["default"].createElement("img", { className: "nftImg", src: _nft.imageUrl, alt: "nft" })),
                react_1["default"].createElement("div", { className: "tokenId" },
                    "Token #",
                    _nft.collectionTokenId,
                    _nft.nesting ? ' (Nested)' : ''))); }))),
        react_1["default"].createElement("div", { css: styles.nftConfirmBtnWrap },
            react_1["default"].createElement("span", { className: "lightgrey" },
                "Available to withdraw: ",
                react_1["default"].createElement("br", null),
                new bignumber_js_1["default"](available).isNegative() ? 0 : Number(available),
                " ",
                market.underlyingSymbol),
            react_1["default"].createElement("div", { className: "totalSelectedNft", onClick: function () {
                    return handleEnterNFT(nfts.filter(function (item) { return !item.nesting; }).map(function (item) { return item.collectionTokenId; }));
                } }, "Select all")),
        react_1["default"].createElement("div", { css: styles.nftConfirmBtnWrap },
            react_1["default"].createElement("span", { className: "lightgrey" },
                "Selected: ",
                selection.length,
                "\u00A0",
                market.underlyingSymbol,
                react_1["default"].createElement("br", null),
                react_1["default"].createElement("span", null,
                    "$",
                    selection.length * 1.0200034)),
            react_1["default"].createElement("div", { className: "totalSelectedNft", onClick: function () { return handleEnterNFT([]); } }, "Deselect all")),
        react_1["default"].createElement("button", { disabled: nft.length === 0 || new bignumber_js_1["default"](available).lt(nft.length), type: "button" }, "Withdraw"))); };
    return !isNFTMarket ? (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(components_1.FormikTokenTextField, { name: "amount", token: asset.token, disabled: isTransactionLoading || isSupplyingLuna, rightMaxButton: {
                label: t('supplyWithdraw.max').toUpperCase(),
                valueOnClick: maxInput.toFixed()
            }, css: styles.input, 
            // Only display error state if amount is higher than borrow limit
            displayableErrorCodes: [AmountForm_1.ErrorCode.HIGHER_THAN_MAX] }),
        react_1["default"].createElement(material_1.Typography, { component: "div", variant: "small2", css: [styles.greyLabel, styles.getRow({ isLast: true })] },
            react_1["default"].createElement(Trans, { i18nKey: inputLabel, components: {
                    White: react_1["default"].createElement("span", { css: styles.whiteLabel })
                }, values: {
                    amount: utilities_1.formatTokensToReadableValue({
                        value: maxInput,
                        token: asset.token
                    })
                } })),
        tokenInfo.map(function (info, index) { return (react_1["default"].createElement(components_1.LabeledInlineContent, __assign({ css: styles.getRow({ isLast: index === tokenInfo.length - 1 }), className: "info-row" }, info, { key: info.label }))); }),
        react_1["default"].createElement(components_1.Delimiter, { css: styles.getRow({ isLast: true }) }),
        react_1["default"].createElement(components_1.BorrowBalanceAccountHealth, { css: styles.getRow({ isLast: true }), borrowBalanceCents: userTotalBorrowBalanceCents.toNumber(), borrowLimitCents: (hypotheticalBorrowLimitCents === null || hypotheticalBorrowLimitCents === void 0 ? void 0 : hypotheticalBorrowLimitCents.toNumber()) || userTotalBorrowLimitCents.toNumber(), safeBorrowLimitPercentage: safeBorrowLimitPercentage_1.SAFE_BORROW_LIMIT_PERCENTAGE }),
        react_1["default"].createElement(components_1.LabeledInlineContent, { label: t('supplyWithdraw.borrowLimit'), css: styles.getRow({ isLast: true }), className: "info-row" },
            react_1["default"].createElement(components_1.ValueUpdate, { original: userTotalBorrowLimitCents, update: hypotheticalBorrowLimitCents })),
        react_1["default"].createElement(components_1.Delimiter, { css: styles.getRow({ isLast: true }) }),
        react_1["default"].createElement(components_1.LabeledInlineContent, { label: t('supplyWithdraw.dailyEarnings'), css: styles.getRow({ isLast: false }), className: "info-row" },
            react_1["default"].createElement(components_1.ValueUpdate, { original: dailyEarningsCents, update: hypotheticalDailyEarningCents })),
        react_1["default"].createElement(components_1.LabeledInlineContent, { label: t('supplyWithdraw.supplyBalance', { tokenSymbol: asset.token.symbol }), css: styles.getRow({ isLast: true }), className: "info-row" },
            react_1["default"].createElement(components_1.ValueUpdate, { original: asset.supplyBalance, update: hypotheticalTokenSupplyBalance, format: function (value) {
                    return utilities_1.formatTokensToReadableValue({
                        value: value,
                        token: asset.token,
                        minimizeDecimals: true,
                        addSymbol: false
                    });
                } })),
        react_1["default"].createElement(components_1.FormikSubmitButton, { fullWidth: true, disabled: !validAmount || isSupplyingLuna, loading: isTransactionLoading, enabledLabel: enabledButtonKey, disabledLabel: disabledButtonKey }))) : (react_1["default"].createElement(react_1["default"].Fragment, null, type === 'supply' ? renderNftSupply() : renderNftWithdraw()));
};
var SupplyWithdrawForm = function (_a) {
    var onSubmit = _a.onSubmit, maxInput = _a.maxInput, props = __rest(_a, ["onSubmit", "maxInput"]);
    var onSubmitHandleError = function (value) { return __awaiter(void 0, void 0, void 0, function () {
        var error_1, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, onSubmit(value)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    message = error_1.message;
                    if (error_1 instanceof errors_1.VError) {
                        message = errors_1.formatVErrorToReadableString(error_1);
                        components_1.toast.error({
                            message: message
                        });
                    }
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(AmountForm_1.AmountForm, { onSubmit: onSubmitHandleError, maxAmount: maxInput.toFixed() }, function (_a) {
        var values = _a.values;
        return (react_1["default"].createElement(exports.SupplyWithdrawContent, __assign({ maxInput: maxInput, amountValue: values.amount }, props)));
    }));
};
exports["default"] = SupplyWithdrawForm;
