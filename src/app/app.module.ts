import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
//pages
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { AnimalPage } from '../pages/animal/animal';
import { EditPage } from '../pages/edit/edit';

//firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
//referenciar o config.ts
import { firebaseConfig, Config } from '../config';
import { FirebaseServiceProvider } from '../providers/fire-service/fire-service';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgxErrorsModule } from '@ultimate/ngxerrors'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// recursos nativos
import { PhotoLibrary } from '@ionic-native/photo-library';
import { Camera } from '@ionic-native/camera';
import { ToastrServiceProvider } from '../providers/toastr-service/toastr-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    AnimalPage,
    EditPage
  ],
  imports: [
    BrowserModule,
    NgxErrorsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    AnimalPage,
    EditPage
  ],
  providers: [
    Config,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseServiceProvider,
    AngularFireDatabaseModule,
    AngularFireAuth,
    AuthService,
    PhotoLibrary,
    Camera,
    ToastrServiceProvider
  ]
})
export class AppModule {}
