<template>
  <div class="maingrid">
    <div class="title">
      <h2 id="title-content">{{place.fields.title}}</h2>
    </div>
  
    <b-carousel id="carousel" class="img" style="text-shadow: 1px 1px 2px #333;" controls indicators background="#ababab" :interval="4000" img-width="1024" img-height="480" v-model="slide" @sliding-start="onSlideStart" @sliding-end="onSlideEnd">
    <b-carousel-slide class="carousel-slide" v-for="item in this.place.fields.images" :key="item.id">
        <img slot="img" class="d-block img-fluid w-100 h-100" width="1024" height="480"
             :src="item.url" alt="image slot">
      </b-carousel-slide>
    </b-carousel>
  
    <div class="content">
      <vue-markdown :source="place.fields.content"></vue-markdown>
      
      <div class="date">
        Last updated: {{place.fields.updateDate | moment("dddd, MMMM Do YYYY")}}
      </div>
    </div>
  
    <div class="info">
      <div class="info-contact">
        <h6>Contacts</h6>
        <vue-markdown :source="place.fields.contact"></vue-markdown>
      </div>

      <div class="info-review">
        <h6>Rating</h6>
        <star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" :rating="place.fields.rating"></star-rating> <span id="ratingText">{{ratingText}}</span>
      </div>
  
      <div class="info-operational">
        <h6>Operational Hours</h6>
        <div class="info-hours">
          <ul id="days">
            <li v-for="item in this.place.fields.operational" :key="item.day">
              <div style="width: 10em; float: left;">{{item.day}}</div>
              <div style="margin-left: 5em;">{{item.hour}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
 import credentials from '@/assets/js/credentials.js';

  export default {
 
    async asyncData({
      app,
      params
    }) {
  
      const place = await app.$axios.$get(
        'https://cdn.contentful.com' +
        '/spaces/' + credentials.contentful.space_id +
        '/environments/' + credentials.contentful.env +
        '/entries/' + params.id +
        '?access_token=' + credentials.contentful.access_token
      )

      place.fields.location.lng = place.fields.location.lon;
      delete place.fields.location.lon;

      return {
        place
      }
    },
  
    data() {
      return {
        slide: 0,
        sliding: null,
        ratingText: null,
      }
    },
  
    methods: {
      getRatingText: function(rating) {
        switch (rating) {
          case 1:
            return '"Poor"';
            break;
          case 2:
            return '"Bad"';
            break;
          case 3:
            return '"Average"';
            break;
          case 4:
            return '"Good"';
            break;
          case 5:
            return '"Excellent"';
            break;
          default:
            return '"Average"';
            break;
        }
      },
  
      onSlideStart(slide) {
        this.sliding = true
      },
  
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
  
    beforeMount() {
      this.ratingText = this.getRatingText(this.place.fields.rating);
    },
  }
</script>


<style>
  @import url('https://fonts.googleapis.com/css?family=Simonetta');
  @import url('https://fonts.googleapis.com/css?family=Lato');
  @import url('https://fonts.googleapis.com/css?family=Roboto');
  
  .maingrid {
    display: grid;
    grid-gap: 5px;
    grid-template-rows: 9fr 47fr 44fr;
    grid-template-columns: 80fr 30fr;
    height: calc(100vh - 10px);
    margin: 0 14em;
  }
  
  .title {
    position: relative;
    grid-row: 1/2;
    grid-column: 1/2;
    font-family: "Simonetta";
  }
  
  #title-content {
    position: absolute;
    bottom: 0;
  }
  
  .img {
    grid-row: 2/3;
    grid-column: 1/2;
    box-sizing: border-box!important;
    box-shadow: 0px 0px 5px 2px #7f7f7f;
  }

  #carousel {
    height: 100%;
  }

  .carousel-inner {
    height: 100%;
  }

  .carousel-slide{
    width: 100%;
    height: 100%;
  }

  .carousel-item {
     height: 100%;
  }

  .content {
    padding-top: 0.75em;
    grid-row: 3/4;
    grid-column: 1/2;
    text-align: justify;
    text-justify: inter-word;
    font-family: "Lato";
    font-weight: lighter;
    line-height: 1.2em;
  }

  .content div p:first-of-type:first-letter {
    float: left;
    font-family: Georgia;
    font-size: 50px;
    line-height: 35px;
    padding-top: 4px;
    padding-right: 8px;
    padding-left: 3px;
  }

  .date {
    font-size: 0.8em;
    color: grey;
  }

  .info {
    font-family: "Roboto";
    grid-row: 2/4;
    grid-column: 2/3;
    display: grid;
    grid-template-rows: 40fr 7fr 44fr;
    font-weight: 300;
    font-size: 0.8em;
    padding-left: 3em;
  }

  h6 {
    font-weight: bold;
  }
  
  .info-contact {
    grid-row: 1/2;
  }
  
  .info-review {
    grid-row: 2/3;
  }

  #ratingText {
    font-style: oblique;
  }
  
  .info-operational {
    padding-top: 1.2em;
    grid-row: 3/4;
  }
  
  #days {
    list-style: none;
    padding-left: 0;

  }
</style>
