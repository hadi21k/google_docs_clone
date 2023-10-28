const Document = require("../models/document.model");

const findOneDocument = async (query) => {
  return await Document.findOne(query);
};

const findById = async (id) => {
  return await Document.findById(id);
};

const findDocumentByIdAndPopulate = async (id) => {
  return await Document.findById(id, "-__v").populate(
    "collaborators.user",
    "username permission"
  );
};

const createOneDocument = async (document) => {
  await Document.create(document);
};

const findDocs = async (query) => {
  return Document.find(query, "-__v")
    .populate("collaborators.user", "username")
    .sort({ updated: -1 });
};

module.exports = {
  findOneDocument,
  createOneDocument,
  findDocumentByIdAndPopulate,
  findById,
  findDocs,
};
