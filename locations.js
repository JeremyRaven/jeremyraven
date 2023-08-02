// Camera home position
function cameraHome(viewer){
    viewer.scene.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(
        174.74066041157647,
        -36.84589830999405,
        600
      ),
      orientation: {
        heading: 1.5241325004854618,
        pitch: -0.19748764610807568,
        roll: 0.011153902231953339
      }
    });
};

function cameraPalmy(viewer){
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            175.59178936084686,
            -40.37047070219636,
            600
        ),
        orientation: {
            heading: 0.5920095970861823,
            pitch: -0.20773156165243178,
            roll: 0.002916584579649495
        }
    });
};

function cameraNationalPark(viewer){
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          170.3874661337577,
          -43.549050471808144,
          4000
        ),
        orientation: {
          heading: 4.230739092546649,
          pitch: -0.2040636349488789,
          roll: 0.0002549262938105201
        }
    });
};

function cameraSatellite(viewer){
    viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            178.2748332534692,
            -52.855579166773374,
            1600000
        ),
        orientation: {
            heading: 5.846609794126379,
            pitch: -0.8233579892309102,
            roll: 6.266026373890324
        }
    });
};
