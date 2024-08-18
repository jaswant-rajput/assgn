"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cards_1 = require("./models/cards");
dotenv_1.default.config();
mongoose_1.default.connect('mongodb://localhost:27017/assgn').then(() => console.log('connected'));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.post('/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        if (title == "" || title == null || title == undefined) {
            return res.status(400).json({ success: false, message: "Title can't be empty" });
        }
        else if (description == "" || description == null || description == undefined) {
            return res.status(400).json({ success: false, message: "Description can't be empty" });
        }
        const card = yield cards_1.Cards.create({ title, description });
        if (card) {
            return res.status(201).json({ success: true, message: "Card created Successfully", card });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
app.get('/cards', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cards = yield cards_1.Cards.find();
        res.status(200).json({ success: true, data: cards });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
app.get('/cards/:title', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.params;
        const card = yield cards_1.Cards.find({ title });
        if (card.length == 0) {
            return res.status(404).json({ success: false, message: "Card Not Found" });
        }
        res.status(200).json({ success: true, message: "Card Fetched", data: card });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
