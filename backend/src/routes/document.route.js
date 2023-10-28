const { Router } = require("express");
const {
  getAllDocuments,
  createDocument,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
  editAccess,
} = require("../controllers/document.controller");
const {
  validateUpdateDocument,
  validateCreateDocument,
} = require("../middlewares/handleDocument.middleware");

const router = Router();

/*
 * @route GET /api/documents
 * @desc Get all documents
 * @access Private
 * @returns {Array} documents
 *
 * @route POST /api/documents
 * @desc Create a new document
 * @access Private
 *
 * @route GET /api/documents/:id
 * @desc Get a document by id
 * @access Private
 * @returns {Object} document
 *
 * @route PUT /api/documents/:id
 * @desc Update a document by id
 * @access Private
 *
 * @route DELETE /api/documents/:id
 * @desc Delete a document by id
 * @access Private
 *
 */

router
  .route("/")
  .get(getAllDocuments)
  .post(validateCreateDocument, createDocument);

router
  .route("/:id")
  .get(getDocumentById)
  .put(validateUpdateDocument, updateDocumentById)
  .delete(deleteDocumentById);

router.patch("/:id/access", editAccess);

module.exports = router;
