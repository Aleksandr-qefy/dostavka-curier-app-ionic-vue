//import { ref, onMounted, watch } from 'vue';
import { Plugins, CameraResultType, CameraSource/*, FilesystemDirectory
  , CameraPhoto,
Capacitor */} from "@capacitor/core";

/*export default function() {
  const { Camera } = Plugins;

  async function takePhoto () {
    await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }

  return {
    takePhoto
  };
}*/

const { Camera/*, Filesystem*/ } = Plugins;

//let photos = 1;
async function takePhoto () {
  const cameraPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
  const fileName = new Date().getTime() + '.jpeg';
  const savedFileImage = {
    filepath: fileName,
    webviewPath: cameraPhoto.webPath
  };
  return savedFileImage
  //photos = 2;
  //photos = [savedFileImage, ...photos];
  //alert(photos.toString);
  //addPhoto(savedFileImage);
}

const convertBlobToBase64 = (blob/*:Blob*/) => new Promise((resolve, reject) => {
  const reader = new FileReader;
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

async function takePhotoBase64 () {
  const cameraPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
    source: CameraSource.Camera,
    quality: 100
  });
  //alert(cameraPhoto);
  const response = await fetch(cameraPhoto.webPath);
  const blob = await response.blob();
  const base64Data = await convertBlobToBase64(blob);
  const fileName = new Date().getTime() /* + '.jpeg';*/
  //const savedFileImage = await savePicture(cameraPhoto, fileName);

  return {
    path: fileName,
    data: base64Data,
    //blobSize: blob.size,
    size: base64Data.length
  }
}

export { takePhoto, takePhotoBase64 };