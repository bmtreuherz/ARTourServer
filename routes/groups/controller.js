var Group   = require('../../models/group');

exports = module.exports

// Get groups where the user is a member
exports.getGroups = function(req, res){
  if(!req.query.userID){
    res.json({success: false, message: 'Must provide a userID as a query param.'})
  } else{
    Group.find({members: req.query.userID
    }, function(err, groups){
      if (err) throw err;
      if(!groups){
        res.json({success: false, message: 'Could not find any groups'});
      } else{
        res.json({success: true, message: "OK", groups: groups})
      }
    });
  }
}

// get groups where the user is an admin
exports.getMyGroups = function(req, res){
  if(!req.query.userID){
    res.json({success: false, message: 'Must provide a userID as a query param.'})
  } else{
    Group.find({admins: req.query.userID
    }, function(err, groups){
      if (err) throw err;
      if(!groups){
        res.json({success: false, message: 'Could not find any groups'});
      } else{
        res.json({success: true, message: "OK", groups: groups})
      }
    });
  }
}

exports.joinGroup = function(req, res){
  if(!req.body.userID || !req.body.groupName || !req.body.password){
    res.json({success: false, message: 'Must provide a userID, groupName, and password in your request body.'})
  } else{
    Group.findOne({name: req.body.groupName
    }, function(err, group){
      if (err) throw err;
      if(!group){
        res.json({success: false, message: 'Could not find the group you requested'});
      } else{
        group.members.push(req.body.userID)
        group.save(function(err){
          if (err) throw err;

          res.json({
            success: true,
            message: 'You\'ve been added to the group!',
            group: group
          });
        })
      }
    });
  }
}

exports.createGroup = function(req, res){
  if(!req.body.userID || !req.body.name || !req.body.password || !req.body.description){
    res.json({success: false, message: 'Invalid parameters.'});
  } else{
    Group.findOne({
      name: req.body.name
    }, function(err, group){
      if (err) throw err;

      if (group){
        res.json({ success: false, message: 'Group with that name already exists.' });
      }else{
        var newGroup = new Group({
          name: req.body.name,
          password: req.body.password,
          description: req.body.description,
          admins: [req.body.userID],
          members: [req.body.userID]
        })

        newGroup.save(function(err){
          if (err) throw err;

          res.json({
            success: true,
            message: 'Group Created!',
            group: newGroup
          });
        })
      }
    })
  }
}
