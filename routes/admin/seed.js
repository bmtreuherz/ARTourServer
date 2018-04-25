exports = module.exports;

// TODO: Add full list of locations here so we can easily populate the database with what we need.
exports.getFeatures = function(){
  return [
    {
      name: "Reitz Union Entrance",
      beaconID: 0,
      long: 29.646294,
      lat: -82.349977,
      imageLink: "https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg"
    },
    {
      name: "French Fries",
      beaconID: 1,
      long: 29.648301,
      lat: -82.344557,
      imageLink: "https://i.ytimg.com/vi/SfLV8hD7zX4/maxresdefault.jpg"
    }
  ];
}

exports.getScripts = function(){
  return [
    {
      beaconID: 0,
      language: "english",
      value: "This building, officially called the J. Wayne Reitz Student Union, was named for the University’s 5th president. The Reitz Union was completed in 1967, and completely remodeled in 2016. The Reitz is a student resource, and offers many services and opportunities for all UF students."
    },
    {
      beaconID: 1,
      language: "english",
      value: "Installed in 1988, the sculpture is officially entitled “Alachua,” but is colloquially referred to by students as “the french fries.” It was designed to symbolize the crown of the Alachua Indian (Native American?). The Administration at the time disliked it so much they attempted – unsuccessful – to have it moved to the basement."
    }
  ]
}
