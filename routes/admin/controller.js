var Feature   = require('../../models/feature');
var Script    = require('../../models/script');

exports = module.exports

var attachScripts = function(feature, callback){
  feature.scripts = [];
  Script.find({
    beaconID: feature.beaconID
  }, function(err, scripts){
    if (err) throw err;

    feature.scripts = scripts;
    callback(feature);
  });
}

exports.feature = function(req, res){
  if(!req.body.name || req.body.beaconID==null || req.body.beaconID == undefined
    || req.body.long == null || req.body.long == undefined
    || req.body.lat == null || req.body.lat == undefined || !req.body.imageLink){
    res.json({success: false, message: 'Invalid parameters.'});
  } else{
    Feature.findOne({
      beaconID: req.body.beaconID
    }, function(err, feature){
      if (err) throw err;

      if (feature) {
        feature.name = req.body.name;
        feature.beaconID = req.body.beaconID;
        feature.long = req.body.long;
        feature.lat = req.body.lat;
        feature.imageLink = req.body.imageLink;

        feature.save(function(err){
          if (err) throw err;

          var featureObject = feature.toObject();
          attachScripts(featureObject, function(featureWithScripts){
            res.json({
              success: true,
              message: 'Feature Updated!',
              feature: featureWithScripts
            });
          });
        })
      } else{

        var newFeature = new Feature({
          name: req.body.name,
          beaconID: req.body.beaconID,
          long: req.body.long,
          lat: req.body.lat,
          imageLink: req.body.imageLink
        });

        newFeature.save(function(err){
          if (err) throw err;

          var featureObject = newFeature.toObject();
          // Attach the scripts to the newFeature
          attachScripts(featureObject, function(featureWithScripts){
            res.json({
              success: true,
              message: 'Feature Created!',
              feature: featureWithScripts
            });
          });
        })
      }
    })
  }
}

exports.deleteFeature = function(req, res){
  if (req.body.beaconID == null || req.body.beaconID == undefined){
    res.json({success: false, message: 'Invalid parameters.'});
  } else {
    Feature.remove({
      beaconID: req.body.beaconID
    }, function (err){
      if (err) throw err;

      res.json({
        success: true,
        message: 'Feature Deleted!'
      });
    })
  }
}

exports.script = function(req, res){
  if(req.body.beaconID==null || req.body.beaconID == undefined
    || !req.body.language || !req.body.value){
    res.json({success: false, message: 'Invalid parameters.'});
  } else{
    Script.findOne({
      beaconID: req.body.beaconID,
      language: req.body.language
    }, function(err, script){
      if (err) throw err;

      if (script) {
        script.beaconID = req.body.beaconID;
        script.language = req.body.language;
        script.value = req.body.value;

        script.save(function(err){
          if (err) throw err;

          res.json({
            success: true,
            message: 'Script Updated!',
            script: script
          });
        })
      } else{

        var newScript = new Script({
          beaconID: req.body.beaconID,
          language: req.body.language,
          value: req.body.value
        });

        newScript.save(function(err){
          if (err) throw err;


          res.json({
            success: true,
            message: 'Script Created!',
            script: newScript
          });
        })
      }
    })
  }
}

exports.deleteScript = function(req, res){
  if (req.body.beaconID == null || req.body.beaconID == undefined || !req.body.language){
    res.json({success: false, message: 'Invalid parameters.'});
  } else {
    Script.remove({
      beaconID: req.body.beaconID,
      language: req.body.language
    }, function (err){
      if (err) throw err;

      res.json({
        success: true,
        message: 'Script Deleted!'
      });
    })
  }
}
