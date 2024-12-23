const { PrismaClient } = require("../generated/client"); // Correct import path

module.exports.prisma = new PrismaClient();
