const groupProvider = require('../../utils/provider/group.provider');

/**
 * Controller used by the server allowing access to the group management.
 *
 * Accessible via the routes '/group'
 **/
class GroupController {
  /**
   * Group controller add routes to manage group data
   *
   * Routes accessible from /group :
   * - {get} / : Get all the stocked group
   * - {get} /:id : Get a specific group by is ID
   * - {post} / :  Add one or multiple group following sended data (see exemple structure in doc folder)
   * @param {Router} router Express router
   */
  constructor(router) {
    router.get('/', this.getGroups.bind(this));
    router.get('/:id', this.getGroupById.bind(this));
    router.post('/', this.insertGroups.bind(this));
  }

  getGroups(req, res) {
    console.log("***** GroupController.getGroups");
    groupProvider.getGroups((err, group) => {
      if (err) {
        console.log("*** GroupController.getGroups error :" + err);
        res.json(null);
      } else {
        res.json(group);
      }
    });
  }

  getGroupById(req, res) {
    console.log("*** GroupController.getGroupById");
    const id = req.params.id;

    groupProvider.getGroupById(id, (err, group) => {
      if (err) {
        console.log("*** GroupController.getGroupById error :" + err);
        res.json(null);
      } else {
        res.json(group);
      }
    });
  }

  insertGroups(req, res) {
    console.log("*** GroupController.insertGroups");
    let body = req.body;
    if (body.constructor !== Array) {
      groupProvider.insertGroup(req.body, (err, group) => {
        if (err) {
          console.log("*** GroupController.insertGroup error :" + err);
          res.json(null);
        } else {
          res.json(group);
        }
      });
    } else {
      groupProvider.insertMultiGroup(req.body, (err, groups) => {
        if (err) {
          console.log("*** GroupController.insertMultiGroup error :" + err);
          res.json(null);
        } else {
          res.json(groups);
        }
      })
    }

  }

}

module.exports = GroupController;

