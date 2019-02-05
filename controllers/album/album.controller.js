const albumProvider = require('../../utils/provider/album.provider'),
      multer        = require("multer"),
      path          = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/assets/pictures'));
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
})
const upload = multer({
  storage: storage
});
/**
 * Controller used by the server allowing access to the album management.
 *
 * Accessible via the routes '/album'
 **/
class AlbumController {
  /**
   * Albul controller add routes to manage quizz data
   *
   * Routes accessible from /quizz :
   * - {get} / : Get all the stocked umages
   * - {get} /:id : Get a specific image by it's ID
   * - {get} /group/:id :  Get a list of photos linked to a group
   * - {post} /group/:id : Insert a picture for a specific group
   * @param {Router} router Express router
   */
  constructor(router) {
    router.get('/', this.getPictures.bind(this));
    router.get('/:id', this.getPictureById.bind(this));
    router.get('/group/:id', this.getPicturesByGroupId.bind(this));
    router.post('/group/:id', upload.single('file'), this.addPictureToGroup.bind(this));
  }

  getPictures(req, res) {
    console.log("*** AlbumController.getPictures");

    albumProvider.getPictures((err, pictures) => {
      if(err) {
        res.json({"error": err, "album": null});
      } else {
        res.json({"error": null, "album": pictures});
      }
    });
  }

  getPictureById(req, res) {
    console.log("*** AlbumController.getPictures");
    const id = req.params.id;

    albumProvider.getPictureById(id, (err, picture) => {
      if(err) {
        res.json({"error": err, "pictures": null});
      } else {
        res.json({"error": null, "picture": picture});
      }
    });
  }

  getPicturesByGroupId(req, res) {
    console.log("*** AlbumController.getPicturesByGroupId");
    const id = req.params.id;

    albumProvider.getPicturesByGroupId(id, (err, pictures) => {
      if(err) {
        res.json({"error": err, "album": null});
      } else {
        res.json({"error": null, "album": pictures});
      }
    });
  }

  addPictureToGroup(req, res) {
    console.log("*** AlbumController.addPictureToGroup");
    const id = req.params.id;

    albumProvider.insertPicture(req.body, id, (err, picture) => {
      if(err) {
        console.log(err);
      } else {
        res.json(picture);
      }
    });
  }
}

module.exports = AlbumController;
