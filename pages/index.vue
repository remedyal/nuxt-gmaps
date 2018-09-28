<template>
  <GmapMap id="map" :center="startLocation" :zoom="14">
    <GmapInfoWindow :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
      <div class="iw">
        <img :src="infoIcon" class="iw-img" alt="">
        <div class="iw-content">
          <div class="iw-title">{{infoTitle}} </div>
          <div class="iw-subtitle">{{infoAddress}} </div>
          <nuxt-link class="iw-link" :to="'/place/' + infoId">
            More
          </nuxt-link>
        </div>
      </div>
    </GmapInfoWindow>
  
    <GmapMarker v-for="(place, key) in places.items" :key="place.sys.id" :position="getPosition(place)" :clickable="true" @click="toggleInfo(place, key)">
    </GmapMarker>
  </GmapMap>
</template>

<script>
  import credentials from '@/assets/js/credentials.js';
  
  export default {
    async asyncData({
      app
    }) {
  
      const places = await app.$axios.$get(
        'https://cdn.contentful.com' +
        '/spaces/' + credentials.contentful.space_id +
        '/environments/' + credentials.contentful.env +
        '/entries?access_token=' + credentials.contentful.access_token +
        '&content_type=geolocation'
      )
  
      for (let i = 0; i < places.items.length; i++) {
        places.items[i].fields.location.lng = places.items[i].fields.location.lon;
        delete places.items[i].fields.location.lon;
      }
  
      return {
        places
      }
    },
  
    methods: {
      getPosition: function(marker) {
        return {
          lat: parseFloat(marker.fields.location.lat),
          lng: parseFloat(marker.fields.location.lng)
        }
      },
  
      toggleInfo: function(marker, key) {
        this.infoPosition = this.getPosition(marker);
        this.infoTitle = marker.fields.title;
        this.infoAddress = marker.fields.address;
        this.infoIcon = marker.fields.iconUrl;
        this.infoId = marker.sys.id;
        if (this.infoCurrentKey == key) {
          this.infoOpened = !this.infoOpened;
        } else {
          this.infoOpened = true;
          this.infoCurrentKey = key;
        }
      }
    },
  
    data() {
      return {
        startLocation: {
          lat: -6.901118,
          lng: 107.618939
        },
        infoPosition: null,
        infoTitle: null,
        infoAddress: null,
        infoId: null,
        infoIcon: null,
        infoOpened: false,
        infoCurrentKey: null,
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
      };
    }
  }
</script>

<style>
  body,
  html {
    width: 100%;
    height: 100%;
  }
  
  #map {
    width: 100%;
    height: 100vh;
  }
  
  .iw {
    display: grid;
    width: 300px;
    grid-template-columns: 80px 220px;
  }
  
  .iw-img {
    grid-row: 1/2;
    grid-column: 1/2;
    max-width: 80px;
    max-height: 80px;
  }
  
  .iw-content {
    grid-row: 1/2;
    grid-column: 2/-1;
    padding-left: 10px;
  }
  
  .iw-title {
    font-size: 1.1em;
    font-weight: 500;
  }
  
  .iw-subtitle {
    font-size: 0.95em;
    font-weight: 400;
  }
  
  .iw-link {
    font-size: 0.95em;
    font-weight: 500
  }
</style>

