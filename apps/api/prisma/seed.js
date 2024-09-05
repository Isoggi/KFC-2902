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
exports.seedProducts = exports.seedCategories = exports.seedCustomer = void 0;
const prisma_1 = __importDefault(require("../src/prisma"));
const data_json_1 = require("./data.json");
const seedCustomer = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < data_json_1.users.length; i++) {
        const data = Object.assign(Object.assign({}, data_json_1.users[i]), { gender: data_json_1.users[i].gender, role: data_json_1.users[i].role, birth_date: new Date(data_json_1.users[i].birth_date) });
        yield prisma_1.default.user.upsert({
            create: data,
            where: {
                id: data_json_1.users[i].id,
            },
            update: data,
        });
    }
});
exports.seedCustomer = seedCustomer;
const seedCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < data_json_1.categories.length; i++) {
        const data = data_json_1.categories[i];
        yield prisma_1.default.category.upsert({
            create: data,
            where: {
                id: data_json_1.categories[i].id,
            },
            update: data,
        });
    }
});
exports.seedCategories = seedCategories;
const seedProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < data_json_1.products.length; i++) {
        const data = Object.assign({}, data_json_1.products[i]);
        yield prisma_1.default.product.upsert({
            create: data,
            where: {
                id: data_json_1.products[i].id,
            },
            update: data,
        });
    }
});
exports.seedProducts = seedProducts;
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.seedCustomer)();
    yield (0, exports.seedCategories)();
    yield (0, exports.seedProducts)();
});
main()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma_1.default.$disconnect();
}));
