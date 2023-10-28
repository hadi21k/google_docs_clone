const {
  findOneDocument,
  createOneDocument,
  findDocumentByIdAndPopulate,
  findById,
  findDocs,
} = require("../services/document.services");

const getAllDocuments = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const documents = await findDocs({ "collaborators.user": _id });

    if (!documents) {
      const error = new Error("No documents found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json(documents);
  } catch (error) {
    return next(error);
  }
};

const createDocument = async (req, res, next) => {
  const { title } = req.body;

  try {
    const existingDocument = await findOneDocument({
      title,
      collaborators: {
        $elemMatch: {
          user: req.user._id,
        },
      },
    });

    if (existingDocument) {
      const error = new Error("Document already exists");
      error.statusCode = 400;
      throw error;
    }

    await createOneDocument({
      title,
      collaborators: [
        {
          user: req.user._id,
          permission: "owner",
        },
      ],
    });

    return res.status(201).json("Document created");
  } catch (error) {
    return next(error);
  }
};

const getDocumentById = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    const error = new Error("Document id not provided");
    error.statusCode = 400;
    throw error;
  }

  try {
    const document = await findDocumentByIdAndPopulate(id);

    return res.status(200).json(document);
  } catch (error) {
    return next(error);
  }
};

const updateDocumentById = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const document = await findById(id);

    if (!document) {
      const error = new Error("Document not found");
      error.statusCode = 404;
      throw error;
    }

    if (
      document.public_access !== "Anyone with the link can edit" &&
      !document.collaborators.some(
        (c) =>
          c.user.toString() === req.user._id.toString() &&
          c.permission !== "owner"
      )
    ) {
      const error = new Error("You are not authorized to edit this document");
      error.statusCode = 403;
      throw error;
    }

    if (title) document.title = title;

    if (content) {
      document.content = content;
      document.collaborators.push({
        user: req.user._id,
        permission: "editor",
      });
    }

    await document.save();

    return res.status(200).json("Document updated");
  } catch (error) {
    return next(error);
  }
};

const deleteDocumentById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const document = await findById(id);

    if (!document) {
      const error = new Error("Document not found");
      error.statusCode = 404;
      throw error;
    }

    if (
      !document.collaborators.some(
        (c) =>
          c.permission === "owner" &&
          c.user.toString() === req.user._id.toString()
      )
    ) {
      const error = new Error("You are not authorized to delete this document");
      error.statusCode = 403;
      throw error;
    }

    return res.status(200).json("Document deleted");
  } catch (error) {
    return next(error);
  }
};

const editAccess = async (req, res, next) => {
  const { id } = req.params;
  const { access_type } = req.body;

  try {
    const document = await findById(id);

    if (!document) {
      const error = new Error("Document not found");
      error.statusCode = 404;
      throw error;
    }

    if (
      !document.collaborators.some(
        (c) =>
          c.permission === "owner" &&
          c.user.toString() === req.user._id.toString()
      )
    ) {
      const error = new Error(
        "You are not authorized to edit access for this document"
      );
      error.statusCode = 403;
      throw error;
    }

    document.public_access = access_type;
    await document.save();

    return res.status(200).json("Document access updated");
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getAllDocuments,
  createDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
  editAccess,
};
