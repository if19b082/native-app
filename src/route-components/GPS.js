import React, { useState } from 'react';
import Main from '../structure/Main';
import { Geolocation } from '@capacitor/geolocation';
import { IonPage, IonButton, IonLoading, IonToast, IonItem, IonLabel } from '@ionic/react';

const exTime = 'Execution time: ';
const notMeasured = `${exTime} not yet measured`;
const ms = 'ms';

const GPS = () => {
  //Geo-Stuff (native API call)
  let startFunctionCall;
  let executionTimeNative;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ showError: false });
  const [positionNative, setPositionNative] = useState();
  const getLocationNative = async () => {
      startFunctionCall = Date.now();
      setLoading(true);
      try {
          const position = await Geolocation.getCurrentPosition();
          let date = position.timestamp - startFunctionCall;
          let millis = new Date(date).getMilliseconds();
          setPositionNative(position);
          setLoading(false);
          setError({ showError: false });
          executionTimeNative = `${exTime} ${millis} ${ms} (native)`;
          document.getElementById('nativeCall').innerHTML = executionTimeNative; 
      } catch (ex) {
          let result = ex.message;
          setError({ showError: true, message: result });
          setLoading(false);
      }
  }
    
  return (
  <>
      <Main headingText="Let's check your GPS coordinates!">
          <IonPage>
            <IonLoading
            isOpen={loading}
            onDidDismiss={() => setLoading(false)}
            message={'Getting Location...'}
            />
            <IonToast
                isOpen={error.showError}
                onDidDismiss={() => setError({ message: "", showError: false })}
                message={error.message}
                duration={3000}
            />
            <IonButton color="primary" onClick={getLocationNative}>{positionNative ? `${positionNative.coords.latitude} ${positionNative.coords.longitude}` : "Check GPS coordinates"} (click)</IonButton>
            <IonItem id="nativeCall" >
                <IonLabel>
                    {executionTimeNative ? `${executionTimeNative}` : `${notMeasured}`}
                </IonLabel>
              </IonItem>
          </IonPage>
      </Main>
  </>
  )
}

export default GPS;