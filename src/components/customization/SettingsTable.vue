<template>
    <!--div class="max-w-md w-auto rounded-3xl shadow bg-white p-4 space-y-3"-->
    <div class="w-full bg-white p-4 space-y-3">
      <div>
        <!--img class="mx-auto h-12 w-auto fill-current text-green-600" src="../assets/svg/document-text.svg" alt="Workflow"-->
        <h2 class="mt-6 text-center text-gray-600">
          Список настроек
        </h2>
      </div>
      <div class="-mx-4">
        <div class="py-6 px-4 w-full space-y-2 bg-gray-50">
          <div class="flex items-center">
            <button @click="$router.push({ path: '/customization/profile_picture' })" class="group relative flex justify-center focus:outline-none">
            <span class="p-1">
              <!--svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.4142 7L17.7071 3.70711C18.0976 3.31658 18.0976 2.68342 17.7071 2.29289C17.3166 1.90237 16.6834 1.90237 16.2929 2.29289L13 5.58579V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V7.99931C11 8.00031 11 8.002 11 8.003C11.0004 8.1375 11.0273 8.26575 11.0759 8.38278C11.1236 8.49805 11.1937 8.6062 11.2864 8.70055C11.2907 8.70494 11.2951 8.70929 11.2995 8.7136C11.3938 8.80626 11.502 8.87643 11.6172 8.92412C11.7351 8.97301 11.8644 9 12 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H14.4142Z"
                      fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" fill="currentColor"/>
              </svg-->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary-500 group-hover:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </button>
            <h3 class="text-left font-medium text-gray-600">Аватарка</h3>
          </div>
          <img class="mx-auto w-48 h-48 rounded-full" v-if="selfie" :src="selfie" alt="">
          <p v-else class="text-gray-500 pl-12">Не выбрана</p>
        </div>
        <div class="py-6 px-4 w-full space-y-2 bg-gray-100">
          <div class="flex items-center">
            <button @click="$router.push({ path: '/customization/working_area' })" class="group relative flex justify-center focus:outline-none">
            <span class="p-1">
              <!--svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.4142 7L17.7071 3.70711C18.0976 3.31658 18.0976 2.68342 17.7071 2.29289C17.3166 1.90237 16.6834 1.90237 16.2929 2.29289L13 5.58579V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V7.99931C11 8.00031 11 8.002 11 8.003C11.0004 8.1375 11.0273 8.26575 11.0759 8.38278C11.1236 8.49805 11.1937 8.6062 11.2864 8.70055C11.2907 8.70494 11.2951 8.70929 11.2995 8.7136C11.3938 8.80626 11.502 8.87643 11.6172 8.92412C11.7351 8.97301 11.8644 9 12 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H14.4142Z"
                      fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" fill="currentColor"/>
              </svg-->
              <!--svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
              </svg-->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary-500 group-hover:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </button>
            <h3 class="text-left font-medium text-gray-600">Местоположение</h3>
          </div>
          <p class="text-gray-500 pl-12">{{ strFormattedAddress }}</p>
        </div>
        <div class="py-6 px-4 w-full space-y-2 bg-gray-50">
          <div class="flex items-center">
            <button @click="$router.push({ path: '/customization/working_radius' })" class="group relative flex justify-center focus:outline-none">
            <span class="p-1">
              <!--svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.4142 7L17.7071 3.70711C18.0976 3.31658 18.0976 2.68342 17.7071 2.29289C17.3166 1.90237 16.6834 1.90237 16.2929 2.29289L13 5.58579V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V7.99931C11 8.00031 11 8.002 11 8.003C11.0004 8.1375 11.0273 8.26575 11.0759 8.38278C11.1236 8.49805 11.1937 8.6062 11.2864 8.70055C11.2907 8.70494 11.2951 8.70929 11.2995 8.7136C11.3938 8.80626 11.502 8.87643 11.6172 8.92412C11.7351 8.97301 11.8644 9 12 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H14.4142Z"
                      fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" fill="currentColor"/>
              </svg-->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary-500 group-hover:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </button>
            <h3 class="text-left font-medium text-gray-600">Минимальное расстояние до первого адреса</h3>
          </div>
          <p class="text-gray-500 pl-12">{{ strRadius }} метров</p>
        </div>
        <div class="py-6 px-4 w-full space-y-2 bg-gray-100">
          <div class="flex items-center">
            <button @click="$router.push({ path: '/customization/travel_mode' })" class="group relative flex justify-center focus:outline-none">
            <span class="p-1">
              <!--svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M14.4142 7L17.7071 3.70711C18.0976 3.31658 18.0976 2.68342 17.7071 2.29289C17.3166 1.90237 16.6834 1.90237 16.2929 2.29289L13 5.58579V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V7.99931C11 8.00031 11 8.002 11 8.003C11.0004 8.1375 11.0273 8.26575 11.0759 8.38278C11.1236 8.49805 11.1937 8.6062 11.2864 8.70055C11.2907 8.70494 11.2951 8.70929 11.2995 8.7136C11.3938 8.80626 11.502 8.87643 11.6172 8.92412C11.7351 8.97301 11.8644 9 12 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H14.4142Z"
                      fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" fill="currentColor"/>
              </svg-->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-secondary-500 group-hover:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
          </button>
            <h3 class="text-left font-medium text-gray-600">Способ передвижения</h3>
          </div>
          <p class="text-gray-500 pl-12">{{ strTravelMode }}</p>
        </div>
      </div>
      <div class="w-9/12 mx-auto form-button">
        <button :disabled="notAllSettingsSelected" class="group relative w-full flex justify-center py-2 px-4 form-button">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!--svg class="h-5 w-5 " viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill="currentColor"/>
            </svg-->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-500 group-hover:text-secondary-400" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </span>
          Сохранить настройки
        </button>
      </div>
      <div v-if="notAllSettingsSelected">
        <p class="text-center text-red-700">Не все настройки выбраны</p>
      </div>
      <div v-if="false" class="w-9/12 mx-auto form-button">
        <button class="group relative w-full flex justify-center py-2 px-4 form-button">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!--svg class="h-5 w-5 " viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill="currentColor"/>
            </svg-->
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-secondary-500 group-hover:text-secondary-400" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </span>
          Не изменять настройки
        </button>
      </div>
      <!--form class="mt-8 space-y-6" action="#" method="POST"-->
        <!--input type="hidden" name="remember" value="true"-->
        <!--p>class="flex flex-col -space-y-px w-auto h-auto mb-3"</p-->
        <!--div class="flex flex-col border-dashed border-2 rounded-3xl px-4 border-primary w-auto h-auto mb-3">
          <ion-list>
            <ion-item>
              <ion-button>
                <ion-icon :icon="settingsSharp" size="large" color="light" slot="start"></ion-icon>
              </ion-button>
              <ion-label>
                Icon Start
              </ion-label>
            </ion-item>

            <ion-item-group>
              <ion-list-header>
                <ion-label><h2>Местоположение</h2></ion-label>
                <ion-button fill="outline">Изменить</ion-button>
              </ion-list-header>
              <ion-item-divider>
                <ion-text>
                  <h4 class="text-gray-600">{{ formattedAddress }}</h4>
                </ion-text>
              </ion-item-divider>
            </ion-item-group>
            <ion-item-group>
              <ion-list-header>
                <h3 class="text-gray-700">Максимальное расстояние до начального адреса</h3>
              </ion-list-header>
              <ion-button fill="outline">Изменить</ion-button>
              <ion-item-divider>
                <h4 class="text-gray-600">{{ radius }}</h4>
              </ion-item-divider>
            </ion-item-group>
            <ion-item-group>
              <ion-list-header>
                <ion-label><h2>Способ передвижения</h2></ion-label>
                <ion-button fill="outline">Изменить</ion-button>
              </ion-list-header>
              <ion-item-divider>
                <h4 class="text-gray-600">{{ travelMode }}</h4>
              </ion-item-divider>
            </ion-item-group>
          </ion-list>
  <ion-item-group>
    <ion-item-divider>
      <ion-label>
        Vegetables
      </ion-label>
    </ion-item-divider>

    <ion-item-sliding>
      <ion-item>
        <ion-label>
          <h3>Carrots</h3>
        </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option>
          Favorite
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>

    <ion-item-sliding>
      <ion-item>
        <ion-label>
          <h3>Celery</h3>
        </ion-label>
      </ion-item>
      <ion-item-options>
        <ion-item-option>
          Favorite
        </ion-item-option>
      </ion-item-options>
    </ion-item-sliding>
  </ion-item-group>
        </div-->
    </div>
</template>
<script>
//import WorkingRadiusMap from '../maps/WorkingRadiusMap.vue';
//import { IonRadioGroup, IonItem, IonRadio, IonLabel } from '@ionic/vue';
import { settingsSharp } from "ionicons/icons";
export default {
  components: {
    //IonRadioGroup,
    //IonItem,
    //IonRadio,
    //IonLabel
  },
  //name: 'WorkingAreaForm',
  props: {
  },
  data () {
    return {
      settingsSharp
    }
  },
  computed: {
    notAllSettingsSelected () {
      return this.formattedAddressIsNull ||
          this.radiusIsNull || this.travelModeIsNull
            || this.selfieIsNull
    },
    formattedAddressIsNull() {
      return this.$store.getters.GET_FORMATTED_ADDRESS == null
    },
    radiusIsNull() {
      return this.$store.getters.GET_RADIUS == null
    },
    travelModeIsNull() {
      return this.$store.getters.GET_TRAVEL_MODE == null
    },
    selfieIsNull() {
      return this.$store.getters.GET_SELFIE == null
    },
    strFormattedAddress() {
      if (this.$store.getters.GET_FORMATTED_ADDRESS){
        return this.$store.getters.GET_FORMATTED_ADDRESS.address_string
      } else {
        return 'Не выбрано'
      }
    },
    selfie() {
      return this.$store.getters.GET_SELFIE;
    },
    strRadius() {
      if (this.$store.getters.GET_RADIUS){
        return this.$store.getters.GET_RADIUS;
      } else {
        return 'Не выбрано';
      }
    },
    strTravelMode() {
      if (this.$store.getters.GET_TRAVEL_MODE){
        if (this.$store.getters.GET_TRAVEL_MODE == 'DRIVING') {
          return 'На машине';
        } else if (this.$store.getters.GET_TRAVEL_MODE == 'BICYCLING') {
          return 'На велосипеде';
        } else {
          return 'На общественном тр-те';
        }
      } else {
        return 'Не выбран';
      }
    }
  },
  watch: {
  },
  methods: {

  }
}
</script>