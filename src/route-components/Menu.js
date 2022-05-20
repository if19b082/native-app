import React from 'react';
import Main from '../structure/Main';
import { Global, css } from '@emotion/react'
import { Capacitor } from '@capacitor/core';
import { IonPage, IonItem, IonLabel } from '@ionic/react';

const menuStyle = css`
  #heading {
    margin-top: 100px;
    margin-left: 100px;
    margin-right: 25px;
    color: #403147;
  }
  #capacitor {
    margin-top:100px;
  }
`;

const Menu = () => (
    <>
        <Main headingText="Hello!">
            <Global styles={menuStyle} />
            <h1 id="heading">Welcome to this native app by Capacitor!</h1>
            <IonPage id="capacitor">
              <IonItem>
                <IonLabel>
                  { Capacitor.isNativePlatform() ? `You're running a native app on: ${Capacitor.getPlatform().toUpperCase()}` : `You're not running a native app` }
                </IonLabel>
              </IonItem>
            </IonPage>
        </Main>
    </>
)

export default Menu;