var Event = require('../../models/event');
var Group = require('../../models/group');

exports = module.exports
// TODO: Change param names to be less bad.

// Takes in group
exports.createEvent = function(req, res){
  if(!req.body.name || !req.body.location || !req.body.description
    || !req.body.group || !req.body.date || !req.body.deadline || !req.body.capacity
    || !req.body.tag){
    res.json({success: false, message: 'Invalid parameters.'});

  } else{

      var event = new Event({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        group: req.body.group,
        date: new Date(req.body.date * 1000),
        deadline: new Date(req.body.deadline * 1000),
        capacity: req.body.capacity,
        tag: req.body.tag
      });

      event.save(function(err){
        if (err) throw err;

        res.json({
          success: true,
          message: 'Event Created!',
          event: event
        });
      });
  }
}


exports.joinEvent = function(req, res){
  if(!req.body.userID || !req.body.eventID){
    res.json({success: false, message: 'Invalid parameters'})
  } else {
    Event.findOne({
      _id: req.body.eventID,
      registrationOpen: true,
      requestedUsers: { "$ne": req.body.userID},
      acceptedUsers:  { "$ne": req.body.userID}
      }, function(err, event){

      if (err) throw err;

      if(!event){
        res.json({success: false, message: 'Could not register for event'});
      }else{

        if(event.deadline < new Date()){
          res.json({success: false, message: "Registration closed."});
        } else{
          event.requestedUsers.push(req.body.userID)
          event.save(function(err){
            if (err) throw err;

            res.json({
              success: true,
              message: 'You\'ve registered for the event!',
              event: event
            });
          });
        }
      }
    })
  }
}

var lotteryMagic = function(event){
  if (event.requestedUsers.length <= event.capacity){
    // Move all users over
    for(i=0; i<event.requestedUsers.length; i++){
      event.acceptedUsers.push(event.requestedUsers[i]);
    }
    event.requestedUsers.splice(0, event.requestedUsers.length)
    return
  }

  for(i = 0; i< event.capacity; i++){
    max = event.requestedUsers.length;
    min = 0;
    index = Math.floor(Math.random() * (max - min)) + min;

    event.acceptedUsers.push(event.requestedUsers[index]);
    event.requestedUsers.splice(index, 1);
  }
}


exports.closeEvent = function(req, res){
  if(!req.body.eventID){
    res.json({success: false, message: 'Invalid parameters'})
  } else {
    Event.findOne({
      _id: req.body.eventID,
      registrationOpen: true
      }, function(err, event){

      if (err) throw err;

      if(!event){
        res.json({success: false, message: 'Could not find  event'});
      }else{
        event.registrationOpen = false;
        // Select users
        lotteryMagic(event)
        event.save(function(err){
          if (err) throw err;

          res.json({
            success: true,
            message: 'You\'ve registered closed the event!',
            event: event
          });
        });
      }
    })
  }
}


// Takes an array of group ids and returns all events for those group that are still open
// Send groups seperated by commas
exports.getEventsForGroups = function(req, res){
  if(!req.query.groups){
    res.json({success: false, message: 'Must provide groups in the request.'})
  } else{
    var groups = req.query.groups.split(",")
    Event.find({
      group: { $in: groups}
    }, function(err, events){
      if (err) throw err;
      if(!events){
        res.json({success: false, message: 'Could not find any events'});
      } else{
        res.json({success: true, message: "OK", events: events})
      }
    });
  }
}

// Gets all events that a user is not registered for or attending that are still open by group
exports.getExploreEvents = function(req, res){
  if(!req.query.groups || !req.query.userID){
    res.json({success: false, message: 'Must provide groups and userID in the request.'})
  } else{
    var groups = req.query.groups.split(",")
    Event.find({
      group: { $in: groups},
      registrationOpen: true,
      requestedUsers: { "$ne": req.query.userID},
      acceptedUsers:  { "$ne": req.query.userID}
    }, function(err, events){
      if (err) throw err;
      if(!events){
        res.json({success: false, message: 'Could not find any events'});
      } else{
        res.json({success: true, message: "OK", events: events})
      }
    });
  }
}

// Get all events a user is on the registered list for that are still open
exports.getPendingEvents = function(req, res){
  if(!req.query.groups || !req.query.userID){
    res.json({success: false, message: 'Must provide groups and userID in the request.'})
  } else{
    var groups = req.query.groups.split(",")
    Event.find({
      group: { $in: groups},
      registrationOpen: true,
      requestedUsers: req.query.userID,
      acceptedUsers:  { "$ne": req.query.userID}
    }, function(err, events){
      if (err) throw err;
      if(!events){
        res.json({success: false, message: 'Could not find any events'});
      } else{
        res.json({success: true, message: "OK", events: events})
      }
    });
  }
}

// Get all events a user is on the accepted list for.
exports.getAcceptedEvents = function(req, res){
  if(!req.query.groups || !req.query.userID){
    res.json({success: false, message: 'Must provide groups and userID in the request.'})
  } else{
    var groups = req.query.groups.split(",")
    Event.find({
      group: { $in: groups},
      acceptedUsers: req.query.userID
    }, function(err, events){
      if (err) throw err;
      if(!events){
        res.json({success: false, message: 'Could not find any events'});
      } else{
        res.json({success: true, message: "OK", events: events})
      }
    });
  }
}
