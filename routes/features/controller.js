var Feature   = require('../../models/feature');
var Script    = require('../../models/script');

exports = module.exports

var attachScripts = function(features, callback){
  var result = [];
  var promises = [];

  features.forEach(function(feature){
    var featureObject = feature.toObject();
    featureObject.scripts = [];

    var promise = Script.find({beaconID: featureObject.beaconID}).exec();
    promise.then(function(scripts){
      featureObject.scripts = scripts;
      result.push(featureObject);
    })

    promises.push(promise);
  });

  Promise.all(promises).then(function(){
    callback(result);
  })
}

exports.features = function(req, res){
  Feature.find({}, function(err, features){
    if (err) throw err;
    if(!features){
      res.json({success: false, message: 'Could not find any features'});
    } else{
      attachScripts(features, function(featuresWithScripts){
        res.json({success: true, message: "OK", features: featuresWithScripts})
      });
    }
  });
}

exports.scripts = function(req, res){
  Script.find({}, function(err, scripts){
    if (err) throw err;
    if(!scripts){
      res.json({success: false, message: 'Could not find any scripts'});
    } else{
      res.json({success: true, message: "OK", scripts: scripts})
    }
  });
}
