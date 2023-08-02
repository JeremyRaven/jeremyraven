// Construct traffic
function animateBus(entity, positions, duration, viewer) {
  var startTime = Cesium.JulianDate.now();
  var endTime = Cesium.JulianDate.addSeconds(startTime, duration, new Cesium.JulianDate());

  viewer.clock.startTime = startTime.clone();
  viewer.clock.stopTime = endTime.clone();
  viewer.clock.currentTime = startTime.clone();
  viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
  viewer.clock.multiplier = 1.0;

  var property = new Cesium.SampledPositionProperty();
  property.forwardExtrapolationType = Cesium.ExtrapolationType.CLAMP; // Set forward extrapolation type to CLAMP

  positions.forEach(function (position, i) {
    var time = Cesium.JulianDate.addSeconds(startTime, (duration / positions.length) * i, new Cesium.JulianDate());
    property.addSample(time, position);
  });

  var promises = positions.map(function (position) {
    return viewer.scene.sampleHeight(position);
  });

  Promise.all(promises)
    .then(function () {
      entity.position = property;

      // Set the orientation of the bus entity based on the direction of movement
      var velocityProperty = new Cesium.VelocityOrientationProperty(property);
      entity.orientation = velocityProperty;

      // Rotate the model by 180 degrees to align with the direction of movement
      entity.model.nodeTransformations = {
        arrow: Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(180)),
      };

      // Start the animation loop manually
      viewer.clock.onTick.addEventListener(function (clock) {
        var currentTime = clock.currentTime;
        if (Cesium.JulianDate.compare(currentTime, endTime) >= 0) {
          // Reset the clock to the start time
          viewer.clock.currentTime = startTime.clone();
        }
      });
    })
    .catch(function (error) {
      console.log("Error sampling terrain: ", error);
    });
}

function startTraffic(viewer) {
    console.log("Starting traffic");
  
    // First journey location points
  var vehiclePositions1 = [
    Cesium.Cartesian3.fromDegrees(174.7666147311, -36.8446725119, 46),
    Cesium.Cartesian3.fromDegrees(174.7660437828, -36.8464307964, 48),
    Cesium.Cartesian3.fromDegrees(174.7657386907, -36.847390006, 50),
    Cesium.Cartesian3.fromDegrees(174.7652986348, -36.8490255402, 54),
    Cesium.Cartesian3.fromDegrees(174.7634269911, -36.8485816496, 58),
    Cesium.Cartesian3.fromDegrees(174.7616261748, -36.8479966356, 60),
    Cesium.Cartesian3.fromDegrees(174.760094927, -36.8476365126, 60),
    Cesium.Cartesian3.fromDegrees(174.7610000364, -36.8454642812, 55),
    Cesium.Cartesian3.fromDegrees(174.7618892781, -36.8448044835, 48),
    Cesium.Cartesian3.fromDegrees(174.763641726, -36.8440631379, 45),
    Cesium.Cartesian3.fromDegrees(174.7646974772, -36.8441256374, 45),
    Cesium.Cartesian3.fromDegrees(174.7666147311, -36.8446725119, 46)
    ];
  
  // Second journey location points
  var vehiclePositions2 = [
    Cesium.Cartesian3.fromDegrees(174.7584017693, -36.845823978, 45),
    Cesium.Cartesian3.fromDegrees(174.7610886482, -36.8453429152, 46),
    Cesium.Cartesian3.fromDegrees(174.763143323, -36.8442642382, 47),
    Cesium.Cartesian3.fromDegrees(174.7643987999, -36.8440569737, 48),
    Cesium.Cartesian3.fromDegrees(174.7653390498, -36.8442256531, 48),
    Cesium.Cartesian3.fromDegrees(174.7658226539, -36.842917899, 48),
    Cesium.Cartesian3.fromDegrees(174.771103325, -36.8441609431, 45),
    Cesium.Cartesian3.fromDegrees(174.7736483525, -36.844978481, 45),
    Cesium.Cartesian3.fromDegrees(174.7730618403, -36.8463668366, 45),
    Cesium.Cartesian3.fromDegrees(174.7724155515, -36.8461076865, 45),
    Cesium.Cartesian3.fromDegrees(174.7713346316, -36.8457122306, 45),
    Cesium.Cartesian3.fromDegrees(174.7698212041, -36.8455566733, 45),
    Cesium.Cartesian3.fromDegrees(174.7675122539, -36.8449797254, 45),
    Cesium.Cartesian3.fromDegrees(174.7666062125, -36.8447626394, 50),
    Cesium.Cartesian3.fromDegrees(174.7658088596, -36.8473459229, 55),
    Cesium.Cartesian3.fromDegrees(174.7653446568, -36.8490668093, 60),
    Cesium.Cartesian3.fromDegrees(174.7644619742, -36.8509644904, 60),
    Cesium.Cartesian3.fromDegrees(174.7608106038, -36.8498577348, 70),
    Cesium.Cartesian3.fromDegrees(174.7564027146, -36.8486141078, 48),
    Cesium.Cartesian3.fromDegrees(174.7563561793, -36.847806475, 48),
    Cesium.Cartesian3.fromDegrees(174.7565265262, -36.846150409, 45),
    Cesium.Cartesian3.fromDegrees(174.7584017693, -36.845823978, 45)
    ];

  // Third journey location points
  var vehiclePositions3 = [
    Cesium.Cartesian3.fromDegrees(174.7573432386, -36.8536929189, 75),
    Cesium.Cartesian3.fromDegrees(174.7584862891, -36.8513074926, 65),
    Cesium.Cartesian3.fromDegrees(174.7593198251, -36.8494027294, 58),
    Cesium.Cartesian3.fromDegrees(174.7601336147, -36.8475411077, 58),
    Cesium.Cartesian3.fromDegrees(174.7616062216, -36.8479307555, 59),
    Cesium.Cartesian3.fromDegrees(174.763447141, -36.8484827524, 59),
    Cesium.Cartesian3.fromDegrees(174.7652902075, -36.8443738424, 46),
    Cesium.Cartesian3.fromDegrees(174.7647424131, -36.8442425911, 46),
    Cesium.Cartesian3.fromDegrees(174.7632469486, -36.8445326391, 46),
    Cesium.Cartesian3.fromDegrees(174.7624080817, -36.8464677562, 55),
    Cesium.Cartesian3.fromDegrees(174.7616615398, -36.8479958999, 60),
    Cesium.Cartesian3.fromDegrees(174.7608546755, -36.8498578754, 68),
    Cesium.Cartesian3.fromDegrees(174.7599069062, -36.8516810618, 74),
    Cesium.Cartesian3.fromDegrees(174.7583935688, -36.8540474292, 76),
    Cesium.Cartesian3.fromDegrees(174.7573432386, -36.8536929189, 75)
  ];

  // Fourth journey location points
  var vehiclePositions4 = [
    Cesium.Cartesian3.fromDegrees(174.76554287975299, -36.84822564842158, 52),
    Cesium.Cartesian3.fromDegrees(174.76393827415654, -36.84776251774178, 52),
    Cesium.Cartesian3.fromDegrees(174.7641803643652, -36.84695054262503, 52),
    Cesium.Cartesian3.fromDegrees(174.76463110889085, -36.845980337868006, 52),
    Cesium.Cartesian3.fromDegrees(174.76369694391812, -36.8457652608038, 52),
    Cesium.Cartesian3.fromDegrees(174.76259712087406, -36.8482426589239, 55),
    Cesium.Cartesian3.fromDegrees(174.76258679553465, -36.84826331510195, 55),
    Cesium.Cartesian3.fromDegrees(174.76527973099152, -36.849028483157156, 53),
    Cesium.Cartesian3.fromDegrees(174.76554287975299, -36.84822564842158, 52)
  ];     

  // Fifth journey location points
  var vehiclePositions5 = [
    Cesium.Cartesian3.fromDegrees(174.76313627884642, -36.854115243957025, 52),
    Cesium.Cartesian3.fromDegrees(174.76443816728462, -36.850887642925294, 52),
    Cesium.Cartesian3.fromDegrees(174.75932528006226, -36.84943778686289, 52),
    Cesium.Cartesian3.fromDegrees(174.7564090267686, -36.84854393799238, 52),
    Cesium.Cartesian3.fromDegrees(174.75640905575622, -36.848126855428895, 52),
    Cesium.Cartesian3.fromDegrees(174.76003268242715, -36.84766023890008, 55),
    Cesium.Cartesian3.fromDegrees(174.7652571512911, -36.84903061842519, 55),
    Cesium.Cartesian3.fromDegrees(174.7645002172303, -36.85087771113402, 53),
    Cesium.Cartesian3.fromDegrees(174.76313627884642, -36.854115243957025, 52)
  ];   

  // Sixth journey location points
  var vehiclePositions6 = [
    Cesium.Cartesian3.fromDegrees(174.76403555462238, -36.842557618419086, 40),
    Cesium.Cartesian3.fromDegrees(174.76323038451565, -36.84449078560579,  41),
    Cesium.Cartesian3.fromDegrees(174.76158018395995, -36.84534202009342, 42),
    Cesium.Cartesian3.fromDegrees(174.76097378535573, -36.84562840796459, 42),
    Cesium.Cartesian3.fromDegrees(174.7618982910599, -36.84339296546589, 42),
    Cesium.Cartesian3.fromDegrees(174.76538751366425, -36.844307771086264, 40),
    Cesium.Cartesian3.fromDegrees(174.7657850856448, -36.84297921186313, 40),
    Cesium.Cartesian3.fromDegrees(174.7640752807904, -36.842589448453595, 40),
    Cesium.Cartesian3.fromDegrees(174.76403555462238, -36.842557618419086, 40)
  ]; 

  // Seventh journey location points
  var vehiclePositions7 = [
    Cesium.Cartesian3.fromDegrees(174.756380880387, -36.84807054569632, 46),
    Cesium.Cartesian3.fromDegrees(174.75999952661815, -36.84766494477429,  45),
    Cesium.Cartesian3.fromDegrees(174.76098210401742, -36.84559872432607, 44),
    Cesium.Cartesian3.fromDegrees(174.756536148659, -36.846391953972585, 44),
    Cesium.Cartesian3.fromDegrees(174.756380880387, -36.84807054569632, 46)
  ]; 

  // Eigth journey location points
  var vehiclePositions8 = [
    Cesium.Cartesian3.fromDegrees(174.7623521937834, -36.84640822496407, 48),
    Cesium.Cartesian3.fromDegrees(174.7608558568023, -36.845979322151095, 48),
    Cesium.Cartesian3.fromDegrees(174.7613131381192, -36.84475421552981, 48),
    Cesium.Cartesian3.fromDegrees(174.7601620032696, -36.84444980695501, 45),
    Cesium.Cartesian3.fromDegrees(174.7599117471668, -36.845026567030125, 45),
    Cesium.Cartesian3.fromDegrees(174.76001183728658, -36.84563537222342, 45),
    Cesium.Cartesian3.fromDegrees(174.76158340752627, -36.84533097729356, 46),
    Cesium.Cartesian3.fromDegrees(174.76267450199353, -36.845771550488045, 47),
    Cesium.Cartesian3.fromDegrees(174.7623521937834, -36.84640822496407, 48)
  ];   

    // Polylines create
    // Blue bus polyline
    var whitePolyline1 = viewer.entities.add({
      polyline: {
        positions: vehiclePositions7,
        width: 0,
        material: Cesium.Color.WHITE
      }
    });
    
    // Models import
    // Entity 1
    var vehicleEntity1 = viewer.entities.add({
      position: vehiclePositions1[0],
      model: {
        uri: './models/VW_Beetle.glb',
        scale: 7.0,
        colorBlendAmount: 0.0,
      }
    });
  
    // Entity 2
    var vehicleEntity2 = viewer.entities.add({
      position: vehiclePositions2[0],
      model: {
        uri: './models/Sports_blue.glb',
        scale: 0.2,
        colorBlendAmount: 0.0,
      }
    });

    // Entity 3
    var vehicleEntity3 = viewer.entities.add({
      position: vehiclePositions3[0],
      model: {
        uri: './models/Bus_red.glb',
        scale: 3.0,
        colorBlendAmount: 0.0,
      }
    });
  
    // Entity 4
    var vehicleEntity4 = viewer.entities.add({
      position: vehiclePositions4[0],
      model: {
        uri: './models/Bus_blue.glb',
        scale: 3.0,
        colorBlendAmount: 0.0,
      }
    });

    // Entity 5
    var vehicleEntity5 = viewer.entities.add({
      position: vehiclePositions5[0],
      model: {
        uri: './models/Bus_green.glb',
        scale: 3.0,
        colorBlendAmount: 0.0,
      }
    });

    // Entity 6
    var vehicleEntity6 = viewer.entities.add({
      position: vehiclePositions6[0],
      model: {
        uri: './models/VW_Beetle.glb',
        scale: 7.0,
        colorBlendAmount: 0.0,
      }
    });    

    // Entity 7
    var vehicleEntity7 = viewer.entities.add({
      position: vehiclePositions7[0],
      model: {
        uri: './models/Sports_black.glb',
        scale: 0.2,
        colorBlendAmount: 0.0,
      }
    });   

    // Entity 8
    var vehicleEntity8 = viewer.entities.add({
      position: vehiclePositions8[0],
      model: {
        uri: './models/VW_Beetle.glb',
        scale: 7.0,
        colorBlendAmount: 0.0,
      }
    });     
    
    // Animate vehicles
    animateBus(vehicleEntity1, vehiclePositions1, 25, viewer);
    animateBus(vehicleEntity2, vehiclePositions2, 40, viewer);
    animateBus(vehicleEntity3, vehiclePositions3, 30, viewer);
    animateBus(vehicleEntity4, vehiclePositions4, 25, viewer);
    animateBus(vehicleEntity5, vehiclePositions5, 30, viewer);
    animateBus(vehicleEntity6, vehiclePositions6, 30, viewer);  
    animateBus(vehicleEntity7, vehiclePositions7, 30, viewer); 
    animateBus(vehicleEntity8, vehiclePositions8, 30, viewer); 

  }
  
      
      
      
   