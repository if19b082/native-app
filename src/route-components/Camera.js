import React, { useState } from 'react';
import Main from '../structure/Main';
import { Global, css } from '@emotion/react'
import { logoAndroid, logoApple } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { IonPage, IonButton, IonImg, IonIcon } from '@ionic/react';

const camStyle = css`
  #button {
      margin-left: 150px;
  }
`;

const Cam = () => {
    //Camera-Stuff
    const [photo, setPhoto] = useState();
    const takePhoto = async () => {
        const pic = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
        allowEditing: true
        });
        setPhoto(pic.webPath)
    };
      
    return (
    <>
        <Global styles={camStyle} />
        <Main headingText="Let's take a picture!">
            <IonPage>
                <IonButton id="button" onClick={takePhoto}>
                    <IonIcon ios={logoApple} md={logoAndroid}/>
                    Take Picture
                </IonButton>
                <IonImg src={photo}/>
            </IonPage>
        </Main>
    </>
    )
  }
  
  export default Cam;