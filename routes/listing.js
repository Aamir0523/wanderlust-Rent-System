const express =require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


// route "/"
router
.route("/")
.get( wrapAsync(listingController.index))
.post(
  isLoggedIn,
   validateListing,
   upload.single("image"), 
  wrapAsync(listingController.createListing)
);

// new route 
router.get("/new",isLoggedIn, listingController.renderNewForm);

// route /:id
router
.route("/:id")
.get(wrapAsync( listingController.showListing) )
.put(
  isLoggedIn, 
  isOwner,
  validateListing,
  upload.single("image"), 
 wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
   wrapAsync( listingController.destroyListing));

//Edit route
router.get(
  "/:id/edit", 
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm));

module.exports= router;