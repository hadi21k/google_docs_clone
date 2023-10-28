const Document = require("../models/document.model");
const {
  findOneDocument,
  createOneDocument,
  findOneDocumentById,
  deleteOneDocument,
} = require("../services/document.services");

const getAllDocuments = async (req, res, next) => {
  const { _id } = req.user;

  try {
    const documents = await Document.find({ "collaborators.user": _id }, "-__v")
      .populate("collaborators.user", "username")
      .sort({ updated: -1 });

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
    const document = await findOneDocumentById(id);

    return res.status(200).json(document);
  } catch (error) {
    return next(error);
  }
};

const updateDocumentById = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  console.log(title);

  try {
    const document = await findOneDocument({
      _id: id,
      $or: [
        { public_access: "Anyone with the link can edit" },
        {
          collaborators: {
            $elemMatch: { user: req.user._id },
          },
        },
      ],
    });

    if (!document) {
      const error = new Error("Document not found or user not authorized");
      error.statusCode = 404;
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
    const document = await deleteOneDocument({
      _id: id,
      collaborators: {
        $elemMatch: {
          user: req.user._id,
          permission: "owner",
        },
      },
    });

    if (!document) {
      const error = new Error("Document not found or user not authorized");
      error.statusCode = 404;
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
    const document = await Document.findOne({
      _id: id,
      collaborators: {
        $elemMatch: {
          user: req.user._id,
          permission: "owner",
        },
      },
    });

    if (!document) {
      const error = new Error("Document not found or user not authorized");
      error.statusCode = 404;
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
