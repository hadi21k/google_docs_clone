const Document = require("../models/document.model");

const findOneDocument = async (query) => {
  try {
    const document = await Document.findOne(query);

    return document;
  } catch (error) {
    throw error;
  }
};

const findOneDocumentById = async (id) => {
  try {
    const document = await Document.findById(id, "-__v").populate(
      "collaborators.user",
      "username permission"
    );

    if (!document) {
      const error = new Error("Document not found");
      error.statusCode = 404;
      throw error;
    }

    return document;
  } catch (error) {
    throw error;
  }
};

const createOneDocument = async (document) => {
  try {
    const newDocument = await Document.create(document);

    if (!newDocument) {
      const error = new Error("Document could not be created");
      error.statusCode = 500;
      throw error;
    }

    return newDocument;
  } catch (error) {
    throw error;
  }
};

const deleteOneDocument = async (query) => {
  try {
    const document = await Document.findOneAndDelete(query);

    return document;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findOneDocument,
  createOneDocument,
  findOneDocumentById,
  deleteOneDocument,
};
